(function () {
  "use strict";

  const repository =
    "https://api.github.com/repos/High-Lift-Prediction-Workshop/HLPW6-TC1";
  const rawBase =
    "https://raw.githubusercontent.com/High-Lift-Prediction-Workshop/HLPW6-TC1/main/";
  const dashboard = document.querySelector("[data-results-dashboard]");

  if (!dashboard) return;

  const status = dashboard.querySelector("[data-dashboard-status]");
  const search = dashboard.querySelector("[data-submission-search]");
  const submissionList = dashboard.querySelector("[data-submission-list]");
  const chart = dashboard.querySelector("[data-dashboard-chart]");
  const selectAll = dashboard.querySelector("[data-select-all]");
  const clearAll = dashboard.querySelector("[data-clear-all]");
  const pressureSearch = dashboard.querySelector("[data-pressure-search]");
  const pressureSubmissionList = dashboard.querySelector("[data-pressure-submission-list]");
  const pressureStatus = dashboard.querySelector("[data-pressure-status]");
  const pressureChart = dashboard.querySelector("[data-pressure-chart]");
  const pressureSelectAll = dashboard.querySelector("[data-pressure-select-all]");
  const pressureClearAll = dashboard.querySelector("[data-pressure-clear-all]");
  const pressureMetric = dashboard.querySelector("[data-pressure-metric]");
  const pressureBelt = dashboard.querySelector("[data-pressure-belt]");
  const pressureAoA = dashboard.querySelector("[data-pressure-aoa]");
  const state = {
    series: [],
    selected: new Set(),
    pressureSeries: [],
    pressureSelected: new Set(),
    pressureLoaded: false,
    pressureMetric: "CP",
    pressureBelt: "all",
    pressureAoA: "all",
    repositoryTree: null,
    tfgSelected: new Set(["R", "S", "H", "A"]),
  };
  const tfgLabels = {
    R: "RANS TFG",
    S: "Scale Resolving TFG",
    H: "High Order TFG",
    A: "AI/ML TFG",
    U: "Unclassified",
  };
  const tfgInfo = {
    R: "Reynolds-Averaged Navier–Stokes (RANS) and grid-adaptive TFG",
    S: "Scale-Resolving Simulation (SRS) TFG",
    H: "High Order TFG",
    A: "Artificial Intelligence (AI) TFG",
  };
  const beltInfo = {
    S: "Slat chordwise row",
    W: "Wing chordwise row",
    F: "Flap chordwise row",
    WS: "Wing spanwise row",
    FS: "Flap spanwise row",
  };

  function setStatus(message, stateName) {
    status.textContent = message;
    status.dataset.state = stateName || "info";
  }

  function setPressureStatus(message, stateName) {
    pressureStatus.textContent = message;
    pressureStatus.dataset.state = stateName || "info";
  }

  function parseQuotedValues(line) {
    return Array.from(line.matchAll(/"([^"]*)"/g), (match) => match[1]);
  }

  function findTfg(title, path) {
    const tokens = `${path} ${title}`.split(/[^A-Za-z0-9]+/);
    const tc1Index = tokens.findIndex((token) => token.toUpperCase() === "TC1");
    if (tc1Index >= 0) {
      const tfg = tokens.slice(tc1Index + 1, tc1Index + 5).find((token) => /^[RSHA]$/i.test(token));
      if (tfg) return tfg.toUpperCase();
    }
    return "U";
  }

  function makeDisplayName(title, path) {
    const folders = path.replace(/\/[^/]+$/i, "").split("/");
    const teamParts = folders[0].split("_");
    const participant = teamParts.shift() || "???";
    const organization = teamParts.shift() || "Unknown";
    const solver = teamParts.join("_") || "Unknown solver";
    const dataset = folders[folders.length - 1];
    const datasetParts = dataset.split("_");
    const datasetTc1Index = datasetParts.findIndex((part) => part.toUpperCase() === "TC1");
    const titleParts = title.split("_");
    const titleTc1Index = titleParts.findIndex((part) => part.toUpperCase() === "TC1");
    const resultParts = datasetTc1Index >= 0 ? datasetParts : titleParts;
    const tc1Index = datasetTc1Index >= 0 ? datasetTc1Index : titleTc1Index;
    const resultNumber = tc1Index >= 0
      ? resultParts.slice(tc1Index + 1).find((part) => /^\d+$/.test(part))
      : null;
    const readableSolver = solver.replace(/^USM3D$/i, "USM3d");
    const resultIndex = resultNumber ? String(Number(resultNumber)).padStart(2, "0") : "??";
    return `(${participant}) ${organization}, ${readableSolver}: (${resultIndex})`;
  }

  function cleanZoneName(zone) {
    return zone.replace(/^\s*\d+\s+TC1\s*,?\s*/i, "").trim();
  }

  function parseFmFile(text, path) {
    const lines = text.split(/\r?\n/);
    const titleLine = lines.find((line) => /^\s*TITLE\s*=/.test(line));
    const variableLine = lines.find((line) => /^\s*VARIABLES\s*=/.test(line));
    const title = titleLine
      ? (parseQuotedValues(titleLine)[0] || path).trim()
      : path;
    const variables = variableLine ? parseQuotedValues(variableLine) : [];
    const column = Object.fromEntries(variables.map((name, index) => [name, index]));
    const zones = [];
    let zone = null;

    lines.forEach((line) => {
      const zoneMatch = line.match(/^\s*ZONE\s+T\s*=\s*"([^"]*)"/i);
      if (zoneMatch) {
        zone = { name: zoneMatch[1].trim(), rows: [] };
        zones.push(zone);
        return;
      }

      if (!zone || /^\s*(#|$)/.test(line)) return;
      const values = line.trim().split(/\s+/).map(Number);
      if (values.length < variables.length || values.some(Number.isNaN)) return;

      const value = (name) => {
        const number = values[column[name]];
        return Number.isFinite(number) && number !== -999 ? number : null;
      };
      const row = { alpha: value("ALPHA"), CL: value("CL"), CD: value("CD"), CM: value("CM") };
      if (row.alpha !== null) zone.rows.push(row);
    });

    return zones
      .filter((item) => item.rows.some((row) => row.CL !== null || row.CD !== null || row.CM !== null))
      .map((item, index) => ({
        id: `${path}#${index}`,
        submission: path.replace(/\/FM\.dat$/, ""),
        title,
        tfg: findTfg(title, path),
        displayName: makeDisplayName(title, path),
        zone: cleanZoneName(item.name || `Zone ${index + 1}`),
        rows: item.rows,
      }));
  }

  async function fetchJson(url) {
    const response = await fetch(url, { headers: { Accept: "application/vnd.github+json" } });
    if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
    return response.json();
  }

  async function loadRepositoryTree() {
    if (!state.repositoryTree) {
      state.repositoryTree = await fetchJson(`${repository}/git/trees/main?recursive=1`);
    }
    return state.repositoryTree;
  }

  async function loadSeries() {
    const tree = await loadRepositoryTree();
    const files = tree.tree
      .filter((entry) => entry.type === "blob" && /(^|\/)FM\.dat$/i.test(entry.path))
      .map((entry) => entry.path);

    const results = await Promise.all(
      files.map(async (path) => {
        const response = await fetch(`${rawBase}${path}`);
        if (!response.ok) throw new Error(`${path}: ${response.status}`);
        return parseFmFile(await response.text(), path);
      }),
    );
    return results.flat().sort((a, b) => a.submission.localeCompare(b.submission) || a.zone.localeCompare(b.zone));
  }

  function parseCpcfFile(text, path) {
    const lines = text.split(/\r?\n/);
    const titleLine = lines.find((line) => /^\s*TITLE\s*=/.test(line));
    const variableLine = lines.find((line) => /^\s*VARIABLES\s*=/.test(line));
    const title = titleLine ? (parseQuotedValues(titleLine)[0] || path).trim() : path;
    const variables = variableLine ? parseQuotedValues(variableLine) : [];
    const column = Object.fromEntries(variables.map((name, index) => [name, index]));
    const zones = [];
    let zone = null;

    lines.forEach((line) => {
      const zoneMatch = line.match(/^\s*ZONE\s+T\s*=\s*"([^"]*)"/i);
      if (zoneMatch) {
        const name = zoneMatch[1].trim();
        const rowMatch = name.match(/\bRow\s+([A-Za-z0-9]+)/i);
        const aoaMatch = name.match(/=\s*([0-9]+(?:\.[0-9]+)?)/);
        zone = {
          name,
          belt: rowMatch ? rowMatch[1].toUpperCase() : "Unknown belt",
          aoa: aoaMatch ? Number(aoaMatch[1]) : null,
          rows: [],
        };
        zones.push(zone);
        return;
      }

      if (!zone || /^\s*(#|$|DATASETAUXDATA)/.test(line)) return;
      const values = line.trim().split(/\s+/).map(Number);
      if (values.length < variables.length || values.some(Number.isNaN)) return;
      const value = (name) => {
        const number = values[column[name]];
        return Number.isFinite(number) && number !== -999 ? number : null;
      };
      const row = { x: value("X"), CP: value("CP"), CF: value("CF") };
      if (row.x !== null && (row.CP !== null || row.CF !== null)) zone.rows.push(row);
    });

    return zones
      .filter((item) => item.rows.length)
      .map((item, index) => ({
        id: `${path}#${index}`,
        fileId: path,
        submission: path.replace(/\/[^/]+$/i, ""),
        title,
        tfg: findTfg(title, path),
        displayName: makeDisplayName(title, path),
        gridName: path.split("/").pop().replace(/_cpcf\.dat$/i, ""),
        belt: item.belt,
        aoa: item.aoa,
        zone: cleanZoneName(item.name),
        rows: item.rows,
      }));
  }

  async function loadPressureSeries() {
    const tree = await loadRepositoryTree();
    const files = tree.tree
      .filter((entry) => entry.type === "blob" && /cpcf\.dat$/i.test(entry.path))
      .map((entry) => entry.path);
    const results = await Promise.all(
      files.map(async (path) => {
        const response = await fetch(`${rawBase}${path}`);
        if (!response.ok) throw new Error(`${path}: ${response.status}`);
        return parseCpcfFile(await response.text(), path);
      }),
    );
    return results.flat().sort((a, b) =>
      a.submission.localeCompare(b.submission) || a.belt.localeCompare(b.belt) || a.aoa - b.aoa,
    );
  }

  function matchingSeries(tfgFilter) {
    const query = search.value.trim().toLowerCase();
    return state.series
      .filter((item) => !tfgFilter || item.tfg === tfgFilter)
      .filter((item) => !tfgFilter ? state.tfgSelected.has(item.tfg) : true)
      .filter((item) => `${item.displayName} ${item.zone}`.toLowerCase().includes(query));
  }

  function renderSubmissionList() {
    submissionList.replaceChildren();
    ["R", "S", "H", "A", "U"].forEach((tfg) => {
      const series = matchingSeries(tfg);
      if (!series.length && tfg !== "U") return;

      const fieldset = document.createElement("fieldset");
      fieldset.className = "results-dashboard__tfg";
      const legend = document.createElement("legend");
      const tfgToggle = document.createElement("input");
      tfgToggle.type = "checkbox";
      tfgToggle.checked = state.tfgSelected.has(tfg);
      tfgToggle.addEventListener("change", () => {
        if (tfgToggle.checked) state.tfgSelected.add(tfg);
        else state.tfgSelected.delete(tfg);
        renderSubmissionList();
        renderChart();
      });
      legend.append(tfgToggle, ` ${tfgLabels[tfg]}`);
      fieldset.append(legend);

      const description = document.createElement("span");
      description.className = "results-dashboard__tfg-description";
      description.textContent = tfgInfo[tfg] || "Could not identify a TFG from the submission name.";
      fieldset.append(description);

      const submissionsContainer = document.createElement("div");
      submissionsContainer.className = "results-dashboard__tfg-submissions";
      series.forEach((item) => {
        const label = document.createElement("label");
        label.className = "results-dashboard__submission";
        const labelText = `${item.displayName} — ${item.zone}`;
        label.title = labelText;
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = state.selected.has(item.id);
        checkbox.dataset.series = item.id;
        checkbox.addEventListener("change", () => {
          if (checkbox.checked) state.selected.add(item.id);
          else state.selected.delete(item.id);
          renderChart();
        });
        label.append(checkbox, ` ${labelText}`);
        submissionsContainer.append(label);
      });
      fieldset.append(submissionsContainer);
      submissionList.append(fieldset);
    });
  }

  function matchingPressureFiles(tfgFilter) {
    const query = pressureSearch.value.trim().toLowerCase();
    const files = state.pressureSeries
      .filter((item) => !tfgFilter || item.tfg === tfgFilter)
      .filter((item) => !tfgFilter ? state.tfgSelected.has(item.tfg) : true)
      .filter((item) => `${item.displayName} ${item.gridName}`.toLowerCase().includes(query))
      .filter((item, index, values) => values.findIndex((candidate) => candidate.fileId === item.fileId) === index);
    return files;
  }

  function beltDescription(belt) {
    const family = belt.startsWith("WS") ? "WS" : belt.startsWith("FS") ? "FS" : belt.charAt(0);
    return beltInfo[family] ? `${belt} — ${beltInfo[family]}` : belt;
  }

  function populatePressureOptions() {
    const belts = [...new Set(state.pressureSeries.map((item) => item.belt))].sort();
    const aoas = [...new Set(state.pressureSeries.map((item) => item.aoa).filter((value) => value !== null))].sort(
      (a, b) => a - b,
    );
    pressureBelt.replaceChildren(new Option("All pressure belts", "all"));
    belts.forEach((belt) => pressureBelt.add(new Option(beltDescription(belt), belt)));
    pressureBelt.value = belts.includes(state.pressureBelt) ? state.pressureBelt : "all";
    pressureAoA.replaceChildren(new Option("All angles of attack", "all"));
    aoas.forEach((aoa) => pressureAoA.add(new Option(`${aoa}°`, String(aoa))));
    pressureAoA.value = aoas.map(String).includes(String(state.pressureAoA))
      ? String(state.pressureAoA)
      : "all";
    state.pressureBelt = pressureBelt.value;
    state.pressureAoA = pressureAoA.value;
  }

  function renderPressureSubmissionList() {
    pressureSubmissionList.replaceChildren();
    ["R", "S", "H", "A", "U"].forEach((tfg) => {
      const files = matchingPressureFiles(tfg);
      if (!files.length) return;
      const fieldset = document.createElement("fieldset");
      fieldset.className = "results-dashboard__tfg";
      const legend = document.createElement("legend");
      const tfgToggle = document.createElement("input");
      tfgToggle.type = "checkbox";
      tfgToggle.checked = state.tfgSelected.has(tfg);
      tfgToggle.addEventListener("change", () => {
        if (tfgToggle.checked) state.tfgSelected.add(tfg);
        else state.tfgSelected.delete(tfg);
        renderSubmissionList();
        renderPressureSubmissionList();
        renderChart();
        renderPressureChart();
      });
      legend.append(tfgToggle, ` ${tfgLabels[tfg]}`);
      fieldset.append(legend);
      const description = document.createElement("span");
      description.className = "results-dashboard__tfg-description";
      description.textContent = tfgInfo[tfg] || "Could not identify a TFG from the submission name.";
      fieldset.append(description);

      const submissionsContainer = document.createElement("div");
      submissionsContainer.className = "results-dashboard__tfg-submissions";
      files.forEach((item) => {
        const label = document.createElement("label");
        label.className = "results-dashboard__submission";
        const labelText = `${item.displayName} — ${item.gridName}`;
        label.title = labelText;
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = state.pressureSelected.has(item.fileId);
        checkbox.addEventListener("change", () => {
          if (checkbox.checked) state.pressureSelected.add(item.fileId);
          else state.pressureSelected.delete(item.fileId);
          renderPressureChart();
        });
        label.append(checkbox, ` ${labelText}`);
        submissionsContainer.append(label);
      });
      fieldset.append(submissionsContainer);
      pressureSubmissionList.append(fieldset);
    });
  }

  function renderPressureChart() {
    const visible = state.pressureSeries.filter(
      (item) =>
        state.pressureSelected.has(item.fileId) &&
        state.tfgSelected.has(item.tfg) &&
        (state.pressureBelt === "all" || item.belt === state.pressureBelt) &&
        (state.pressureAoA === "all" || String(item.aoa) === String(state.pressureAoA)),
    );
    const palette = ["#2563eb", "#dc2626", "#059669", "#9333ea", "#ea580c", "#0891b2", "#be123c", "#4f46e5"];
    const colors = new Map(
      [...new Set(state.pressureSeries.map((item) => item.fileId))].map((fileId, index) => [
        fileId,
        palette[index % palette.length],
      ]),
    );
    const traces = visible.map((item) => {
      const rows = item.rows
        .filter((row) => row[state.pressureMetric] !== null)
        .sort((a, b) => a.x - b.x);
      return {
        x: rows.map((row) => row.x),
        y: rows.map((row) => row[state.pressureMetric]),
        name: `${item.displayName} — ${item.gridName} — ${item.belt} @ ${item.aoa ?? "?"}°`,
        legendgroup: item.id,
        hovertemplate: `<b>${state.pressureMetric}</b><br>X: %{x}<br>${state.pressureMetric}: %{y}<extra>${item.displayName}<br>${item.zone}</extra>`,
        mode: "lines",
        line: { color: colors.get(item.fileId), width: 1.5 },
        showlegend: true,
      };
    });
    const dark = document.documentElement.dataset.theme === "dark";
    const color = dark ? "#e5e7eb" : "#374151";
    const grid = dark ? "#374151" : "#e5e7eb";
    Plotly.react(
      pressureChart,
      traces,
      {
        height: 700,
        margin: { l: 70, r: 25, t: 25, b: 65 },
        paper_bgcolor: "transparent",
        plot_bgcolor: "transparent",
        font: { color },
        hovermode: "x unified",
        legend: { orientation: "h", y: -0.18 },
        xaxis: { title: "X coordinate", gridcolor: grid, color, automargin: true },
        yaxis: { title: state.pressureMetric, gridcolor: grid, zerolinecolor: grid, color, automargin: true },
      },
      { responsive: true, displaylogo: false },
    );
    setPressureStatus(`${visible.length} CPCF traces plotted.`);
  }

  function renderChart() {
    const visible = state.series.filter(
      (item) => state.selected.has(item.id) && state.tfgSelected.has(item.tfg),
    );
    const palette = [
      "#2563eb",
      "#dc2626",
      "#059669",
      "#9333ea",
      "#ea580c",
      "#0891b2",
      "#be123c",
      "#4f46e5",
      "#65a30d",
      "#c026d3",
    ];
    const colors = new Map(
      state.series.map((item, index) => [item.id, palette[index % palette.length]]),
    );
    const metrics = [
      ["CL", "Lift coefficient, CL"],
      ["CD", "Drag coefficient, CD"],
      ["CM", "Pitching-moment coefficient, CM"],
    ];
    const traces = [];
    visible.forEach((item) => {
      metrics.forEach(([metric, label]) => {
        const rows = item.rows.filter((row) => row[metric] !== null);
        traces.push({
          x: rows.map((row) => row.alpha),
          y: rows.map((row) => row[metric]),
          name: `${item.displayName} — ${item.zone}`,
          legendgroup: item.id,
          legendgrouptitle: { text: item.zone },
          customdata: rows.map(() => [item.zone]),
          hovertemplate: `<b>${label}</b><br>α: %{x}°<br>${metric}: %{y}<extra>${item.displayName}<br>${item.zone}</extra>`,
          mode: "lines+markers",
          line: { color: colors.get(item.id), dash: "solid", width: 1.5 },
          marker: { color: colors.get(item.id), size: 5 },
          showlegend: metric === "CL",
          visible: true,
          xaxis: metric === "CL" ? "x" : metric === "CD" ? "x2" : "x3",
          yaxis: metric === "CL" ? "y" : metric === "CD" ? "y2" : "y3",
        });
      });
    });

    const dark = document.documentElement.dataset.theme === "dark";
    const color = dark ? "#e5e7eb" : "#374151";
    const grid = dark ? "#374151" : "#e5e7eb";
    const axis = (title, domain) => ({
      title,
      domain,
      gridcolor: grid,
      zerolinecolor: grid,
      color,
      automargin: true,
    });
    const layout = {
      height: 1260,
      margin: { l: 65, r: 25, t: 25, b: 55 },
      paper_bgcolor: "transparent",
      plot_bgcolor: "transparent",
      font: { color },
      legend: { orientation: "h", y: -0.14, groupclick: "togglegroup" },
      hovermode: "x unified",
      xaxis: { ...axis("Angle of attack, α (deg)", [0, 1]), anchor: "y" },
      yaxis: axis("CL", [0.72, 1]),
      xaxis2: { ...axis("Angle of attack, α (deg)", [0, 1]), anchor: "y2" },
      yaxis2: axis("CD", [0.38, 0.66]),
      xaxis3: { ...axis("Angle of attack, α (deg)", [0, 1]), anchor: "y3" },
      yaxis3: axis("CM", [0.04, 0.32]),
      annotations: [
        { text: "CL", x: 0, xref: "paper", y: 0.86, yref: "paper", showarrow: false, font: { size: 16, color } },
        { text: "CD", x: 0, xref: "paper", y: 0.52, yref: "paper", showarrow: false, font: { size: 16, color } },
        { text: "CM", x: 0, xref: "paper", y: 0.18, yref: "paper", showarrow: false, font: { size: 16, color } },
      ],
    };
    Plotly.react(chart, traces, layout, { responsive: true, displaylogo: false });
    setStatus(`${visible.length} grid zones plotted.`);
  }

  async function init() {
    try {
      setStatus("Loading current FM.dat files from GitHub…");
      state.series = await loadSeries();
      state.series.forEach((item) => state.selected.add(item.id));
      renderSubmissionList();
      renderChart();
    } catch (error) {
      console.error(error);
      setStatus(`Unable to load results: ${error.message}`, "error");
    }
  }

  search.addEventListener("input", renderSubmissionList);
  selectAll.addEventListener("click", () => {
    matchingSeries().forEach((item) => state.selected.add(item.id));
    renderSubmissionList();
    renderChart();
  });
  clearAll.addEventListener("click", () => {
    matchingSeries().forEach((item) => state.selected.delete(item.id));
    renderSubmissionList();
    renderChart();
  });

  function setView(view) {
    dashboard.querySelectorAll("[data-dashboard-panel]").forEach((panel) => {
      panel.hidden = panel.dataset.dashboardPanel !== view;
    });
    dashboard.querySelectorAll("[data-dashboard-view]").forEach((button) => {
      const active = button.dataset.dashboardView === view;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-current", active ? "page" : "false");
    });
  }

  async function loadPressureView() {
    setView("pressure");
    if (state.pressureLoaded) return;
    try {
      setPressureStatus("Loading current CPCF files from GitHub…");
      state.pressureSeries = await loadPressureSeries();
      state.pressureSeries.forEach((item) => state.pressureSelected.add(item.fileId));
      state.pressureLoaded = true;
      populatePressureOptions();
      renderPressureSubmissionList();
      renderPressureChart();
    } catch (error) {
      console.error(error);
      setPressureStatus(`Unable to load CPCF results: ${error.message}`, "error");
    }
  }

  dashboard.querySelectorAll("[data-dashboard-view]").forEach((button) => {
    button.addEventListener("click", () => {
      if (button.dataset.dashboardView === "pressure") loadPressureView();
      else setView("forces");
    });
  });
  pressureSearch.addEventListener("input", renderPressureSubmissionList);
  pressureSelectAll.addEventListener("click", () => {
    matchingPressureFiles().forEach((item) => state.pressureSelected.add(item.fileId));
    renderPressureSubmissionList();
    renderPressureChart();
  });
  pressureClearAll.addEventListener("click", () => {
    matchingPressureFiles().forEach((item) => state.pressureSelected.delete(item.fileId));
    renderPressureSubmissionList();
    renderPressureChart();
  });
  pressureMetric.addEventListener("change", () => {
    state.pressureMetric = pressureMetric.value;
    renderPressureChart();
  });
  pressureBelt.addEventListener("change", () => {
    state.pressureBelt = pressureBelt.value;
    renderPressureChart();
  });
  pressureAoA.addEventListener("change", () => {
    state.pressureAoA = pressureAoA.value;
    renderPressureChart();
  });

  setView("forces");
  init();
})();

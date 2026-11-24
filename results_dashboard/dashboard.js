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
  const state = { series: [], selected: new Set() };

  function setStatus(message, stateName) {
    status.textContent = message;
    status.dataset.state = stateName || "info";
  }

  function parseQuotedValues(line) {
    return Array.from(line.matchAll(/"([^"]*)"/g), (match) => match[1]);
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
        zone: item.name || `Zone ${index + 1}`,
        rows: item.rows,
      }));
  }

  async function fetchJson(url) {
    const response = await fetch(url, { headers: { Accept: "application/vnd.github+json" } });
    if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
    return response.json();
  }

  async function loadSeries() {
    const tree = await fetchJson(`${repository}/git/trees/main?recursive=1`);
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

  function matchingSubmissions() {
    const query = search.value.trim().toLowerCase();
    return state.series
      .map((item) => item.submission)
      .filter((value, index, values) => values.indexOf(value) === index)
      .filter((value) => value.toLowerCase().includes(query));
  }

  function renderSubmissionList() {
    const submissions = matchingSubmissions();
    submissionList.replaceChildren();
    submissions.forEach((submission) => {
      const label = document.createElement("label");
      label.className = "results-dashboard__submission";
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = state.selected.has(submission);
      checkbox.dataset.submission = submission;
      checkbox.addEventListener("change", () => {
        if (checkbox.checked) state.selected.add(submission);
        else state.selected.delete(submission);
        renderChart();
      });
      label.append(checkbox, ` ${submission}`);
      submissionList.append(label);
    });
  }

  function renderChart() {
    const visible = state.series.filter((item) => state.selected.has(item.submission));
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
          name: `${item.submission} — ${item.zone}`,
          legendgroup: item.id,
          legendgrouptitle: { text: item.zone },
          customdata: rows.map(() => [item.zone]),
          hovertemplate: `<b>${label}</b><br>α: %{x}°<br>${metric}: %{y}<extra>${item.submission}<br>${item.zone}</extra>`,
          mode: "lines+markers",
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
      height: Math.max(420, Math.min(850, 250 + visible.length * 3)),
      margin: { l: 65, r: 25, t: 25, b: 55 },
      paper_bgcolor: "transparent",
      plot_bgcolor: "transparent",
      font: { color },
      legend: { orientation: "h", y: -0.14 },
      hovermode: "x unified",
      xaxis: axis("Angle of attack, α (deg)", [0.72, 1]),
      yaxis: axis("CL", [0.72, 1]),
      xaxis2: axis("Angle of attack, α (deg)", [0.38, 0.66]),
      yaxis2: axis("CD", [0.38, 0.66]),
      xaxis3: axis("Angle of attack, α (deg)", [0.04, 0.32]),
      yaxis3: axis("CM", [0.04, 0.32]),
      annotations: [
        { text: "CL", x: 0, xref: "paper", y: 0.86, yref: "paper", showarrow: false, font: { size: 16, color } },
        { text: "CD", x: 0, xref: "paper", y: 0.52, yref: "paper", showarrow: false, font: { size: 16, color } },
        { text: "CM", x: 0, xref: "paper", y: 0.18, yref: "paper", showarrow: false, font: { size: 16, color } },
      ],
    };
    Plotly.react(chart, traces, layout, { responsive: true, displaylogo: false });
    setStatus(`${state.selected.size} submissions selected; ${visible.length} grid zones plotted.`);
  }

  async function init() {
    try {
      setStatus("Loading current FM.dat files from GitHub…");
      state.series = await loadSeries();
      state.series.forEach((item) => state.selected.add(item.submission));
      renderSubmissionList();
      renderChart();
    } catch (error) {
      console.error(error);
      setStatus(`Unable to load results: ${error.message}`, "error");
    }
  }

  search.addEventListener("input", renderSubmissionList);
  selectAll.addEventListener("click", () => {
    matchingSubmissions().forEach((submission) => state.selected.add(submission));
    renderSubmissionList();
    renderChart();
  });
  clearAll.addEventListener("click", () => {
    matchingSubmissions().forEach((submission) => state.selected.delete(submission));
    renderSubmissionList();
    renderChart();
  });

  init();
})();

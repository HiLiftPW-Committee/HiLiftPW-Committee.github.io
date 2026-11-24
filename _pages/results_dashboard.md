---
layout: default
permalink: /results_dashboard/
title: HLPW6 Test Case 1 Results Dashboard
nav: false
sitemap: false
---

<link rel="stylesheet" href="../results_dashboard/dashboard.css?v=3">
<script src="https://cdn.plot.ly/plotly-2.35.2.min.js" defer></script>

<div class="results-dashboard results-dashboard--shell" data-results-dashboard>
  <aside class="results-dashboard__sidebar" aria-label="Dashboard views">
    <p class="results-dashboard__sidebar-title">HLPW6 · Test Case 1</p>
    <button type="button" class="results-dashboard__view is-active" data-dashboard-view="forces" aria-current="page">
      Forces &amp; Moments
    </button>
    <button type="button" class="results-dashboard__view" data-dashboard-view="pressure" aria-current="false">
      Pressure Coefficients
    </button>
  </aside>

  <main class="results-dashboard__main">
    <section data-dashboard-panel="forces">
  <p class="results-dashboard__intro">
    Proof of concept: total whole-body aerodynamic coefficients from the current
    <a href="https://github.com/High-Lift-Prediction-Workshop/HLPW6-TC1">HLPW6 Test Case 1 submissions</a>.
    Every reported grid zone is exposed as its own series. Submissions are
    grouped by Technical Focus Group (TFG).
  </p>

  <div class="results-dashboard__controls">
    <div class="results-dashboard__control-row">
      <label for="submission-search">Filter submissions</label>
      <input id="submission-search" type="search" placeholder="Search by participant or dataset…" data-submission-search>
      <button type="button" data-select-all>Select all</button>
      <button type="button" data-clear-all>Clear visible</button>
    </div>
    <div class="results-dashboard__submissions" data-submission-list aria-label="Submissions"></div>
    <p class="results-dashboard__status" data-dashboard-status role="status">Loading…</p>
  </div>

  <div class="results-dashboard__chart" data-dashboard-chart aria-label="Aerodynamic coefficients chart"></div>

  <p class="results-dashboard__notes">
    CL, CD, and CM are the submitted nondimensional total coefficients. Missing
    values marked -999 are omitted. Click legend entries to show or hide
    all three coefficient traces for a grid zone.
  </p>
    </section>

    <section data-dashboard-panel="pressure" hidden>
      <p class="results-dashboard__intro">
        Surface pressure and skin-friction distributions from submissions that
        provide a CPCF file. Select a coefficient, pressure belt, angle of
        attack, and one or more grid zones.
      </p>

      <div class="results-dashboard__controls">
        <div class="results-dashboard__control-row">
          <label for="pressure-metric">Coefficient</label>
          <select id="pressure-metric" data-pressure-metric>
            <option value="CP">Cp · pressure coefficient</option>
            <option value="CF">Cf · skin-friction coefficient</option>
          </select>
          <label for="pressure-belt">Pressure belt</label>
          <select id="pressure-belt" data-pressure-belt></select>
          <label for="pressure-aoa">Angle of attack</label>
          <select id="pressure-aoa" data-pressure-aoa></select>
        </div>
        <div class="results-dashboard__control-row">
          <label for="pressure-search">Filter CPCF submissions</label>
          <input id="pressure-search" type="search" placeholder="Search by participant or dataset…" data-pressure-search>
          <button type="button" data-pressure-select-all>Select all</button>
          <button type="button" data-pressure-clear-all>Clear visible</button>
        </div>
        <div class="results-dashboard__submissions" data-pressure-submission-list aria-label="CPCF submissions"></div>
        <p class="results-dashboard__status" data-pressure-status role="status">Select Pressure Coefficients to load CPCF files.</p>
      </div>

      <div class="results-dashboard__chart results-dashboard__pressure-chart" data-pressure-chart aria-label="Pressure coefficient chart"></div>
      <p class="results-dashboard__notes">
        CPCF traces use the submitted X coordinate as the horizontal axis.
        Missing values marked -999 are omitted.
      </p>
    </section>
  </main>
</div>

<script src="../results_dashboard/dashboard.js?v=7" defer></script>

---
layout: default
permalink: /results_dashboard/
title: HLPW6 Test Case 1 Results Dashboard
nav: false
sitemap: false
---

<link rel="stylesheet" href="{{ '/results_dashboard/dashboard.css' | relative_url }}">
<script src="https://cdn.plot.ly/plotly-2.35.2.min.js" defer></script>

<div class="results-dashboard" data-results-dashboard>
  <p class="results-dashboard__intro">
    Proof of concept: total whole-body aerodynamic coefficients from the current
    <a href="https://github.com/High-Lift-Prediction-Workshop/HLPW6-TC1">HLPW6 Test Case 1 submissions</a>.
    Every reported grid zone is exposed as its own series.
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
    individual traces.
  </p>
</div>

<script src="{{ '/results_dashboard/dashboard.js' | relative_url }}" defer></script>

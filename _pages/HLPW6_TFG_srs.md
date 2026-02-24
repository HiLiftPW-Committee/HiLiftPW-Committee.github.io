---
layout: default
permalink: /HLPW6/TFG_SRS
title: HLPW6 Scale-Resolving Simulations TFG
nav: false
---

# HLPW6: Scale-Resolving Simulations (SRS) Technical Focus Group

Welcome to the SRS TFG page for AIAA High Lift Prediction Workshop 6 (HLPW6). This group explores scale-resolving CFD methods (including WMLES and HRLES) for high-lift configurations, focusing on accuracy, affordability, grid requirements, and turbulence modeling for industrial applications.

## Join the TFG Distribution List
- Email: [konrad.a.goc@boeing.com](mailto:konrad.a.goc@boeing.com)

## Meeting Schedule and Access
- Bi-weekly on Tuesdays at 7:00 am PST / 10:00 am EST
- Meeting link (Teams):  
  [https://gov.teams.microsoft.us/l/meetup-join/19%3agcch%3ameeting_fc2077d8ffb4482fb80c13707d1515fa%40thread.v2/0?context=%7b%22Tid%22%3a%22bcf48bba-4d6f-4dee-a0d2-7df59cc36629%22%2c%22Oid%22%3a%22715af819-fa5f-480a-b2f0-dc313272648d%22%7d](https://gov.teams.microsoft.us/l/meetup-join/19%3agcch%3ameeting_fc2077d8ffb4482fb80c13707d1515fa%40thread.v2/0?context=%7b%22Tid%22%3a%22bcf48bba-4d6f-4dee-a0d2-7df59cc36629%22%2c%22Oid%22%3a%22715af819-fa5f-480a-b2f0-dc313272648d%22%7d)

## Participation Types
- Active participant (attend meetings and run simulations)
- Limited participant (attend meetings and run some simulations)
- Observer (attend meetings only)

## Group Leadership
- Konrad Goc — Boeing (Co-Leader; emphasis on LES methods)
- Eduardo Molina — Embraer (Co-Leader; emphasis on HRLES methods)
- Daniel Heathcote — Aurora Flight Sciences (Deputy Leader)

## Schedule and Milestones
- Test Case 1 — CRM-HLS: January to May 2026  
  Case hub: [https://aiaa-hlpw.org/HLPW6/cases](https://aiaa-hlpw.org/HLPW6/cases)  
  Looking for participants to run WRLES/DNS  
  Mini-Workshop 1: AIAA Aviation 2026 (8–12 June, San Diego, CA)  
  Session time: 5:30 pm PDT, Room Harbor B (hybrid option planned)

- Test Case 2 (TBD) — ONERA LRM 2.3 or 2.4: June 2026 to January 2027  
  Focus: Laminar–turbulent transition on slat; flap lift overprediction  
  Mini-Workshop 2: AIAA SciTech 2027 (11–15 Jan, Orlando, FL)

- Test Case 3 (Tentative) — CRM-HL Take-off Configuration: February 2027 to June 2027

- HLPW6: AIAA Aviation 2027 (7–11 June, San Diego, CA)

## Meeting Format
- Leadership updates (short)
- Participant updates (majority of time) — verbal and prepared updates welcome
- Open discussion

Presenter slide sharing:
- Please include and share your presentation with:
  - [heathcote.daniel@aurora.aero](mailto:heathcote.daniel@aurora.aero)
  - [eduardo.molina@embraer.com.br](mailto:eduardo.molina@embraer.com.br)
  - [konrad.a.goc@boeing.com](mailto:konrad.a.goc@boeing.com)
- Slides shared during the bi-weekly meetings will not be published outside the workshop.
- Slides should include numerical force/moment values listed on them to facilitate cross-plotting by the TFG Leadership Team

## Key Questions

### General
1. Are there meaningful distinctions in predictive accuracy among scale-resolving methods (e.g., WMLES, DES, LBM)? What are the relative strengths/weaknesses for maximum lift and key flow features (wing root separation, slat bracket wakes, flap separation)?
2. What is the state of affordability of scale-resolving methods for high-lift prediction? Are they feasible for routine industrial use on modern compute hardware?
3. Which turbulence model choices/frameworks are needed to systematically improve high-lift flow prediction accuracy?
4. What grid distribution/topology/density choices are required for accurate high-lift predictions? What are the implications for near-wall grid size for different SRS methods (e.g., WMLES/HRLES running at y+ in the log layer)?

### Test Case Specific
- TC1 (CRM-HLS, Jan–May 2026):  
  Can SRS methods provide a high-fidelity reference solution set, including solutions on highly resolved meshes (potentially WRLES/DNS)?
- TC1/TC2.1 (HLPW5 TC2.3/4, 3–4 AoAs near stall, Jun 2026–Jan 2027):  
  How should SRS methods handle laminar–turbulent transition, especially on the slat? How can the predicted leading-edge boundary layer state be validated (e.g., using experimental or DNS/WRLES data)?
- TC2.2 (HLPW5 TC2.3/4, 3 AoAs in linear CL range, Jun 2026–Jan 2027):  
  How can we improve accuracy at low angles of attack, where flap separation misprediction often leads to large lift errors?
- TC3 (likely ONERA takeoff config, Feb–May 2027):  
  Can SRS methods reliably predict aircraft drag at low angle of attack?

## Test Case 1: CRM-HLS Overview
- Simplified high-lift configuration developed via Boeing/University of Washington collaboration
- Geometry:
  - Finite span wing
  - Full-span slat
  - Partial span flap
  - Y=0 symmetry plane
- Reynolds number: 3.55 million based on chord (ReC)
- Built to target slat bracket wake separation on the second outboard bracket
- No experimental data yet (potentially mid-workshop)

## Resources and Support
- Tecplot complimentary licenses available for workshop participants  
  Contact: Gibson Adams — [g.adams@tecplot.com](mailto:g.adams@tecplot.com)
- Need grids to run on? Contact TFG leadership.
- Note: Grid characteristics may differ between HRLES and WMLES; pay attention to gridding strategies appropriate for your selected method.

## Presentations from Bi-Weekly TFG Meetings
- [TFG Meeting 3: 2/24/26](https://aiaa-hlpw.org/assets/HLPW6/SRS/26_02_24_HLPW6_SRS_TFG_Meeting.pdf)  
- [TFG Meeting 2: 2/10/26](https://aiaa-hlpw.org/assets/HLPW6/SRS/26_02_10_HLPW6_SRS_TFG_Meeting.pdf)  
- [Kickoff Meeting: 1/27/26](https://aiaa-hlpw.org/assets/HLPW6/SRS/26_01_27_HLPW6_SRS_TFG_Kickoff.pdf)

## HLPW6 Website
- Main site: [https://aiaa-hlpw.org/](https://aiaa-hlpw.org/)
- Cases page: [https://aiaa-hlpw.org/HLPW6/cases](https://aiaa-hlpw.org/HLPW6/cases)
- This TFG page: [https://aiaa-hlpw.org/HLPW6/TFG_SRS](https://aiaa-hlpw.org/HLPW6/TFG_SRS)

---
Last updated: 2026-02-10

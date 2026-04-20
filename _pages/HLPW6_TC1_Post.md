---
layout: default
permalink: /HLPW6/TC1_Post
title: HLPW6 Test Case 1 Post Processing
nav: false
---

# Test Case 1 Post Processing Information
## Data Submittal Forms
HLPW6 will utilize Github for data submittal. It will be up to the participant to upload their data to the Git Repository.

* [HLPW Github Page](https://github.com/High-Lift-Prediction-Workshop)
* Instructions for Uploading Data
* Detailed Instructions for Preparing Data Submittal Forms

## Post Processing: Upper Surface Streamlines and Skin Friction Coefficient (Cf) Contours
 Postprocessing: Upper Surface Streamlines and Skin Friction Coefficient (Cf) Contours
A major set of desired inputs from the CFD are computed surface streamlines, for qualitative comparison between datasets. This is particularly important for ascertaining the agreement/disagreement with regions of separation and other flow features of interest. Below is an example surface streamline plot, showing typical areas of interest for HLPW-4. There are many methods available for obtaining postprocessed surface streamline patterns; at this time, participants are encouraged to make use of the best tools at their disposal. 

Contours of surface skin friction coefficient are also very useful to plot (see second figure immediately below). We are requesting plots of skin friction magnitude (tau_w/freestream dynamic pressure), not plots of its x-component. Note that the definition of tau_w is standard: see, e.g., [Wall Shear Stress Definition](https://www.cfd-online.com/Wiki/Wall_shear_stress), with the derivative of the flow velocity parallel to the wall used in the equation. Within the Scale Resolving TFG, both temporally averaged and instantaneous skin friction plots are requested.

<div style="display: flex; gap: 10px;">
  <img src="https://aiaa-hlpw.org/assets/HLPW6/tc1/VIEW1_Str.png" style="width: 40%;" alt="Wing Streamlines">
  <img src="https://aiaa-hlpw.org/assets/HLPW6/tc1/VIEW1_Cf.png" style="width: 40%;" alt="Wing Skin Friction">
</div>


In the second figure, the Tecplot color map is provided as [cfmap_tecplot.map](https://aiaa-hlpw.org/assets/HLPW6/tc1/cfmap_tecplot.map), and the table below. The range is 0 to 0.02, step 0.002 (banded). In the Cf plots, the "lighting" should be turned off.

| LEVEL |	R   |	G   |	B   |
| ----- | --- | --- | --- |
| 0.00 	| 0   | 0   |	0   |
| 0.25  | 0   | 191 | 255 |
| 0.50  | 127 | 255 | 0   |
| 0.75  | 255 | 0   | 64  |
| 1.00  | 255 | 255 | 255 |

For direct CFD comparisons, five required views are shown below. In Tecplot, the "use perspective" feature is not turned on for any views. 

A single [Tecplot Layout file is included](https://aiaa-hlpw.org/assets/HLPW6/tc1/HLPW6_TC1.lay), which captures the views, the colormap settings, and streamlines. The different views are accessible through the pages feature of Tecplot. Note that Streamtraces should be enabled for the streamlines image, but disabled for the Skin Friction image.

The views are captured in the .lay file, but If additional definition is needed please reach out to your TFG leads.

VIEW_1_WING

<img src="https://aiaa-hlpw.org/assets/HLPW6/tc1/view1_wing.png" style="width: 50%;" alt="View 1">

VIEW_2_SLAT

<img src="https://aiaa-hlpw.org/assets/HLPW6/tc1/view2_slat.png" style="width: 50%;" alt="View 2">

VIEW_3_FLAP

<img src="https://aiaa-hlpw.org/assets/HLPW6/tc1/view3_flap.png" style="width: 50%;" alt="View 3">

VIEW_4_B2_TOP  (Bracket #2, Top)

<img src="https://aiaa-hlpw.org/assets/HLPW6/tc1/VIEW4_B2_TOP.png" style="width: 50%;" alt="View 4">

VIEW_5_B2_BOT (Bracket #2, Top)

<img src="https://aiaa-hlpw.org/assets/HLPW6/tc1/VIEW5_B2_BOT.png" style="width: 50%;" alt="View 5">

In addition to the five views described above, a supplementary view is requested to visualize off-surface flow physics related to outboard separation. This additional view utilizes volume cuts combined with the Q-criterion (either provided directly by the CFD solver or obtained via Tecplot as a postprocessing step) to illustrate the development and trajectory of slat-bracket vortices. A set of Tecplot macros can be downloaded [here](https://hlpw6.s3.us-east-1.amazonaws.com/website/TC1_Postprocessing/View6_TC1.zip) defining the view, volume cuts, and output variables (i.e., surface skin friction on the wing and Q-criterion on the volume cuts). Apply the inclusive macro (000_all.mcr) after surface boundary and volume data are uploaded to Tecplot with the grid system in inches.

VIEW_6_SLAT_BRACKET_WAKES

<img src="https://hlpw6.s3.us-east-1.amazonaws.com/website/TC1_Postprocessing/view6_sample.png" style="width: 50%;" alt="View 6">

## Postprocessing: Mean Surface Pressures and Skin Friction Extraction
The surface data are to be extracted along several pressure rows, which are defined using the equation Ax + By + C = D. The definitions of these planes are contained in [this spreadsheet](https://aiaa-hlpw.org/assets/HLPW6/tc1/TC1_Pressure_Rows.xlsx), and shown graphically below.

The first figure shows the basic layout of the chordwise rows. On the wing and slat, there are 7 pressure rows defined, WA through WG, and SA through SG. Each pressure row is defined by a single plane. Note that, when deployed, the pressure tap rows on the slat are not aligned with the wing (they are aligned only when stowed). The deployed flaps have 3 rows defined, FA through FC. 

![](https://aiaa-hlpw.org/assets/HLPW6/tc1/TC1_Belts_Chordwise_Labeled.png)

Additionally, there are 6 spanwise pressure rows defined over the wing, WSA through WSF. Note that Spanwise Row F also extends across the flap element, as belt FSF. This layout is shown in the figure below. For the spanwise rows, only data on the upper surfaces is requested though cuts through the entire upper and lower wing surface are also acceptable.

![](https://aiaa-hlpw.org/assets/HLPW6/tc1/TC1_Belts_Spanwise_labeled.png)



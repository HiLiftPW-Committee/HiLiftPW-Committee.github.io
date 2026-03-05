---
layout: default
permalink: /HLPW6/TC1_Post
title: HLPW6 Test Case 1 Post Processing
nav: false
---

# Test Case 1 Post Processing Information
## Data Submittal Forms
HLPW6 will utilize Github for data submittal. It will be up to the participant to upload their data to the Git Repository.

[HLPW Github Page](https://github.com/High-Lift-Prediction-Workshop)

Instructions for Uploading Data

Detailed Instructions for Preparing Data Submittal Forms

## Post Processing: Upper Surface Streamlines and Skin Friction Coefficient (Cf) Contours
 Postprocessing: Upper Surface Streamlines and Skin Friction Coefficient (Cf) Contours
A major set of desired inputs from the CFD are computed surface streamlines, for qualitative comparison between datasets. This is particularly important for ascertaining the agreement/disagreement with regions of separation and other flow features of interest. Below is an example surface streamline plot, showing typical areas of interest for HLPW-4. There are many methods available for obtaining postprocessed surface streamline patterns; at this time, participants are encouraged to make use of the best tools at their disposal. 

Contours of surface skin friction coefficient are also very useful to plot (see second figure immediately below). We are requesting plots of total skin friction (tau_w/freestream dynamic pressure), not plots of its x-component. Note that the definition of tau_w is standard: see, e.g., [Wall Shear Stress Definition](https://www.cfd-online.com/Wiki/Wall_shear_stress), with the derivative of the flow velocity parallel to the wall used in the equation.

In the second figure, the Tecplot color map is provided as cfmap_tecplot.map, and the table below. The recommended range (shown in the figure) is 0 to 0.015, step 0.001 (banded). In the Cf plot, the "lighting" has been turned off; this reduces the 3-dimensional appearance of the objects, but it improves the interpretability of the colors. If everyone removes lighting and follows the color scheme and range detailed here, then the resulting CFD plots should be reasonably easy to compare directly with one another.

| LEVEL |	R   |	G   |	B   |
| ----- | --- | --- | --- |
| 0.00 	| 0   | 0   |	0   |
| 0.25  | 0   | 191 | 255 |
| 0.50  | 127 | 255 | 0   |
| 0.75  | 255 | 0   | 64  |
| 1.00  | 255 | 255 | 255 |

For direct CFD comparisons, some recommended views (including Tecplot nomenclature for orientation) are shown below, where the configuration is in full-scale inches. In Tecplot, the "use perspective" feature is not turned on for any views.

## Postprocessing: Mean Surface Pressures and Skin Friction Extraction

---
layout: default
permalink: /HLPW6/cases2
title: HLPW6 Test Cases
nav: false
---

# Test Cases
The test cases outlined in this document have been constructed to help achieve the goals of the High Lift Prediction Workshop (HLPW). Participants are asked to provide flow solution data for these cases using grids appropriate for their particular methodology. A limited set of grids will be provided by the HLPW committee, but participants are also encouraged to create their own grids and share them with the committee. All grids will be made available from the High Lift Prediction Workshop website: https://aiaa-hlpw.org. For more information on the parameters required to generate your own grids, see the Gridding Guidelines posted to the HLPW website. Participants generating results with their own grids are expected to share the resulting mesh.

For this workshop, consolidated CFD results are requested from Technology Focus Groups (TFGs) established ahead of the workshop. These groups include, but are not limited to: (1) RANS, (2) Scale-Resolving CFD, (3) high-order discretization, and (4) Artificial Intelligence and Machine Learning. Results and summaries addressing specific technical questions will be presented by each TFG at the workshop. Individuals who choose not to participate on a TFG are free to compute the cases on their own, but their results will not be included in any summary presentations at the workshop. Initially, two cases are specified. A first simplified test case featuring a simple extruded wing (CRM-HLS), and a second configuration buildup case featuring four geometries of increasing complexity.   The second test case is a replication of what was done in HLPW-5 . 

## A General Note on Geometry
This workshop will utilize different configurations of the High Lift Common Research Model (CRM-HL) [1]. The CRM-HL is an open-source, publicly-available commercial transport aircraft geometry in a high lift configuration that is being utilized for CFD validation within a broad international CRM-HL Ecosystem. Specific test case geometry will either reflect the CRM-HL reference configuration, or explicitly match the “as-designed” geometric CAD definition of one particular wind tunnel models that were designed, built, and tested by an Ecosystem partner. Physical model geometry will often differ from the true reference geometry because of particular model requirements, however the differences are expected to be small and well documented. 

## Required Test Cases
Previous workshops designated test cases as either ‘Required’ or ‘Optional’ at the workshop level, with all TFGs working in parallell. In this workshop, ‘Required’ test cases are specified at the TFG level, with overlap between TFGs coordinated amongst leadership. While this provides less cross-TFG comparisons, it allows the TFGs to focus on their relevant issues and key questions. The required cases for this workshop will be considerably less than what was requested in HLPW-5.

# Test Case 1: CRM-HLS
The CRM-HLS (Simplified High-Lift Common Research Model) test case is designed to replicate some of the flow physics seen on the outboard wing of the full CRM-HL, but in a more simplistic manner. The geometry consists of a constant sectional profile cut from the full configuration just outboard of the end of the flaps. Geometry includes the main element, a slat, a semi-span flap, and several slat brackets designed to match the size and locations of the full model. These sectional profiles are extruded and swept to form a finite span simplified swept wing. Specifically, this model is designed to replicate the over-predicted separation typical of RANS solver behind the outboard slat brackets.

![CRM-HLS](https://aiaa-hlpw.org/assets/img/CRM_HLS.png)


# Test Case 2: CRM-HL Configuration Buildup
This test case is available to assess the ability of CFD to predict the effect of varying geometric fidelity through component build-up to help isolate specific types of flow physics associated with high-lift aerodynamics. Geometry is provided for four separate geometric configurations of increasing levels of complexity, with simulations to be performed free-air and compared to fully corrected data. Experimental data will be provided from wind tunnel campaigns utilizing both the ONERA [3] and Boeing models, tested at the ONERA F1 and QinetiQ 5m facilities, respectively. This test case is a duplicate of HLPW5 Test Case 2, as many questions were raised during the course of that workshop that weren’t satisfactorily answered. 

![CRM-HL Configuration Buildup](https://aiaa-hlpw.org/assets/img/TC2.png)

![Test Case 2 Geometry](https://commonresearchmodel.larc.nasa.gov/high-lift-prediction-workshop-5-cad-files/)

# References
1.	Lacy and Clark, “Definition of Initial Landing and Takeoff Reference Configurations for the High Lift Common Research Model (CRM-HL)”, AIAA-2020-2771, AIAA Aviation 2020 Forum, Virtual Event, June 2020.
2.	Diskin, Liu, and Galbraith, “High Fidelity CFD Verification Workshop 2024: Spalart-Allmaras QCR2000-R Turbulence Model”, AIAA-2023-1244, AIAA SciTech 2023 Forum, National Harbor, MD, January 2023.
3.	Mouton, S., Charpentier, G., and Lorenski, A., “Test Summary of the Full-Span High-Lift Common Research Model at the ONERA F1 Pressurized Low-Speed Wind Tunnel,” AIAA-2023-0823, AIAA SciTech Forum, January 2023.


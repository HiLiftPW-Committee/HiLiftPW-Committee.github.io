#!MC 1410

#extract_BL_from_solution
#release 8/10/2026
# Dan Heathcote, dan@flexcompute.com
# Rev A

# Required inputs: volume solution loaded to tecplot. View open showing contour. Single solution added. 
# Grid units MUST be in inches
# if not, generate the following variables via Data -> Alter -> Specify Equations
#
#{x_in} = {x}/0.0254
#{y_in} = {y}/0.0254
#{z_in} = {z}/0.0254

#Velocity magnitude should be normalized by freestream value

#BLP_BS1
$!ExtendedCommand 
  CommandProcessorID = 'Extract Precise Line'
  Command = 'XSTART = 10.6512218 YSTART = 16.848 ZSTART = -1.94066121 XEND = 8.68350404 YEND = 16.848 ZEND = 0.32386673 NUMPTS = 1000 EXTRACTTHROUGHVOLUME = T EXTRACTTOFILE = F '
#BLP_BS2
$!ExtendedCommand 
  CommandProcessorID = 'Extract Precise Line'
  Command = 'XSTART = 13.253084 YSTART = 16.848 ZSTART = -0.14223772 XEND = 11.69487308 YEND = 16.848 ZEND = 2.42134937 NUMPTS = 1000 EXTRACTTHROUGHVOLUME = T EXTRACTTOFILE = F '

#BLP_WS1
$!ExtendedCommand 
  CommandProcessorID = 'Extract Precise Line'
  Command = 'XSTART = 14.74003848 YSTART = 16.848 ZSTART = 0.29691953 XEND = 13.07830238 YEND = 16.848 ZEND = 2.79464513 NUMPTS = 1000 EXTRACTTHROUGHVOLUME = T EXTRACTTOFILE = F ' 
#BLP_WS2
$!ExtendedCommand 
  CommandProcessorID = 'Extract Precise Line'
  Command = 'XSTART = 18.47818326 YSTART = 16.848 ZSTART = 1.34952895 XEND = 18.22630237 YEND = 16.848 ZEND = 4.33893625 NUMPTS = 1000 EXTRACTTHROUGHVOLUME = T EXTRACTTOFILE = F '
#BLP_WS3
$!ExtendedCommand 
  CommandProcessorID = 'Extract Precise Line'
  Command = 'XSTART = 35.38866467 YSTART = 16.848 ZSTART = 1.2522416 XEND =  35.91631409 YEND = 16.848 ZEND = 6.22432226 NUMPTS = 1000 EXTRACTTHROUGHVOLUME = T EXTRACTTOFILE = F '
  
#BLP_FS1
$!ExtendedCommand 
  CommandProcessorID = 'Extract Precise Line'
  Command = 'XSTART = 41.174382 YSTART = 16.848 ZSTART = -0.39080026 XEND = 42.91721429 YEND = 16.848 ZEND = 2.05103012 NUMPTS = 1000 EXTRACTTHROUGHVOLUME = T EXTRACTTOFILE = F '
#BLP_FS2
$!ExtendedCommand 
  CommandProcessorID = 'Extract Precise Line'
  Command = 'XSTART = 43.46992787 YSTART = 16.848 ZSTART = -2.7021561 XEND = 47.37118566 YEND = 16.848 ZEND = 0.42517305 NUMPTS = 1000 EXTRACTTHROUGHVOLUME = T EXTRACTTOFILE = F ' 

$!RenameDataSetZone 
  Zone = 2
  Name = 'BLP_SB1'
$!RenameDataSetZone 
  Zone = 3
  Name = 'BLP_SB2'
$!RenameDataSetZone 
  Zone = 4
  Name = 'BLP_WB1'
$!RenameDataSetZone 
  Zone = 5
  Name = 'BLP_WB2'
$!RenameDataSetZone 
  Zone = 6
  Name = 'BLP_WB3'
$!RenameDataSetZone 
  Zone = 7
  Name = 'BLP_FB1'
$!RenameDataSetZone 
  Zone = 8
  Name = 'BLP_FB2'

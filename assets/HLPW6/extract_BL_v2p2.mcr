#!MC 1410

#extract_BL_from_solution
#release 8/10/2026
# Dan Heathcote, dan@flexcompute.com
# Rev B
# Added BL rake export including file name

# Required inputs: volume solution loaded to tecplot. View open showing contour. Single solution added. 
# Grid units MUST be in inches, N.B. only workshop provided grids not in inches are the Embraer ANSA family

# if using ANSA/Metric grids, generate variables under, Data -> Specify Equations using the equations below:

# {x_in} = {x}/0.0254
# {y_in} = {y}/0.0254
# {z_in} = {z}/0.0254

#then Plot -> Assign XYZ -> assign to new variables

#NOTE: generate normalized velocity magnitude if not a solver output. Freestream value, Ma = 0.2

#EXPORT: set the two variables below to a path and case name to prepend

$!VarSet |OUTDIR| = '/Users/dan/Documents' #your path goes here
$!VarSet |CASE| = 'CRM_HLS'	           #your case name goes here

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

$!ExtendedCommand 
  CommandProcessorID = 'excsv'
  Command = 'FrOp=1:ZnCount=1:ZnList=[2]:AllVars:ValSep=",":FNAME="|OUTDIR|/|CASE|_BLP_SB1.csv"'
$!ExtendedCommand 
  CommandProcessorID = 'excsv'
  Command = 'FrOp=1:ZnCount=1:ZnList=[3]:AllVars:ValSep=",":FNAME="|OUTDIR|/|CASE|_BLP_SB2.csv"'
$!ExtendedCommand 
  CommandProcessorID = 'excsv'
  Command = 'FrOp=1:ZnCount=1:ZnList=[4]:AllVars:ValSep=",":FNAME="|OUTDIR|/|CASE|_BLP_WB1.csv"'
$!ExtendedCommand 
  CommandProcessorID = 'excsv'
  Command = 'FrOp=1:ZnCount=1:ZnList=[5]:AllVars:ValSep=",":FNAME="|OUTDIR|/|CASE|_BLP_WB2.csv"'
$!ExtendedCommand 
  CommandProcessorID = 'excsv'
  Command = 'FrOp=1:ZnCount=1:ZnList=[6]:AllVars:ValSep=",":FNAME="|OUTDIR|/|CASE|_BLP_WB3.csv"'
$!ExtendedCommand 
  CommandProcessorID = 'excsv'
  Command = 'FrOp=1:ZnCount=1:ZnList=[7]:AllVars:ValSep=",":FNAME="|OUTDIR|/|CASE|_BLP_FB1.csv"'
$!ExtendedCommand 
  CommandProcessorID = 'excsv'
  Command = 'FrOp=1:ZnCount=1:ZnList=[8]:AllVars:ValSep=",":FNAME="|OUTDIR|/|CASE|_BLP_FB2.csv"'


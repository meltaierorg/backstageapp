using '${{ values.BicepRegistry}}'
//////////////////////////////
/////// PARAMETERs //////////
/////////////////////////////

// Define Az Deployment metdata 
param applicationName  = '${{ values.appName }}'             //used for tagging          

param owner = 'github-team-${{ values.owner }}'            //used for tagging

param environmentTagValue = '${{ values.environment }}'       //used for tagging               

param primaryLocation  = '${{ values.region }}'             

param resourceGroup  = '${{ values.resourceGroup }}'

param VMGroup01Count = ${{ values.count }}                             
param VMGroup01VMPrefix  = '${{ values.vmprefix }}'                 
param VMGroup01Size = '${{ values.size }}' 
param secretsKeyVaultName = '${{ values.keyVaultName }}'
param vmAdminPasswordSecret = '${{ values.vmAdminBreakGlassSecret }}'
param secretsVaultResourceGroup = '${{ values.keyvaultResourceGroup }}'         
param subnetNameVMGroup01 = '${{ values.subnet }}'    
param VMGroup01ASGPrefix = '${{ values.appName }}' 


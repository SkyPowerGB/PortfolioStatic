import * as compBuilder from "./componentBuilder.js";
import * as loaderHelper from "./contentLoaderModules/contentLoaderHelpers.js"
import * as filtersHelper from "./contentLoaderModules/filters.js";
import * as navbarHelper from "./contentLoaderModules/navbar.js";











// TODO structure change this data will be contained in site script
async function getFolderCatIndex(srcFolderRel) {
    let configJson = loaderHelper.getConfigJsonV2(srcFolderRel);

    let dataComponent = document.getElementById(configJson.folderCatIndexHolderId);

    let value = Number(dataComponent.value);

    if (value == NaN) {
        return -1;
    }
    return value;

}




/*---------------------------------------------------------------------------

  Load NAVBAR AND PAGE FILTERS

*/

//  *ConfigJson- > SitePosIndex:  ["src: 0","pages: 1", "contentSub: 2"....], 
async function loadNavbar(srcFolderRel, sitePosIndex) {
    let configJson = await loaderHelper.getConfigJsonV2(srcFolderRel);
    navbarHelper.loadNavbar(configJson,sitePosIndex);

}


async function loadPageFilters(srcFolderRel, targetComponentId, filterEventCallback) {
 let configJson=await loaderHelper.getConfigJsonV2(srcFolderRel);
    filtersHelper.loadPageFilters( configJson, targetComponentId, filterEventCallback);

}



//*------------------------------------------------------------------------------------*/



// --- New Load Functions

async function loadXlatestSummariesIntoV2(summaryNum, folderCat, targetId, srcFoldRel) {
    let configJson = await loaderHelper.getConfigJsonV2(srcFoldRel);

    let adressMapSetup=configJson.contentSetup.adressMapSetup;
    let adressMapMaxIndex= adressMapSetup.adressMapsIndexing[folderCat].count;
    let noDataIndex=adressMapSetup.noDataIndex;

    let loadedSummaries=0;

    for(let ami=noDataIndex+1;ami<=adressMapMaxIndex;ami++){

      let  adressMapLoadResult=await loaderHelper.getContentAdressMap(srcFoldRel,folderCat,ami);
        if(adressMapLoadResult.status==1){
       
            let adressMap= await adressMapLoadResult.result;
          

            let adressMapKeys=Object.keys(adressMap);

           

            for(let ki=adressMapKeys.length;ki>0;ki--){
                if(loadedSummaries==summaryNum){
                    break;
                }
              
                let adress=adressMap[ki];
                let folderName=adress.folderName
            
                let metadata= await loaderHelper.getContentMetadataV2(srcFoldRel,folderCat,folderName);

                let contentFolderRelPth= await loaderHelper.contentFolderLink(configJson,folderCat,folderName,srcFoldRel );
                let component= compBuilder.createSummaryItem(metadata,configJson,contentFolderRelPth);
           
                let targetComponent=document.getElementById(targetId);


                targetComponent.appendChild(component);
                loadedSummaries++;

                 

            }
            
        }
    }



    

    



}
// auto paginates the site
let pageNum = 0;
async function loadPaginatedSummaries(srcFoldRel, pageNum,folderCat, targetId) {
  

    
       let configJson = await loaderHelper.getConfigJsonV2(srcFoldRel);

    let adressMapSetup=configJson.contentSetup.adressMapSetup;
    let adressMapMaxIndex= adressMapSetup.adressMapsIndexing[folderCat].count;
    let noDataIndex=adressMapSetup.noDataIndex;
    let summaryNum=configJson.contentSetup.contentDataSetup.itemsPerPage;
    let skip=pageNum*summaryNum;

    let loadedSummaries=0;


    for(let ami=noDataIndex+1;ami<=adressMapMaxIndex;ami++){

    
      let  adressMapLoadResult=await loaderHelper.getContentAdressMap(srcFoldRel,folderCat,ami);

        if(adressMapLoadResult.status==1){
   
            let adressMap= await adressMapLoadResult.result;
          

            let adressMapKeys=Object.keys(adressMap);

           

            for(let ki=adressMapKeys.length;ki>0;ki--){
          
                if(loadedSummaries==summaryNum){
          
                    break;
                }
                if(skip==0){

              
                let adress=adressMap[ki];
                let folderName=adress.folderName
            


                if(filtersHelper.checkFiltersV2(adress.filters)){
                let metadata= await loaderHelper.getContentMetadataV2(srcFoldRel,folderCat,folderName);

                let contentFolderRelPth= await loaderHelper.contentFolderLink(configJson,folderCat,folderName,srcFoldRel);
                let component= compBuilder.createSummaryItem(metadata,configJson,contentFolderRelPth);
            

                let targetComponent=document.getElementById(targetId);


                targetComponent.appendChild(component);

                loadedSummaries++;
        
                }

                }else{
                    skip--;
             
                }

                 

            }
            
        }


   
    }

}





export {


    loadPageFilters,
    getFolderCatIndex,
    loadNavbar,
    loadXlatestSummariesIntoV2,
    loadPaginatedSummaries

}
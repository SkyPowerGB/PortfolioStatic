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
    navbarHelper.loadNavbar(configJson,sitePosIndex,srcFolderRel);

}


async function loadPageFilters(srcFolderRel, targetComponentId, filterEventCallback) {
 let configJson=await loaderHelper.getConfigJsonV2(srcFolderRel);
    filtersHelper.loadPageFilters( configJson, targetComponentId, filterEventCallback);

}




//*------------------------------------------------------------------------------------*/


async function loadMetadataInto(srcFoldRel,folderCat,folderNm,targetId){

    let configJson=await loaderHelper.getConfigJsonV2(srcFoldRel);
   let metadata= await loaderHelper.getContentMetadataV2(srcFoldRel,folderCat,folderNm);

   if(metadata==undefined){
    return;
   }

                let contentFolderRelPth= await loaderHelper.contentFolderLink(configJson,folderCat,folderNm,srcFoldRel);


                let dataTxtKey=configJson.contentSetup.metadataReadSetup.optionalTxtSummaryKey;
                  let summaryTxt="";
                  let summaryFileNm=metadata[dataTxtKey]
             
              
                 if(summaryFileNm!=undefined){
                  
                 summaryTxt=await loaderHelper.getMetadataTxt(contentFolderRelPth,summaryFileNm);
                 }
              
                let component= compBuilder.createSummaryItem(metadata,configJson,contentFolderRelPth,summaryTxt);
            

                let targetComponent=document.getElementById(targetId);


                targetComponent.appendChild(component);


}


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

            
           

            for(let ki=adressMapKeys.length-1;ki>=0;ki--){
                if(loadedSummaries==summaryNum){
                    break;
                }
              


                let key=adressMapKeys[ki]
                let adress=adressMap[key];
        

                let folderName=adress.folderName

                
            
                await loadMetadataInto(srcFoldRel,folderCat,folderName,targetId);
                loadedSummaries++;

                 

            }
            
        }
    }



    

    



}
// auto paginates the site
let pageNum = 0;
let loadedItems = new Set();

function refreshLoaded(){
    loadedItems=new Set();
}
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

           

          for (let key of adressMapKeys) {
    let adress = adressMap[key];
    if (loadedItems.has(adress.folderName)) continue; // skip already loaded

    if (!filtersHelper.checkFiltersV2(adress.filters)) continue; // skip non-matching

    await loadMetadataInto(srcFoldRel, folderCat, adress.folderName, targetId);
    loadedItems.add(adress.folderName);
    loadedSummaries++;

    if (loadedSummaries >= summaryNum) break; // page full
}
            
        }


   
    }

}





export {


    loadPageFilters,
    getFolderCatIndex,
    loadNavbar,
    loadXlatestSummariesIntoV2,
    loadPaginatedSummaries,
    refreshLoaded

}
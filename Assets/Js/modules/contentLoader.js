import * as compBuilder from "./componentBuilder.js";



async function getContentMetadataV2(configJson,folderPath){
    
    

      let metadataPath = folderPath + "/" + configJson.metadataJsonName + ".json";
      console.log("getting metadata:"+metadataPath)
   
    try {
        let response = await fetch(metadataPath);

        if (response.ok) {
            return response.json();
        } else {
            console.log("site metadata not found");
            return undefined;
        }

    } catch (e) {
        console.log("error getting site metadata");
        return undefined;

    }

}


async function getConfigJsonV2(srcFolderRel){
    let targetPath ="";
    let configFolderPath=" Config/Config.json"
    if (srcFolderRel!=undefined) {
        targetPath = srcFolderRel + configFolderPath;

    }else{
        targetPath=configFolderPath;
    }
    let response = await fetch(targetPath);
    if (response.ok) {
        return response.json();
    } else {
        return undefined;
    }



}

// src folder Rel : korisitit ..   ili ../..  za pomicanje u glavni folder
function getContentFolderRelPth(configJson, folderIndex, folderCatIndex, srcFolderRel) {


    console.log("category index: "+folderCatIndex);
    console.log("config json" + configJson.contentFolderName);
    console.log("src folder"+srcFolderRel)
    let folderPath="";
    if(srcFolderRel==undefined){
     folderPath=configJson.contentFolderName+"/"+configJson.folderCategoryName[folderCatIndex]+"/"+folderIndex;
    }else{
             folderPath=srcFolderRel+"/"+configJson.contentFolderName+"/"+configJson.folderCategoryName[folderCatIndex]+"/"+folderIndex;
    }

    
    console.log("content folder path: "+folderPath);
    return folderPath;

}



// summary load helper
async function loadSummaryInto(configJson, folderIndex, folderCatIndex, targetId, srcFolderRel) {


   

    let targetComponent = document.getElementById(targetId);
    let metadata;


    let folderPath=await getContentFolderRelPth(configJson,folderIndex,folderCatIndex,srcFolderRel);


    metadata= await getContentMetadataV2(configJson,folderPath);

    if(metadata==undefined){ console.log("metadata failed to load"); return;}

    let component = compBuilder.createSummaryItem(metadata, configJson,folderPath);
    

    targetComponent.append(component);
}






//----------contentLoader primary functions------------------------------------------
// srcFolderRel= relative path to SRC folder


// IMPROVED ACCES POINTS

async function loadXlatestSummariesInto(summaryNum,folderCatIndex,targetId,srcFolderRel){

    let configJson=await getConfigJsonV2(srcFolderRel);
    if(configJson==undefined){ console.log("failed to load configJson"); return;}
    
    let currIndex=configJson.folderCategoryMaxIndex[folderCatIndex];
    let noDataIndex=configJson.noDataIndex;



    for(let i=0;i<summaryNum;i++){
        if(currIndex==noDataIndex){return;}

        loadSummaryInto(configJson,currIndex,folderCatIndex,targetId,srcFolderRel);

        currIndex--;
    }


}

let pageNum=0;
async function loadPageSummaries(pageNum,itemsPerPage,folderCatIndex,targetId,srcFolderRel){}






export {
  
    loadXlatestSummariesInto
}
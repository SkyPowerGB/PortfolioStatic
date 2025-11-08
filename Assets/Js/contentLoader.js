import * as compBuilder from "./componentBuilder.js";

let folderCategories= ["Blog","Hobby"];

async function getContentMetadata(configJson,folderIndex,folderCatIndex){

    
    // setup path 
let folderPath;

if(!currLocSrc){
    folderPath="../"
}


folderPath=configJson.contentFolderName+"/"+folderIndex+"/"+configJson.folderCategoryName[folderCatIndex];


let metadataPath=folderPath+"/"+configJson.metadataJsonName+".json";
try{
let response =await fetch(metadataPath);

if(response.ok){
return response.json();
}else{
    console.log("site metadata not found");
    return undefined;
}

}catch(e) {
    console.log("error getting site metadata");
    return undefined;

}

}


async function getConfigJson(currLocOuter){
    let targetPath="Config/Config.json"
   if(!currLocOuter){
     targetPath="../"+targetPath;

   }

   let response=await fetch(targetPath);
   if(response.ok){
    return response.json();
   }else {
    return undefined;
   }

}

async function loadSummaryInto(configJson,folderIndex,folderCatIndex,targetId){
    let targetComponent=document.getElementById(targetId);

    let metadata=await getContentMetadata(configJson,folderIndex,folderCatIndex);

    let component=compBuilder(metadata,configJson,);
}




export  {
    getContentMetadata,
    getConfigJson,
    loadSummaryInto
}
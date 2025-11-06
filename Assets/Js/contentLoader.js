
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

if(!response.ok){
return;
}

}catch(e) {

}

}


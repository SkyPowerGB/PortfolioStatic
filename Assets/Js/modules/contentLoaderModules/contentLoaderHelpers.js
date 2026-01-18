let localConfigJson 
let configJsonTemp;
let adressMapTemp={};


async function getContentMetadata(configJson, folderPath) {



    let metadataPath = folderPath + "/" + configJson.contentSetup.contentDataSetup.metadataSetup.metadataFileName + ".json";



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



function getContentAdressMapCommonPath(adressMapPaths, folderCat, srcFolderRel) {

    let path = "";
    if (srcFolderRel != "") {

        path += srcFolderRel + "/";
        path += adressMapPaths.foldersLoc + "/" + folderCat;
        return path;
    }
    path += adressMapPaths.foldersLoc + "/" + folderCat;
    return path;

}


function getContentItemFolderPth(srcFoldRel, configJson, folderCat, folderName) {
    let targetPath = "";
    if (srcFoldRel != "") {
        targetPath += srcFoldRel + "/";
        
    }
    targetPath += configJson.contentSetup.contentDataSetup.contentFolder;
    targetPath += "/" + folderCat + "/" + folderName;

    return targetPath;
}



// folderCat this time is related to configJsonContentData not adress map (though they should always match) this is helper to build Href and SRC towards content folder
function contentFolderLink(configJson,folderCat,folderNm,srcFolderRel){

    let contentDataSetup=configJson.contentSetup.contentDataSetup;
 let folderPath = "";

    if (srcFolderRel == undefined) {
        folderPath = contentDataSetup.contentFolder + "/" + contentDataSetup.folderCatName[folderCat] + "/" + folderNm;
    } else {
        folderPath = srcFolderRel + contentDataSetup.contentFolder + "/" + contentDataSetup.folderCatName[folderCat] + "/" + folderNm;
    }


    return folderPath;



}

//*  FUNCTIONS TO ACCES

async function getContentAdressMap(srcFolderRel, folderCat, index) {

    let configJson= await getConfigJsonV2(srcFolderRel);
    let adressMapSetup=configJson.contentSetup.adressMapSetup;
   let folderPath=getContentAdressMapCommonPath(adressMapSetup.adressMapPaths,folderCat,srcFolderRel);
    let fullPath = folderPath + "/" + adressMapSetup.adressMapPaths.fileName + index + ".json";

    let maxIndex=adressMapSetup.adressMapsIndexing[folderCat].count;
    let noDataIndex=adressMapSetup.noDataIndex;

    let output={};
     output.status=-1;
    if(index<=noDataIndex){
        console.log("invalid index or no dataIndex")
       
        return output;
    }

    if(index>maxIndex){
        
        return output;
    }

    
    if(adressMapTemp[folderCat]!=undefined){
    let tempStorRes=  adressMapTemp[folderCat][index] ;
    if(tempStorRes!=null){
        output.status=1;
        output.result=  tempStorRes;
        return output;
    }
   }
    

    let result = await fetch(fullPath);

    if (result.ok) {
        let resultDATA = result.json();
        if(adressMapTemp[folderCat]==undefined){
            adressMapTemp[folderCat]={};
        }
        adressMapTemp[folderCat][index] = resultDATA;
        output.result=resultDATA;
        output.status=1;
        return output;
    }

}

async function getContentMetadataV2(srcFoldRel,folderCat,folderName){
    let configJson= await getConfigJsonV2(srcFoldRel);
return await getContentMetadata(configJson,getContentItemFolderPth(srcFoldRel,configJson,folderCat,folderName));
}

async function getMetadataTxt(folderPth,fileName){
let filePth=folderPth+"/"+fileName;
let response=await fetch(filePth);



if(response.ok){
    return response.text();
}else{
    return "failed to get metadataTxt";
}

}

async function getConfigJsonV2(srcFolderRel) {
    let targetPath = "";
    let configFolderPath = "Config/Config.json"

    let localConfigJson = localStorage.getItem("configJson");


    if (configJsonTemp != undefined) { return configJsonTemp }

    /*  if(localConfigJson!=undefined){
          configJsonTemp=localConfigJson;
          return localConfigJson;
      }
  */
    if (srcFolderRel != undefined) {
        targetPath = srcFolderRel + configFolderPath;


    } else {
        targetPath = configFolderPath;
    }
    let response = await fetch(targetPath);
    if (response.ok) {
        configJsonTemp = response.json();
    



        localStorage.setItem("configJson", configJsonTemp);
        return configJsonTemp;
    } else {
        return undefined;
    }



}






export{
getConfigJsonV2,
getContentAdressMap,
getContentMetadataV2,
contentFolderLink,
getMetadataTxt


}
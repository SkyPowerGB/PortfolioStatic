import * as compBuilder from "./componentBuilder.js";



async function getContentMetadataV2(configJson,folderPath){
    
    

      let metadataPath = folderPath + "/" + configJson.metadataJsonName + ".json";
    
   
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



let configJsonTemp;

async function getConfigJsonV2(srcFolderRel){
    let targetPath ="";
    let configFolderPath="Config/Config.json"
    if(configJsonTemp!=undefined){return configJsonTemp}
    if (srcFolderRel!=undefined) {
        targetPath = srcFolderRel + configFolderPath;
  

    }else{
        targetPath=configFolderPath;
    }
    let response = await fetch(targetPath);
    if (response.ok) {
        configJsonTemp=response.json();
        return configJsonTemp;
    } else {
        return undefined;
    }



}



// src folder Rel : korisitit ..   ili ../..  za pomicanje u glavni folder
function getContentFolderRelPth(configJson, folderIndex, folderCatIndex, srcFolderRel) {



    let folderPath="";
    if(srcFolderRel==undefined){
     folderPath=configJson.contentFolderName+"/"+configJson.folderCategoryName[folderCatIndex]+"/"+folderIndex;
    }else{
             folderPath=srcFolderRel+"/"+configJson.contentFolderName+"/"+configJson.folderCategoryName[folderCatIndex]+"/"+folderIndex;
    }


    return folderPath;

}

let filterObj={};

// summary load helper
async function loadSummaryInto(configJson, folderIndex, folderCatIndex, targetId, srcFolderRel ,hasFilters) {

     

    let targetComponent = document.getElementById(targetId);
    let metadata;


    let folderPath=await getContentFolderRelPth(configJson,folderIndex,folderCatIndex,srcFolderRel);


    metadata= await getContentMetadataV2(configJson,folderPath);

    if(metadata==undefined){ console.log("metadata failed to load"); return;}


    let filterPositive=checkFilters(metadata);
    
    

  
  if(!filterPositive){
    return;
  }


    let component = compBuilder.createSummaryItem(metadata, configJson,folderPath);
    

    targetComponent.append(component);
}



function checkFilters(metadata){



        let filterPositive=false;
    
        let empty=true;



    if(filterObj.filterGroups==undefined){return true;}
    if(!filterObj.filtersAcive){return true;}
    
    filterObj.filterGroups.forEach(element => {
        
         filtersArray=  filterObj[element];

        
       
         metadataFilters=filterObj[element];

         filtersArray.forEach(filterItem=>{

            if(metadataFilters.includes(filterItem)){
            
                filterPositive=true;
            }
         })



    });
  
    

  return filterPositive;

}


function setupFilerObj(filterGroup){

    filterObj[filterGroup]=[];
}




function filterEvent(e,filterItem,configJson){

    let checkboxElement=filterItem.querySelector("."+configJson.filterCheckbxClassMarker);
    let groupValueElement=filterItem.querySelector("."+configJson.filterGroupValueClassMarker);

    let groupValue=groupValueElement.value;
    let filterValue=checkboxElement.value;

  
    if(e.target!==checkboxElement){
    if(!checkboxElement.checked){

   
        checkboxElement.checked=true;
    



       addFilter(groupValue,filterValue);

    }else{
        console.log("remove filter");
       
     
   
        checkboxElement.checked=false;
        

                removeFilter(groupValue,filterValue);
    }
    }else{

        if(checkboxElement.checked){
             addFilter(groupValue,filterValue);
        }else{
              removeFilter(groupValue,filterValue);
        }

    }


  
}





//----------contentLoader primary functions------------------------------------------
// srcFolderRel= relative path to SRC folder


// IMPROVED ACCES POINTS



async function loadXlatestSummariesInto(summaryNum,folderCatIndex,targetId,srcFolderRel,hasFilters){

    let configJson=await getConfigJsonV2(srcFolderRel);
    if(configJson==undefined){ console.log("failed to load configJson"); return;}
    
    let currIndex=configJson.folderCategoryMaxIndex[folderCatIndex];
    let noDataIndex=configJson.noDataIndex;



    for(let i=0;i<summaryNum;i++){
        if(currIndex==noDataIndex){return;}

        loadSummaryInto(configJson,currIndex,folderCatIndex,targetId,srcFolderRel,hasFilters);

        currIndex--;
    }


}


async function loadPageSummaries(pageNum,folderCatIndex,targetId,srcFolderRel,hasFilters){

    let configJson=await getConfigJsonV2(srcFolderRel);
    if(configJson==undefined){ console.log("failed to load configJson"); return;}
    
    let currIndex=configJson.folderCategoryMaxIndex[folderCatIndex];
    let noDataIndex=configJson.noDataIndex;

     for(let i=currIndex-(configJson.itemsPerPage*pageNum);i>=noDataIndex;i--){
        loadSummaryInto(configJson,i,folderCatIndex,targetId,srcFolderRel,hasFilters);
     }



}




function addFilter(filterGroup,filter){
if(filterObj[filterGroup]==undefined){
    setupFilerObj(filterGroup);
    
}
if(filterObj[filterGroup].includes(filter)){return;}
filterObj[filterGroup].push(filter);
console.log(filterObj);
}

function removeFilter(filterGroup,filter){
    if(filterObj[filterGroup]==undefined){ return ;}
    setupFilerObj(filterGroup);
   filterObj[filterGroup]= filterObj[filterGroup].filter((item)=>{return item==filter;});
   console.log(filterObj);
}




async function loadPageFilters(srcFolderRel,targetComponentId){
    const configJson= await getConfigJsonV2(srcFolderRel);


    const targetComponent=document.getElementById(targetComponentId)
    const output=compBuilder.createFilterListElement(configJson);
    targetComponent.appendChild(output);


     let filters= output.getElementsByClassName(configJson.filterActionMarkerClass);

   for(let i=0;i<filters.length;i++){

    filters[i].addEventListener("click",(e)=>{filterEvent(e,filters[i],configJson)})
   }

    console.log("filters loaded");
}





export {
  
    loadXlatestSummariesInto,
    loadPageSummaries,
    loadPageFilters,
    getConfigJsonV2,
    addFilter,
    removeFilter
}
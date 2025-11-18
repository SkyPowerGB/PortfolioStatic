

function createSummaryItem(metadata,configJson,compFolderRelPth) {




    let containerElement = document.createElement("div");
    let linkElement = document.createElement("a");

    let headerElement = document.createElement("h1");
    let thumbnailElement = document.createElement("img");
    let descriptionElement = document.createElement("p");
    let dateElement = document.createElement("h4");


    containerElement.classList.add(configJson.summaryContainerClass);

    if(metadata[configJson.hasSite]){
    linkElement.href=compFolderRelPth;}else{
      
    }
    headerElement.innerHTML=metadata[configJson.summaryTitle]
    thumbnailElement.src=compFolderRelPth+"/"+metadata[configJson.thumbnail];
    descriptionElement.innerHTML=metadata[configJson.summaryData];
    dateElement.innerHTML=metadata[configJson.publishDateTile];



    linkElement.appendChild(thumbnailElement);
    linkElement.appendChild(headerElement);
    linkElement.appendChild(dateElement);
    linkElement.appendChild(descriptionElement);
    containerElement.appendChild(linkElement);



return containerElement;
}

 function createFilterListElement(configJson){


    let filterContainer=document.createElement("div");
  

    configJson.filterGroupListName.forEach((item)=>{

        filterContainer.append(createFilterGroup(configJson,item));
    });


    return filterContainer;

}


function createFilterGroup(configJson,filterGroupName){

    let filterList=configJson.filtersGroupLists[filterGroupName];
    let containerDiv=document.createElement("div");
    let header=document.createElement("h4");

    header.innerText=filterGroupName;
    containerDiv.append(header);

    filterList.forEach((element)=>{
        containerDiv.append( createFilterItem(element,configJson));
    });


return containerDiv;

}

function createFilterItem(filterItemName,configJson){

    let containerDiv=document.createElement("div");
    let inputCheckBx=document.createElement("input");
    let label=document.createElement("label");

    inputCheckBx.type="checkbox";
    label.innerHTML=filterItemName;

    containerDiv.classList.add(configJson.filterItemDivCssClass);
    containerDiv.classList.add(configJson.filterActionMarkerClass);


    containerDiv.appendChild(inputCheckBx);
    containerDiv.appendChild(label);

    return containerDiv;
}


export  {createSummaryItem,createFilterListElement}
import { createElement } from "react";


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

function createFilterListElement(configJson,filterIndex){

    let filterContainer=document.createElement("div");
    let filterHeader=document.createElement("h3");
    
    let filterHeaderName=configJson.filterNames[filterIndex];

    let filterGroupList=configJson.filters[filterHeaderName];

    
    filterHeader.innerHTML=filterHeaderName+":";
    filterHeader.classList.add(configJson.filterHeaderCssClass);
 


    filterContainer.appendChild(filterHeader);

    filterGroupList.forEach(element => {


        let checkbox=document.createElement("input");
        let label=document.createElement("label");
        let filterItemContainter=createElement("div");

        filterItemContainter.classList.add(configJson.filterCssClass);
        checkbox.type="checkbox";
        label.innerHTML=element;

        checkbox.value=element;

        filterItemContainter.appendChild(checkbox);
        filterItemContainter.appendChild(label);


        filterContainer.appendChild(filterItemContainter);
        
    });




    return filterContainer;

}




export  {createSummaryItem,createFilterListElement}
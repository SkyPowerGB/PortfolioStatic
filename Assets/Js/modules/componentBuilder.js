

function createSummaryItem(metadata, configJson, compFolderRelPth) {




    let containerElement = document.createElement("div");
    let linkElement = document.createElement("a");

    let headerElement = document.createElement("h1");
    let thumbnailElement = document.createElement("img");
    let descriptionElement = document.createElement("p");
    let dateElement = document.createElement("h4");


    containerElement.classList.add(configJson.summaryContainerClass);

    if (metadata[configJson.hasSite]) {
        linkElement.href = compFolderRelPth;
    } else {

    }
    headerElement.innerHTML = metadata[configJson.summaryTitle]
    thumbnailElement.src = compFolderRelPth + "/" + metadata[configJson.thumbnail];
    descriptionElement.innerHTML = metadata[configJson.summaryData];
    dateElement.innerHTML = metadata[configJson.publishDateTile];



    linkElement.appendChild(thumbnailElement);
    linkElement.appendChild(headerElement);
    linkElement.appendChild(dateElement);
    linkElement.appendChild(descriptionElement);
    containerElement.appendChild(linkElement);



    return containerElement;
}


// create full filter list 
function createFilterListElement(configJson) {


    let filterContainer = document.createElement("div");


    configJson.filterGroupListName.forEach((item) => {

        filterContainer.append(createFilterGroup(configJson, item));
    });


    return filterContainer;

}


//create filters for specific group
function createFilterGroup(configJson, filterGroupName) {

    let filterList = configJson.filtersGroupLists[filterGroupName];
    let containerDiv = document.createElement("div");
    let header = document.createElement("h4");

    header.innerText = filterGroupName;
    containerDiv.append(header);

    filterList.forEach((element) => {
        containerDiv.append(createFilterItem(element, configJson, filterGroupName));
    });


    return containerDiv;

}


// create single filter checkbox
function createFilterItem(filterItemName, configJson, filterGroupName) {

    let containerDiv = document.createElement("div");
    let inputCheckBx = document.createElement("input");
    let inputHidden = document.createElement("input");
    let label = document.createElement("label");

    inputHidden.type = "hidden";
    inputCheckBx.type = "checkbox";
    label.innerHTML = filterItemName;
    inputCheckBx.value = filterItemName;
    inputHidden.value = filterGroupName;



    containerDiv.classList.add(configJson.filterItemDivCssClass);

    //add classes for script events 
    containerDiv.classList.add(configJson.filterActionMarkerClass);

    // add classes for script to extract values
    inputHidden.classList.add(configJson.filterGroupValueClassMarker);
    inputCheckBx.classList.add(configJson.filterCheckbxClassMarker);


    containerDiv.appendChild(inputCheckBx);
    containerDiv.appendChild(label);
    containerDiv.appendChild(inputHidden);

    return containerDiv;
}


/**
 * 
 *
 * Setup in configJson uses the arrays below with index pointing path to use
 *ConfigJson- > SitePosIndex:  ["src-0","pages-1", "contentSub-2"....], 
 arrays are in ConfigJson.navbarPaths

 * navbarPaths has arrays with paths , key for array is told by "ConfigJson.navbarItems SITE FOLDER":
  ->   "NavBarItems__Reference":  ["SITE_NAME","SITE_FOLDER",SITE],

  to get href use SITE_FOLDER[current site pos index] + SITE
 * 
*/

function navbarUlBuilder(configJson,currSitePosIndex) {
    let ul_Element = document.createElement("ul");
    let navbarItemsAtt=Object.keys(configJson.navbarSetup.navbarItems);
    let navbarItems=configJson.navbarSetup.navbarItems;
  
    navbarItemsAtt.forEach(navItemNm=>{

        let li_Element=document.createElement("li");
        let a_Element=document.createElement("a");

        let navbarItem=navbarItems[navItemNm];

       a_Element.innerText=navbarItem[0];
    
       
     a_Element.href=configJson.navbarSetup.navbarPaths[navbarItem[1]][currSitePosIndex]+navbarItem[2];
     
       

       li_Element.classList.add(configJson.navbarSetup.navBarLiElementClass);

       li_Element.appendChild(a_Element);
       ul_Element.appendChild(li_Element);
    });

    ul_Element.classList.add(configJson.navbarSetup.navBarUlElementClass);

 
    return ul_Element;
}





export { createSummaryItem, createFilterListElement ,navbarUlBuilder}
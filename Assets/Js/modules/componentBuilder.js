

function createSummaryItem(metadata, configJson, compFolderRelPth, summaryTxt) {


    let contentSetup = configJson.contentSetup;
    let contentDisplaySetup = contentSetup.contentDisplaySetup;
    let metadataReadSetup = contentSetup.metadataReadSetup;

    // making components and populating them------------------- main container

    let mainCont = document.createElement("div");

    mainCont.classList.add(contentDisplaySetup.mainCont.class);


    //-------------------------------------------------------- arcticle link
    let articleLink = document.createElement("a");

    articleLink.href = compFolderRelPth;
    articleLink.classList.add(contentDisplaySetup.articleLink.class);



    //------------------------------------------------- image container

    let imageCont = document.createElement("div");
    imageCont.classList.add(contentDisplaySetup.imageCont.class);

    //------------------------------------------------- image element
    let imageEle = document.createElement("img");

    let imageFileNm = metadata[metadataReadSetup.thumbnailKey];
    let imagePth = compFolderRelPth + "/" + imageFileNm;
       let hadimg=metadata[metadataReadSetup.thumbnailKey];
       if(hadimg!=undefined){
    imageEle.src = imagePth;}
 
    imageEle.classList.add(contentDisplaySetup.image.class);

    //------------------------------------------------- date container

    let dateCont = document.createElement("div");
    dateCont.classList.add(contentDisplaySetup.dateCont.class);

    //-------------------------------------------------date element
    let dateEle = document.createElement("p");

    let dateData = metadata[metadataReadSetup.dateKey];
    dateEle.innerText = dateData;
    dateEle.classList.add(contentDisplaySetup.date.class);


    //-------------------------------------------------header container

    let headerCont = document.createElement("div");
    headerCont.classList.add(contentDisplaySetup.titleCont.class);

    //-------------------------------------------------header element
    let headerEle = document.createElement("h2");

    let titleData = metadata[metadataReadSetup.titleKey];
    headerEle.innerText = titleData;
    headerEle.classList.add(contentDisplaySetup.title.class);

    //-------------------------------------------------sumamry container
    let summaryCont = document.createElement("div");
    summaryCont.classList.add(contentDisplaySetup.summaryCont.class);

    //-------------------------------------------------summary
    let summaryEle = document.createElement("p");
    summaryEle.classList.add(contentDisplaySetup.summary.class);

    if (summaryTxt == "") {
        let summaryData = metadata[metadataReadSetup.summaryKey];
        summaryEle.innerText = summaryData;
    } else {
        summaryEle.innerText = summaryTxt;
    }

    //-----------------------------------------------------------------------------------
    imageCont.appendChild(imageEle);
    dateCont.appendChild(dateEle);
    headerCont.appendChild(headerEle);
    summaryCont.appendChild(summaryEle);

    if(metadata[metadataReadSetup.hasSiteKey]){

        
        if(hadimg!=undefined){
    articleLink.appendChild(imageCont);
        }
    articleLink.appendChild(dateCont);
    articleLink.appendChild(headerCont);
    articleLink.appendChild(summaryCont);
    mainCont.appendChild(articleLink);
    }else{
           if(hadimg!=undefined){
    mainCont.appendChild(imageCont);
           }
    mainCont.appendChild(dateCont);
    mainCont.appendChild(headerCont);
    mainCont.appendChild(summaryCont);
    }
   
    
    //----------------------------------------------------------------------------------


    return mainCont;
}









// create full filter list 
function createFilterListElement(configJson) {


    let filterContainer = document.createElement("div");

    filterContainer.classList.add(configJson.filtersContainerCssClass);



    filterContainer.id = configJson.filtersContainerCssId;
    configJson.filterGroupListName.forEach((item) => {

        filterContainer.append(createFilterGroup(configJson, item));
    });



    return filterContainer;

}

function createFiltersHideShowBtn(configJson) {

    let filters_close = document.createElement("div");
    filters_close.id = configJson.filterCloseBtnID;
    filters_close.innerText = configJson.filtersOpenBtnTxt;
    return filters_close;


}


//create filters for specific group
function createFilterGroup(configJson, filterGroupName) {

    let filterList = configJson.filtersGroupLists[filterGroupName];
    let containerDiv = document.createElement("div");
    let header = document.createElement("h4");

    containerDiv.classList.add(configJson.filtersGroupContainerClass);
    header.innerText = filterGroupName;
    containerDiv.append(header);

    filterList.forEach((element) => {
        containerDiv.append(createFilterItem(element, configJson, filterGroupName));
    });


    return containerDiv;

}


// create single filter checkbox
function createFilterItem(filterItemName, configJson, filterGroupName) {
 
    let filtersSetup=configJson.filtersSetup;
    let FiltersElementsSetup=filtersSetup.FiltersElementsSetup;

    let containerDiv = document.createElement("div");
    let inputCheckBx = document.createElement("input");
    let inputHidden = document.createElement("input");
    let label = document.createElement("label");

    inputHidden.type = "hidden";
    inputCheckBx.type = "checkbox";
    label.innerHTML = filterItemName;
    inputCheckBx.value = filterItemName;
    inputHidden.value = filterGroupName;



    containerDiv.classList.add(FiltersElementsSetup.filterItemEle.class);
    containerDiv.classList.add(FiltersElementsSetup.filterItemEle.unchecked);

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
  ->   "NavBarItems__Reference":  ["SITE_NAME","SITE_FOLDER",SITE...],

  to get href use SITE_FOLDER[current site pos index] + SITE
 * 
*/

//currsitename optional for curr site css must match navbar items name
function navbarUlBuilder(configJson, currSitePosIndex,currsiteName) {
    let ul_Element = document.createElement("ul");
    let navbarSetup=configJson.navbarSetup;
    let navbarItemsAtt = Object.keys(navbarSetup.navbarItems);
    let navbarItems = navbarSetup.navbarItems;

    let navbarLiClass = configJson.navbarSetup.navBarLiElementClass;

    navbarItemsAtt.forEach(navItemNm => {

        let li_Element = document.createElement("li");
        let a_Element = document.createElement("a");


        let navbarItem = navbarItems[navItemNm];

        a_Element.innerText = navbarItem[0];


        let aHref=configJson.navbarSetup.navbarPaths[navbarItem[1]][currSitePosIndex] + navbarItem[2];
        a_Element.href = aHref;

    
console.log(currsiteName)
        if(navItemNm==currsiteName){

         
            li_Element.classList.add(navbarSetup.navBarCurrSiteClass);
        }
        
    

        li_Element.classList.add(navbarLiClass);

        li_Element.appendChild(a_Element);
        ul_Element.appendChild(li_Element);
    });
    /*    let li_Element_hamb = document.createElement("li");
     
         li_Element_hamb.innerText="≡";
         li_Element_hamb.classList.add(navbarLiClass);
         li_Element_hamb.id="TriBarBtn";
     
        ul_Element.appendChild(li_Element_hamb);*/
    ul_Element.classList.add(configJson.navbarSetup.navBarUlElementClass);


    return ul_Element;
}

function createNavbarHamb(configJson) {
    let div_element = document.createElement("div");

    div_element.id = configJson.navbarSetup.tribarElementID;

    div_element.innerText = "≡";
    return div_element;

}




export { createSummaryItem, createFilterListElement, navbarUlBuilder, createNavbarHamb, createFiltersHideShowBtn }
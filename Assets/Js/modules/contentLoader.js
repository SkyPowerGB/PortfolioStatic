import * as compBuilder from "./componentBuilder.js";




//-- NAVBAR--------------------------------------------------------------------------------------------------------

//-CONTENT---------------------------------------------------------------------------------------------------------

async function getContentMetadataV2(configJson, folderPath) {



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

async function getConfigJsonV2(srcFolderRel) {
    let targetPath = "";
    let configFolderPath = "Config/Config.json"
    if (configJsonTemp != undefined) { return configJsonTemp }
    if (srcFolderRel != undefined) {
        targetPath = srcFolderRel + configFolderPath;


    } else {
        targetPath = configFolderPath;
    }
    let response = await fetch(targetPath);
    if (response.ok) {
        configJsonTemp = response.json();
        console.log("config json here");
        return configJsonTemp;
    } else {
        return undefined;
    }



}


// src folder Rel : korisitit ..   ili ../..  za pomicanje u glavni folder
function getContentFolderRelPth(configJson, folderIndex, folderCatIndex, srcFolderRel) {



    let folderPath = "";
    if (srcFolderRel == undefined) {
        folderPath = configJson.contentFolderName + "/" + configJson.folderCategoryName[folderCatIndex] + "/" + folderIndex;
    } else {
        folderPath = srcFolderRel + configJson.contentFolderName + "/" + configJson.folderCategoryName[folderCatIndex] + "/" + folderIndex;
    }


    return folderPath;

}



/**
 * Summary loader loads summary item for page to display
 * returns -1 if fails,
 * returns 0 if item was skipped : filters active
 * returns 1 on success
 * 
 */

async function loadSummaryInto(configJson, folderIndex, folderCatIndex, targetId, srcFolderRel) {



    let targetComponent = document.getElementById(targetId);
    let metadata;


    let folderPath = await getContentFolderRelPth(configJson, folderIndex, folderCatIndex, srcFolderRel);


    metadata = await getContentMetadataV2(configJson, folderPath);

    if (metadata == undefined) { console.log("metadata failed to load"); return -1; }


    let filterPositive = checkFilters(metadata);




    if (!filterPositive) {

        return 0;
    }



    let component = compBuilder.createSummaryItem(metadata, configJson, folderPath);


    targetComponent.append(component);

    return 1;
}



//---------FILTERS --------------------------------------------------------------------------------------

let filterObj = {};
function checkFilters(metadata) {


    if (metadata == undefined) { return true; }



    let isFilterMatch = false;

    let AllFilterGroupsEmpty = true;
    let filterGroups = Object.keys(filterObj);

    // loop filter groups
    filterGroups.forEach((group) => {



        // get group filter list
        let filterList = filterObj[group];

        // get metadata filter list for that group
        let metadataFilterList = metadata[group];

        // continure if not empty
        if (filterList.length > 0) {
            AllFilterGroupsEmpty = false;

            // check if group list even exist in the metadata
            if (metadataFilterList !== undefined) {

                // loop filter selected items
                filterList.forEach(filterItem => {



                    // check for match  single match =correct
                    isFilterMatch = metadataFilterList.includes(filterItem)



                });


            }

        }

    });

    if (AllFilterGroupsEmpty) {
        return true;
    }


    return isFilterMatch;

}


function setupFilerObj(filterGroup) {

    filterObj[filterGroup] = [];
}


// check uncheck checkbox (container has event listener not checkbox)

function addFilter(filterGroup, filter) {
    if (filterObj[filterGroup] == undefined) {
        setupFilerObj(filterGroup);

    }
    if (filterObj[filterGroup].includes(filter)) { return; }
    filterObj[filterGroup].push(filter);

}

function removeFilter(filterGroup, filter) {
    if (filterObj[filterGroup] == undefined) { return; }

    filterObj[filterGroup] = filterObj[filterGroup].filter((item) => { return item != filter; });


}


// checkbox container event function abstraction
function filterEvent(e, filterItem, configJson, callback) {

    let checkboxElement = filterItem.querySelector("." + configJson.filterCheckbxClassMarker);
    let groupValueElement = filterItem.querySelector("." + configJson.filterGroupValueClassMarker);

    let groupValue = groupValueElement.value;
    let filterValue = checkboxElement.value;


    if (e.target !== checkboxElement) {
        if (!checkboxElement.checked) {


            checkboxElement.checked = true;




            addFilter(groupValue, filterValue);

        } else {




            checkboxElement.checked = false;


            removeFilter(groupValue, filterValue);
        }
    } else {

        if (checkboxElement.checked) {
            addFilter(groupValue, filterValue);
        } else {
            removeFilter(groupValue, filterValue);
        }

    }

    if (callback === undefined) { return; }

    callback(e);
}




let hambStateShow = false
async function handleNavHambClick(srcFolderRel) {
    let configJson = await getConfigJsonV2(srcFolderRel);
    let navElementsCss = configJson.navbarSetup.navBarLiElementClass;
    let navElements = document.getElementsByClassName(navElementsCss);

    hambStateShow = !hambStateShow;



    for (let i = 1; i < navElements.length; i++) {


        let navItem = navElements[i];

        if (!hambStateShow) {
            navItem.style.display = "none"
        } else {
            navItem.style.display = "flex";
        }




    }


}

async function handleFiltersToggleClick(srcFolderRel,eventTarget) {
    let configJson = await getConfigJsonV2(srcFolderRel);
    let targetComponent = document.getElementById(configJson.filtersContainerCssId);
    

    if (targetComponent.classList.contains(configJson.filtresContainerCssClassShown)) {
        targetComponent.classList.remove(configJson.filtresContainerCssClassShown);
        eventTarget.innerText=configJson.filtersOpenBtnTxt;
    } else {
        targetComponent.classList.add(configJson.filtresContainerCssClassShown);
        eventTarget.innerText=configJson.filtersCloseBtnTxt;
    }


    if (targetComponent.classList.contains(configJson.filtersContainerCssClass)) {
        targetComponent.classList.remove(configJson.filtersContainerCssClass);
    } else {
        targetComponent.classList.add(configJson.filtersContainerCssClass);
    }


}




//----------contentLoader primary functions------------------------------------------
// srcFolderRel= relative path to SRC folder


// IMPROVED ACCES POINTS



async function loadXlatestSummariesInto(summaryNum, folderCatIndex, targetId, srcFolderRel,) {

    let configJson = await getConfigJsonV2(srcFolderRel);
    if (configJson == undefined) { console.log("failed to load configJson"); return; }


    let currIndex = configJson.folderCategoryMaxIndex[folderCatIndex];
    let noDataIndex = configJson.noDataIndex;



    for (let i = 0; i < summaryNum; i++) {
        if (currIndex == noDataIndex) { return; }

        await loadSummaryInto(configJson, currIndex, folderCatIndex, targetId, srcFolderRel);

        currIndex--;
    }


}

// returns false if no content is there to load
async function loadPageSummaries(pageNum, folderCatIndex, targetId, srcFolderRel) {

    let configJson = await getConfigJsonV2(srcFolderRel);
    if (configJson == undefined) { console.log("failed to load configJson"); return false; }
    if (folderCatIndex > configJson.folderCategoryMaxIndex.length || folderCatIndex < 0) {
        console.log("FolderCatIndex out of bounds");
        return false;
    }

    let maxIndex = configJson.folderCategoryMaxIndex[folderCatIndex];
    let noDataIndex = configJson.noDataIndex;



    let i = maxIndex;
    let offset = (configJson.itemsPerPage * pageNum);
    i -= offset;
    let target = i - configJson.itemsPerPage;

    if (i <= noDataIndex) { return false; }


    while (i > target) {

        if (i <= noDataIndex) {
            break;
        }

        let result = await loadSummaryInto(configJson, i, folderCatIndex, targetId, srcFolderRel);

        if (result == 0) {


            target--;

        }
        i--;
    }

    return true;

}



async function loadPageFilters(srcFolderRel, targetComponentId, filterEventCallback) {
    const configJson = await getConfigJsonV2(srcFolderRel);


    const targetComponent = document.getElementById(targetComponentId)
    const output = compBuilder.createFilterListElement(configJson);
    targetComponent.appendChild(output);

    let filtersToggleBtn = compBuilder.createFiltersHideShowBtn(configJson);

    targetComponent.appendChild(filtersToggleBtn);

    let filters = output.getElementsByClassName(configJson.filterActionMarkerClass);

    for (let i = 0; i < filters.length; i++) {

        filters[i].addEventListener("click", (e) => { filterEvent(e, filters[i], configJson, filterEventCallback) })
    }

    filtersToggleBtn.addEventListener("click", (e) => { handleFiltersToggleClick(srcFolderRel,filtersToggleBtn); })


}


// TODO structure change this data will be contained in site script
async function getFolderCatIndex(srcFolderRel) {
    let configJson = await getConfigJsonV2(srcFolderRel);

    let dataComponent = document.getElementById(configJson.folderCatIndexHolderId);

    let value = Number(dataComponent.value);

    if (value == NaN) {
        return -1;
    }
    return value;

}

//  *ConfigJson- > SitePosIndex:  ["src: 0","pages: 1", "contentSub: 2"....], 
async function loadNavbar(srcFolderRel, sitePosIndex) {
    let configJson = await getConfigJsonV2(srcFolderRel);
    let targetComponent = document.getElementById(configJson.navbarSetup.navBarDivContElementID);
    let hambComponent = await compBuilder.createNavbarHamb(configJson);

    if (targetComponent != null) {

        targetComponent.append(hambComponent);
        targetComponent.insertBefore(compBuilder.navbarUlBuilder(configJson, sitePosIndex), targetComponent.firstChild);
        hambComponent.addEventListener("click", () => { handleNavHambClick(srcFolderRel); });
    }

}


export {

    loadXlatestSummariesInto,
    loadPageSummaries,
    loadPageFilters,
    getConfigJsonV2,
    getFolderCatIndex,
    loadNavbar,

}
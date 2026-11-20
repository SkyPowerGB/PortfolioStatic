import * as compBuilder from "../componentBuilder.js";

/** filterObj
 * {
 * filterGroupName:[filterA,filterB]
 * }
 * 
 */
let filterObj = {};


// filters improved--------------------------------------------------------------


function checkFiltersV2(adressMapFilters) {
    let filterGroups = Object.keys(filterObj);

    if (filterGroups.length === 0) return true;

    let allFilterGroupsEmpty = true;

    for (let group of filterGroups) {
        let filterList = filterObj[group];
        let adressmapFilterGroup = adressMapFilters[group];

        if (filterList.length > 0) {
            allFilterGroupsEmpty = false;
            if (adressmapFilterGroup) {

                let match = filterList.some(filterItem => adressmapFilterGroup.includes(filterItem));
                if (!match) {

                    return false;
                }
            } else {

                return false;
            }
        }
    }

    return true;
}

function setupFilerObj(filterGroup) {
    filterObj[filterGroup] = [];
}

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

// ****************************************************************************************************************************************




// checkbox container event function abstraction

// old function to be DEPRECATED  
function filterEvent(event, filterItem, configJson, callback) {

    let checkboxElement = filterItem.querySelector("." + configJson.filterCheckbxClassMarker);
    let groupValueElement = filterItem.querySelector("." + configJson.filterGroupValueClassMarker);
    
    let filtersSetup=configJson.filtersSetup;
    let FiltersElementsSetup=filtersSetup.FiltersElementsSetup;
    

    let groupValue = groupValueElement.value;
    let filterValue = checkboxElement.value;


    if (event.target !== checkboxElement) {
        if (!checkboxElement.checked) {


            checkboxElement.checked = true;
            filterItem.classList.add(FiltersElementsSetup.filterItemEle.checked);
            filterItem.classList.remove(FiltersElementsSetup.filterItemEle.unchecked);

            addFilter(groupValue, filterValue);

        } else {



            filterItem.classList.remove(FiltersElementsSetup.filterItemEle.checked);
            filterItem.classList.add(FiltersElementsSetup.filterItemEle.unchecked);
            checkboxElement.checked = false;


            removeFilter(groupValue, filterValue);
        }
    } else {

        if (checkboxElement.checked) {
            addFilter(groupValue, filterValue);
            filterItem.classList.add(FiltersElementsSetup.filterItemEle.checked);
            filterItem.classList.remove(FiltersElementsSetup.filterItemEle.unchecked);
        } else {
            removeFilter(groupValue, filterValue);
            filterItem.classList.remove(FiltersElementsSetup.filterItemEle.checked);
            filterItem.classList.add(FiltersElementsSetup.filterItemEle.unchecked);
        }

    }

    if (callback === undefined) { return; }

    callback(event);
}




/**
 * New filters event
 * filterSetup_ui refers to ui within filters setup  that cointains  all releated ui element classes
 * callback sends event object back for fruther processing
 * 
 * whole function primary purpouse is to check checkbox on event+ add css classes for UI display
 * 
 * 
 */

// temp storage for css class to not reread them.

let checkedClass = null;
let uncheckedClass = null;

function filterEventV2(event, filterItem, filtersSetup_Ui, callback) {

    let checkboxElement = filterItem.querySelector("." + filtersSetup_Ui.checkboxMarkerClass);
    let groupValueElement = filterItem.querySelector("." + filtersSetup_Ui.groupValueMarkerClass);


    if (checkedClass == null) {
        checkedClass = filtersSetup_Ui.checkedClass;
        uncheckedClass = filtersSetup_Ui.uncheckedClass;
    }

    let groupValue = groupValueElement.value;
    let filterValue = checkboxElement.value;


    if (event.target !== checkboxElement) {

        if (!checkboxElement.checked) {


            checkboxElement.checked = true;
            filterItem.classList.add(checkedClass);
            filterItem.classList.remove(uncheckedClass);

            addFilter(groupValue, filterValue);

        } else {



            filterItem.classList.remove(checkedClass);
            filterItem.classList.add(uncheckedClass);
            checkboxElement.checked = false;


            removeFilter(groupValue, filterValue);
        }
    } else {

        if (checkboxElement.checked) {
            addFilter(groupValue, filterValue);
            filterItem.classList.add(checkedClass);
            filterItem.classList.remove(uncheckedClass);
        } else {
            removeFilter(groupValue, filterValue);
            filterItem.classList.remove(checkedClass);
            filterItem.classList.add(uncheckedClass);
        }

    }

    if (callback === undefined) { return; }

    callback(event);

}



// old  TODO: remake
async function handleFiltersToggleClick(configJson, eventTarget) {

    let targetComponent = document.getElementById(configJson.filtersContainerCssId);


    if (targetComponent.classList.contains(configJson.filtresContainerCssClassShown)) {
        targetComponent.classList.remove(configJson.filtresContainerCssClassShown);
        eventTarget.innerText = configJson.filtersOpenBtnTxt;
    } else {
        targetComponent.classList.add(configJson.filtresContainerCssClassShown);
        eventTarget.innerText = configJson.filtersCloseBtnTxt;
    }


    if (targetComponent.classList.contains(configJson.filtersContainerCssClass)) {
        targetComponent.classList.remove(configJson.filtersContainerCssClass);
    } else {
        targetComponent.classList.add(configJson.filtersContainerCssClass);
    }

}


// old TODO: remake
async function loadPageFilters(configJson, targetComponentId, filterEventCallback) {



    const targetComponent = document.getElementById(targetComponentId)
    const output = compBuilder.createFilterListElement(configJson);
    targetComponent.appendChild(output);

    let filtersToggleBtn = compBuilder.createFiltersHideShowBtn(configJson);

    targetComponent.appendChild(filtersToggleBtn);

    let filters = output.getElementsByClassName(configJson.filterActionMarkerClass);

    for (let i = 0; i < filters.length; i++) {

        filters[i].addEventListener("click", (e) => { filterEvent(e, filters[i], configJson, filterEventCallback) })
    }

    filtersToggleBtn.addEventListener("click", (e) => { handleFiltersToggleClick(configJson, filtersToggleBtn); })


}



/**
 *  unfinished
 *  TODO:. remove old configJson approach use filtersSetup part of configJson.
 *  TODO:: MAKE UPGRADED COMP BUILDER FUNCTIONS 
 */
async function loadPageFiltersV2(filtersSetup,targetComponentId,filterEventCallback){
    
    const targetComponent = document.getElementById(targetComponentId)
    const output = compBuilder.createFilterListElement(configJson);
    targetComponent.appendChild(output);

    let filtersToggleBtn = compBuilder.createFiltersHideShowBtn(configJson);

    targetComponent.appendChild(filtersToggleBtn);

    let filters = output.getElementsByClassName(configJson.filterActionMarkerClass);

    for (let i = 0; i < filters.length; i++) {

        filters[i].addEventListener("click", (e) => { filterEventV2(e, filters[i], filtersSetup.ui, filterEventCallback) })
    }

    filtersToggleBtn.addEventListener("click", (e) => { handleFiltersToggleClick(configJson, filtersToggleBtn); })



}


export {
    loadPageFilters,
    checkFiltersV2
}
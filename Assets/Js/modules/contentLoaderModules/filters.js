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

function setupFilerObj(filterGroup){
    filterObj[filterGroup]=[];
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


// checkbox container event function abstraction
function filterEvent(e, filterItem, configJson, callback) {

    let checkboxElement = filterItem.querySelector("." + configJson.filterCheckbxClassMarker);
    let groupValueElement = filterItem.querySelector("." + configJson.filterGroupValueClassMarker);

    let filtersSetup=configJson.filtersSetup;
    let FiltersElementsSetup=filtersSetup.FiltersElementsSetup;
    

    let groupValue = groupValueElement.value;
    let filterValue = checkboxElement.value;


    if (e.target !== checkboxElement) {
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

    callback(e);
}



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



export {
    loadPageFilters,
    checkFiltersV2
}
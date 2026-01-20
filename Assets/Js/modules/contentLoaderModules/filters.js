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

   

  
        
        let filterGroups=Object.keys(filterObj);

        // if filters are empty 
        if(filterGroups.length==0){
        
            return true;
        }
    

        
    let isFilterMatch = false;

    let AllFilterGroupsEmpty = true;
  

    // loop filter groups
    filterGroups.forEach((group) => {


       

        // get group filter list
        let filterList = filterObj[group];

        // get metadata filter list for that group
        let adressmapFilterGroup = adressMapFilters[group];


        // continure if not empty
        if (filterList.length > 0) {
            AllFilterGroupsEmpty = false;

            // check if group list even exist in the metadata
            if (adressmapFilterGroup !== undefined) {

                // loop filter selected items
                filterList.forEach(filterItem => {


                    

                    // check for match  single match =correct
                    isFilterMatch = adressmapFilterGroup.includes(filterItem);

                 
                 

                    if(isFilterMatch){
                    return true;
                
                    }


                });


            }

        }

    });

    if (AllFilterGroupsEmpty) {
        return true;
    }


    return isFilterMatch;

         

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

import * as contentLoader from "./contentLoader.js";



let contentTargetID = "contentContainer";

let folderCategoryIndex;

function main(folderCatIndex, sitePosIndex,hasContent) {
    folderCategoryIndex = folderCatIndex;
    let loadMoreBtn = document.getElementById("loadMoreBtn");
    loadMoreBtn.addEventListener("click", loadNewPage);
    contentLoader.loadNavbar("../", sitePosIndex);

    if(hasContent){
    loadFilters();
    load();
}

}

async function loadFilters() {
    await contentLoader.loadPageFilters("../", "filterContainer", reloadContent);

}


function reloadContent() {
    let targetElement = document.getElementById(contentTargetID);
    targetElement.innerHTML = "";
    pagenum = 0;
    load();

}
let pagenum = 0;
let maxNotReached = false;

function loadNewPage() {
    if (!maxNotReached) { return; }
    pagenum++;


    load();
}


async function load() {



    maxNotReached = await contentLoader.loadPageSummaries(pagenum, folderCategoryIndex, contentTargetID, "../");



}

export{
    main
}
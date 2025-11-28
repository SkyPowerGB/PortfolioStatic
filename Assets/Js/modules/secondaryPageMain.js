
import * as contentLoader from "./contentLoader.js";



let contentTargetID = "contentContainer";

let folderCategoryIndex;
let srcRelData="../"
function main(folderCatIndex, sitePosIndex,hasContent,srcRel) {
    folderCategoryIndex = folderCatIndex;
   if(srcRel!=undefined){
    srcRelData=srcRel;
   }
    

    contentLoader.loadNavbar(srcRel, sitePosIndex);

    if(hasContent){
    loadFilters();
    load();
     let loadMoreBtn = document.getElementById("loadMoreBtn");
    loadMoreBtn.addEventListener("click", loadNewPage);
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
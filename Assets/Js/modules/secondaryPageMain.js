
import * as contentLoader from "./contentLoader.js";



let contentTargetID = "contentContainer";

let folderCategory;
let srcRelData="../"
function main(folderCat, sitePosIndex,hasContent,srcRel,pageName) {
  
    console.log("secondary");
    folderCategory= folderCat;
   if(srcRel!=undefined){
    srcRelData=srcRel;
   }
    

    contentLoader.loadNavbar(srcRel, sitePosIndex,pageName);

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
    contentLoader.refreshLoaded();
    load();

}
let pagenum = 0;
let maxNotReached = false;

function loadNewPage() {
          pagenum++;
      contentLoader.loadPaginatedSummaries("../",pagenum,folderCategory,contentTargetID);

}


async function load() {



 //  maxNotReached = await contentLoader.loadPageSummaries(pagenum, folderCategoryIndex, contentTargetID, "../");
    contentLoader.loadPaginatedSummaries("../",pagenum,folderCategory,contentTargetID);



}



export{
    main
}
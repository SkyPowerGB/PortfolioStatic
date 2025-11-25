
import * as contentLoader from "./modules/contentLoader.js";

document.addEventListener("DOMContentLoaded",
main
);


let contentTargetID="contentContainer";


function main(){

loadFilters();

    load();
}

async function loadFilters(){
    await contentLoader.loadPageFilters("../","filterContainer",reloadContent);


}



function reloadContent(){
let   targetElement=document.getElementById(contentTargetID);
targetElement.innerHTML="";
pagenum=0;
load();

}
let pagenum=0;


function loadNewPage(){
    pagenum++;

   load();
}


function load(){
     contentLoader.loadPageSummaries(pagenum,0,contentTargetID,"../");
}
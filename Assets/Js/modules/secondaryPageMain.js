
import * as contentLoader from "./contentLoader.js";



let contentTargetID="contentContainer";


function main(){

   let loadMoreBtn= document.getElementById("loadMoreBtn");
   loadMoreBtn.addEventListener("click",loadNewPage);
   contentLoader.loadNavbar("../",1);
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
let maxNotReached=false;

function loadNewPage(){
    if(!maxNotReached){ return;}
    pagenum++;

   
   load();
}


async function load(){
    let pageFolderCatIndex= await contentLoader.getFolderCatIndex("../");

    if(pageFolderCatIndex==-1||pageFolderCatIndex==null){
        console.log(" Page folder cat index FAILED TO LOAD CONTENT ");
        return ;
    }

   maxNotReached=await contentLoader.loadPageSummaries(pagenum,pageFolderCatIndex,contentTargetID,"../");



}
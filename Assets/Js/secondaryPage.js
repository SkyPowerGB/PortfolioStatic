
import * as contentLoader from "./modules/contentLoader.js";

document.addEventListener("DOMContentLoaded",
main
);

function main(){

loadFilters();

}

async function loadFilters(){
    await contentLoader.loadPageFilters("../","filterContainer");
    

}



function loadContent(){



}


import * as contentLoader from "./modules/contentLoader.js";




document.addEventListener("DOMContentLoaded",
main
);

function main(){
    console.log("script loaded!");

loadLatestNewsB();



}
  
  function loadLatestNewsB(){

      contentLoader.loadXlatestSummariesInto(2,0,"LatestProjectsFeedHolder","",false);

  }





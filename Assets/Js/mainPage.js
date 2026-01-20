import * as contentLoader from "./modules/contentLoader.js";




document.addEventListener("DOMContentLoaded",
main
);



function main(){
    console.log("script loaded!");

loadLatestNewsB();





}
  
  function loadLatestNewsB(){

    contentLoader.loadNavbar("",0,"");
  

      contentLoader.loadXlatestSummariesIntoV2(3,"Blog","LatestUpdatesFeedHolder","");



      contentLoader.loadXlatestSummariesIntoV2(2,"Project","LatestProjectsFeedHolder","");
 
      
  }





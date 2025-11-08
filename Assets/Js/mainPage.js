import * as contentLoader from "./contentLoader.js";




document.addEventListener("DOMContentLoaded",
main
);

function main(){
    console.log("script loaded!");


fetchConfig();



}

async function fetchConfig() {
 
  
  const data=await contentLoader.getConfigJson(true);
if(data==undefined){return;}
  loadLatestNews(data);
  }
  
    
  


function loadLatestNews(data) {
  

   let start=data.projectMaxIndex;
  for(let i=start;i>0;i--){




    

     if(i==(start-=2)){
      break;
     }

     
  }


}
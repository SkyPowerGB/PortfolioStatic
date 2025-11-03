document.addEventListener("DOMContentLoaded",
main
);


function main(){
    console.log("script loaded!");


fetchConfig();



}

async function fetchConfig() {
  try {
  const response = await fetch('/Config/Config.json');
  if(response.ok){
  const data=await response.json();
  console.log(data);
  loadLatestNews(data);
  }
  }catch(e){
    
  }
}


function loadLatestNews(data) {
  

   let start=data.projectMaxIndex;
  for(let i=start;i>0;i--){




    

     if(i==(start-=2)){
      break;
     }
  }


}
import * as contentLoader from "../modules/contentLoader.js"
document.addEventListener("DOMContentLoaded",()=>{
    main();
})

function main(){
 console.log("loaded")
   contentLoader.loadNavbar("../", 1,"About_me");

}
import * as contentLoader from "./modules/contentLoader.js";




document.addEventListener("DOMContentLoaded",
main
);
let introTxt = {

  line0: {
    1: ["> whoami", "intro-cmd", true]
  },
  line1: {
    1: ["bruno ", "intro-res-h1-blue", false],
    2:["--bachelor-cs-eng","intro-res-h2-orange",false]
  },
  line2: {
    1: ["> grep -r 'about_me' ./identity", "intro-cmd", true]
  },
  line3: {
    1: ["Applied knowledge . Focused on building stuff", "intro-res", false]
  },
  line4: {
    1: ["> systemctl status skills", "intro-cmd", true]
  },
  line5: {
    1: ["Logic: 50% | Programming:40% | Electronics: 10%  ", "intro-res", false],
  },
  line6: {
    1: ["> ls ./Content/Project | head -n 2", "intro-cmd", true,loadSummariesProject]
  },
  line7: {
    1: ["loading_cards... [OK]", "intro-res-blue", false]
  },
  line8:{
    1:[">ls ./Content/Blog | head -n 3","intro-cmd",true,loadSummariesBlog]
  },
    line9: {
    1: ["loading_cards... [OK]", "intro-res-blue", false,undefined]
  },

     line10: {
    1: [">_", "intro-cmd", false,undefined],
    2:["","intro-cmd",true,undefined,true]
  },

};



function main(){
 

loadLatestNewsB();





}

async function cmdActive(elementId){

 

  let terminal=document.getElementById(elementId);
  let introKeys=Object.keys(introTxt);

  for(let i=0;i<introKeys.length;i++){
    let line=document.createElement("div");
    line.classList.add("terminal-line");
    terminal.append(line);
    let lineKey=introKeys[i];
    let lineData=introTxt[lineKey];
    await readLineData(lineData,terminal);

    

  }

}

async function readLineData(lineData,terminalEle){

  let lineKeys=Object.keys(lineData);
  for(let i=0;i<lineKeys.length;i++){
    let lineSegKey=lineKeys[i];
    let lineSegment=lineData[lineSegKey];

    let userInput=lineSegment[2]
    let cssClass=lineSegment[1];
    let txt=lineSegment[0];
    let lnFunction=lineSegment[3];
    let empty=lineSegment[4];

    let segment=document.createElement("span");
    segment.classList.add(cssClass);
    terminalEle.append(segment);

    if(userInput){

      await  userWrite(segment,txt,empty);
      if(lnFunction!=undefined){
       await lnFunction();
      }

    } else{
    await  cmdWrite(segment,txt);
    }



  }


}

async function userWrite(targetElement, txt,empty) {
 
    const cursor = document.createElement("span");
    cursor.classList.add("cmd-cursor");
    cursor.innerText = "  ";
    
  
    targetElement.textContent = ""; 
    targetElement.appendChild(cursor); 
    
    // Start typing the text
    for (let char of txt) {
  
        targetElement.removeChild(cursor);
        targetElement.textContent += char;
        targetElement.appendChild(cursor); 
        
        await new Promise(r => setTimeout(r, 40 + Math.random() * 140));
    }

    if(empty==undefined||empty==false){

 cursor.remove(); }
}


async function cmdWrite(targetElement,txt){
  targetElement.textContent = txt;

  await new Promise(r => setTimeout(r, 50+ Math.random() * 40)); 
}


  
  function loadLatestNewsB(){

    contentLoader.loadNavbar("",0,"Home");
    
    cmdActive("cmdTerminal");
  

 
      
  }

  async function loadSummariesProject(){
 await contentLoader.loadXlatestSummariesIntoV2(2,"Project","LatestProjectsFeedHolder","");
  }
  async function loadSummariesBlog(){
  await contentLoader.loadXlatestSummariesIntoV2(3,"Blog","LatestUpdatesFeedHolder","");
  }

  




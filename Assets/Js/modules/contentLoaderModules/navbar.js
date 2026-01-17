import * as compBuilder from "../componentBuilder.js";

async function loadNavbar(configJson, sitePosIndex) {
  
    let targetComponent = document.getElementById(configJson.navbarSetup.navBarDivContElementID);
    let hambComponent = await compBuilder.createNavbarHamb(configJson);

    if (targetComponent != null) {

        targetComponent.append(hambComponent);
        targetComponent.insertBefore(compBuilder.navbarUlBuilder(configJson, sitePosIndex), targetComponent.firstChild);
        hambComponent.addEventListener("click", () => { handleNavHambClick(srcFolderRel); });
    }

}




let hambStateShow = false
async function handleNavHambClick(configJson) {
 
    let navElementsCss = configJson.navbarSetup.navBarLiElementClass;
    let navElements = document.getElementsByClassName(navElementsCss);

    hambStateShow = !hambStateShow;



    for (let i = 1; i < navElements.length; i++) {


        let navItem = navElements[i];

        if (!hambStateShow) {
            navItem.style.display = "none"
        } else {
            navItem.style.display = "flex";
        }




    }


}



export{
    loadNavbar
}



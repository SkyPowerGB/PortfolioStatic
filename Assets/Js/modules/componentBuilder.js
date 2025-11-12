

function createSummaryItem(metadata,configJson,compFolderRelPth) {




    let containerElement = document.createElement("div");
    let linkElement = document.createElement("a");

    let headerElement = document.createElement("h1");
    let thumbnailElement = document.createElement("img");
    let descriptionElement = document.createElement("p");
    let dateElement = document.createElement("h4");


    containerElement.classList.add(configJson.summaryContainerClass);

    linkElement.href=compFolderRelPth;
    headerElement.innerHTML=metadata[configJson.summaryTitle]
    thumbnailElement.src=compFolderRelPth+"/"+metadata[configJson.thumbnail];
    descriptionElement.innerHTML=metadata[configJson.summaryData];
    dateElement.innerHTML=metadata[configJson.publishDateTile];



    linkElement.append(thumbnailElement);
    linkElement.append(headerElement);
    linkElement.append(dateElement);
    linkElement.append(descriptionElement);
    containerElement.appendChild(linkElement);



return containerElement;
}



export  {createSummaryItem}
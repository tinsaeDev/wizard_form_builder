

/**
 * A helper function that handles tab clickes, and switches between active tabs
 * @param {*} event 
 */
function tabClick(event){


    let tabButton = event.target;
    let tabView = tabButton.closest(".tab-view");

    let tabName = tabButton.getAttribute("for");
    let tab = tabView.querySelector(".body .tab#"+tabName);


    let activeTabButton = tabView.querySelector(".header .button.active");
    let activeTab = tabView.querySelector(".body .tab.active");

    activeTabButton.classList.remove("active");
    activeTab.classList.remove("active");


    tab.classList.add("active")
    tabButton.classList.add("active")

    console.log( tab );
}


/**
 * :Begin Custom file chooser related functions
 */

function fileChooserClicked(event){

    let button = event.target;
    let fileInput = button.closest(".file-input");
    fileInput.querySelector(".input").click();
}

function fileChooserChanged(event){
    let input = event.target;
    let fileInput = input.closest(".file-input");
    let fileNameOutput = fileInput.querySelector(".file-name");
    fileNameOutput.innerText = input.files[0].name;
}

/**
 * :End Custom file chooser related functions
 */
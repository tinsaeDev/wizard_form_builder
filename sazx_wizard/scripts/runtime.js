


/** 
 * A files store. a common store to access a file from local or url
 * WIth Change Subscription Support
*/
let files = {

     changeSubscribers : {

     },

    addFile(  fileName ,file ){
       this[fileName]=file;

       if( this.changeSubscribers[fileName]!==undefined ){
           this.changeSubscribers[fileName].forEach( subscriberCallBack=>{
               subscriberCallBack( new Event("changed") );
           } );
       }

    },

    addChangeListener(fileName, callback){
        if( this.changeSubscribers[fileName]===undefined  ){
            this.changeSubscribers[fileName] = [];
        }
       let id = this.changeSubscribers[fileName].push( callback );
       return id;
    }

}

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
    let sazxFileInput = input.closest(".file-input");
    let fileNameOutput = sazxFileInput.querySelector(".file-name");
    fileNameOutput.innerText = input.files[0].name;

    /**
     * Update the files store
     */

    files.addFile( input.name,input.files[0] );
}

/**
 * :End Custom file chooser related functions
 */
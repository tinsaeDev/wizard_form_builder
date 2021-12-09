

/**
 * 
 * Template refferences
 */

let stepTemplate;
let stepProgressIdicatorTemplate;


/**
 * 
 * @param { Object } config The JSON used to construct the wizard
 * @param { String } rootDom  The Id of the div in which the prepared wizard is injected to
 */
let build = function (config, rootDomId) {




    /**
     * The root element to wich the wizard is inserted to
     */
    rootElement = document.querySelector(rootDomId);


    /**
     * Get the template 
     */
     stepTemplate = document.querySelector("#sazx-wiz-step-wrapper-template");
     stepProgressIdicatorTemplate = document.querySelector("#sazx-wiz-step-indicator-wrapper-template");




    /**
     * Save the reffernces of  all the steps parent and  progress indicators parent 
     */

    stepsDOM = rootElement.querySelector(".content .steps");
    progressesDOM = rootElement.querySelector(".nav .list");


    /**
     * Build the steps and the progress indicator
     */

    config.steps.forEach( (step ,index )=> {
 
        stepsDOM.append( buildStep(step,index) );
        progressesDOM.append( buildProgressIndicator(step , index) );



    });





    initWizard();

}


/**
 * Build the step DOM
 * @param {Object} stepConfig 
 * @returns 
 */
function buildStep(stepConfig, index) {


    let step = stepTemplate.content.firstElementChild.cloneNode( true );
    // Build Questions

    

    step.dataset.step_id = index;

    return step ;

}

/**
 * Builds the Progress Indicator DOM
 * @param {*} stepConfig 
 * @returns 
 */
function buildProgressIndicator(stepConfig,index) {
    let progressIndicator  = stepProgressIdicatorTemplate.content.firstElementChild.cloneNode( true );
        progressIndicator.dataset.step_id = index;
    
    let indicatorLabel = progressIndicator.querySelector(".indicator-label");
    indicatorLabel.innerText =  stepConfig.label;
   
    return progressIndicator ;

}



function buildQuestions(){}

// switch (step.type) {


//     case "radio": {
//         buildRadioStep
//         break;
//     }


//     default: {
//         console.warn(step.type, "is not implemented yet");
//     }
// }
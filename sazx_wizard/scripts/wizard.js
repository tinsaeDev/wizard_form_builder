

/**
 * The room element to wich the wizard is attached to
 */

let rootElement;

/**
 * DOM Array of Steps 
 */
let stepsDOM;

/**
 * DOM Array of Step progress indicator
 */
let progressesDOM;


/**
 * The next step button
 */

let nextButton;

/**
 * 
 * The previous button
 */
let prevButton;


/**
 * 
 * The cancel button
 */


let cancelButton;



/**
 * 
 * @param { Object } config The JSON used to construct the wizard
 * @param { String } rootDom  The Id of the div in which the prepared wizard is injected to
 */
let build = function (config, rootDomId) {


    rootElement = document.querySelector(rootDomId);
    console.log(rootElement);

    console.log("Building Wizard");
    initWizard();
}



function initWizard() {


    /**
     * Sve the reffernces of  all the steps and  progress indicators 
     */

    stepsDOM = rootElement.querySelectorAll(".content .steps .step");
    progressesDOM = rootElement.querySelectorAll(".nav .list .item-wrapper");


    /**
     * Save the refferences of step navigation buttons
     */

    nextButton = rootElement.querySelector(".sazx-wizard .button.next");
    prevButton = rootElement.querySelector(".sazx-wizard .button.previous");
    cancelButton = rootElement.querySelector(".sazx-wizard .button.cancel");

    /**
     * Show the first step ,and update the progress indicator 
     * 
     */

    stepsDOM[0].classList.add("current");
    progressesDOM[0].classList.add("current");


    // let firstStep = 

    /**
     * 
     */

}


function navigateStep(direction) {
    /**
        * Hide current step and update the progess 
        */

    let activeStep = Array.from(stepsDOM).find(step => {
        if (step.classList.contains("current")) {
            return true;
        }
    });

    let activeStepProgressIndicator = Array.from(progressesDOM).find(indicator => {
        if (indicator.dataset.step_id === activeStep.dataset.step_id) {
            return true;
        }
    });


    activeStep.classList.remove("current");
    activeStepProgressIndicator.classList.remove("current");


    /**
     * SHow the next step
     */

    let activeStepId = Number.parseInt(activeStep.dataset.step_id);
    let nextStepId = direction==="FORWARD" ? "" + ( activeStepId + 1) : "" + ( activeStepId - 1) ;

    let nextStep = Array.from(stepsDOM).find(step => {
        if (step.dataset.step_id === nextStepId) {
            return true;
        }
    });

    let nextStepIndicator = Array.from(progressesDOM).find(indicator => {

        if (indicator.dataset.step_id === nextStepId) {
            return true;
        }
    });


    nextStep.classList.add("current");
    nextStepIndicator.classList.add("current");


    /**
     * Return the Id of the activated step
     */
    return nextStepId;
}

function nextStep(event) {
    let stepID = navigateStep("FORWARD");
    /**
     * Disable next step button if reached the last step
     */

    if (stepsDOM.length ===  Number.parseInt( stepID ) ) {
        event.target.classList.add("hidden");
    }


    // Show previos step button
    prevButton.classList.remove("hidden");

}

function previousStep(event) {
    let stepID = navigateStep("BACKWARD");
    /**
     * Disable the previous  step button if reached the first step
     */

    if ( 1 ===  Number.parseInt( stepID ) ) {
        event.target.classList.add("hidden");
    }

    // Show  next step button 

    nextButton.classList.remove("hidden");


}

function cancelWizard(event) {
    console.log("Cancelling the wizard process");

}



/**
 * Run this script on the page load
 */
(function () {

    if (document.readyState === "complete") {
        /**
         * If the page has alread loaded, directly call the builder function
         */
        build("", "#wizwiz");
    } else {
        window.addEventListener("load", function (event) {
            build("", "#wizwiz");
        });
    }
})();

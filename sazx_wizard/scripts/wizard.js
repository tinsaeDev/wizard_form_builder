

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


function initWizard() {



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

    stepsDOM.firstElementChild.classList.add("current");
    progressesDOM.firstElementChild.classList.add("current");


    // let firstStep = 

    /**
     * 
     */

}


function navigateStep(direction) {
    /**
        * Hide current step and update the progess 
        */
    let activeStep = stepsDOM.querySelector(".current");
    let activeStepProgressIndicator = progressesDOM.querySelector('[data-step_id^="' + activeStep.dataset.step_id + '"]');

    activeStep.classList.remove("current");
    activeStepProgressIndicator.classList.remove("current");


    /**
     * SHow the next step
     */

    let activeStepId = Number.parseInt(activeStep.dataset.step_id);
    let nextStepId = direction === "FORWARD" ? "" + (activeStepId + 1) : "" + (activeStepId - 1);

    let nextStep = stepsDOM.querySelector('[data-step_id^="' + nextStepId + '"]');
    let nextStepIndicator = progressesDOM.querySelector('[data-step_id^="' + nextStepId + '"]');


    nextStep.classList.add("current");



    /**
     * Updated the completed steps indicator
     */

    let activatedStepIndex = Number.parseInt(nextStepId);
    let indicators = progressesDOM.querySelectorAll(".item-wrapper");

    for (let i = 0; i < activatedStepIndex; i++) {
        indicators[i].classList.add("passed");
    }
    for (let i = activatedStepIndex; i < progressesDOM.childElementCount - 1; i++) {
        indicators[i].classList.remove("passed");
    }
    // set the current indicator
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


    if (stepsDOM.childElementCount - 1 === Number.parseInt(stepID)) {
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

    if (0 === Number.parseInt(stepID)) {
        event.target.classList.add("hidden");
    }

    // Show  next step button 

    nextButton.classList.remove("hidden");


}

function cancelWizard(event) {
    console.log("Cancelling the wizard process");

};
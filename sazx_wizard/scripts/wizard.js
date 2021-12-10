

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
    debugger;

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


const wizardConfig = {
    title: "Here goes the wizard title",
    steps: [


        {
            label: "Result Table",
            questions: [
                {

                    type: "result",
                    description: "Ephrem Tamiru - Negresh Nebere",
                    data : {
                        head : [
                            "column 1",
                            "column 2",
                            "column 3",
                            "column 4",
                        ],
                        body : [
                            [
                                "Cell 1",
                                "Cell 2",
                                "Cell 3",
                                "Cell 4",

                            ],
                            [
                                "Cell 1",
                                "Cell 2",
                                "Cell 3",
                                "Cell 4",

                            ],
                            [
                                "Cell 1",
                                "Cell 2",
                                "Cell 3",
                                "Cell 4",

                            ],
                            
                        ]
                    }
                

                }
            ]
        },

        {
            label: "File / URL Inputs",
            questions: [
                {
                    type: "file",
                    name: "file1",
                    description: "Getachew Reda's interview"                  

                },

                {
                    type: "file",
                    name: "file2",
                    description: "TDF convoys along A-2 highway"                  

                }
            ]


        },


        {
            label: "Collumn Mapper",
            questions: [
                {

                    type: "column_mapper",
                    name: "mapper1",
                    description: "Ephrem Tamiru - Negresh Nebere",
                    file : "file1",
                    columns: [
                        
                        "Column One",
                        "Column Two",
                        "Column Thre",
                        "Column FOur",
                      
                    ],
                

                }
            ]
        },

        {
            label: "Radio Button Inputs",
            questions: [
                {
                    type: "radio",
                    name: "model",
                    description: "Mockup web site - wizard?",
                    options: [
                        {
                            value: "f",
                            title: "Frequency",
                        },

                        {
                            value: "s",
                            title: "Severity",
                        },

                        {
                            value: "d",
                            title: "Demand",
                        }
                    ]

                },

                {
                    type: "radio",
                    name: "model3",
                    description: "Mockup web site - wizard?",
                    options: [
                        {
                            value: "f",
                            title: "Frequency",
                        },

                        {
                            value: "s",
                            title: "Severity",
                        },

                        {
                            value: "d",
                            title: "Demand",
                        }
                    ]

                }
            ]


        },
        {
            label: "Free Text Inputs",
            questions: [


                {
                    type: "text",
                    name: "model2",
                    description: "No transactions meet your selected criteria?",
                    inputs: [
                        {
                            name: "f",
                            label: "Frequency",
                        },

                        {
                            name: "s",
                            label: "Severity",
                        },

                        {
                            name: "d",
                            label: "Demand",
                        }
                    ]
                }
            ]


        }


    ]
}


console.log("HI");

/**
 * Run this script on the page load
 */
(function () {

    if (document.readyState === "complete") {
        /**
         * If the page has alread loaded, directly call the builder function
         */
        build(wizardConfig, "#wizwiz");
    } else {
        window.addEventListener("load", function (event) {
            build(wizardConfig, "#wizwiz");
        });
    }
})();

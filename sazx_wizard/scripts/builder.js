

/**
 * 
 * Template refferences
 */

let stepProgressIdicatorTemplate;

let stepTemplate;
/**
 * Question templates
 */
let radioButtomFormTemplate;
let freeTextFormTemplate;
let fileUrlFormTemplate;


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
     * Get the template  for 
     */
    stepTemplate = document.querySelector("#sazx-wiz-step-wrapper-template");
    stepProgressIdicatorTemplate = document.querySelector("#sazx-wiz-step-indicator-wrapper-template");


    radioButtomFormTemplate = document.querySelector("#sazx_wizard_template_radio_button");
    freeTextFormTemplate = document.querySelector("#sazx_wizard_template_free_text");
    fileUrlFormTemplate = document.querySelector("#sazx_wizard_template_file_url");
    /**
     * Save the reffernces of  all the steps parent and  progress indicators parent 
     */

    stepsDOM = rootElement.querySelector(".content .steps");
    progressesDOM = rootElement.querySelector(".nav .list");


    /**
     * Build the steps and the progress indicator
     */

    config.steps.forEach((step, index) => {

        stepsDOM.append(buildStep(step, index));
        progressesDOM.append(buildProgressIndicator(step, index));



    });





    initWizard();

}


/**
 * Build the step DOM
 * @param {Object} stepConfig 
 * @returns 
 */
function buildStep(stepConfig, index) {


    let step = stepTemplate.content.firstElementChild.cloneNode(true);

    step.dataset.step_id = index;

    // Build Questions

    stepConfig.questions.forEach(question => {

        switch (question.type) {
            case "radio": {
                step.append(buildRadioQuestion(question));
                break;
            }

            case "text": {
                step.append(buildFreeTextQuestion(question));
                break;
            }

            case "file" :{
                step.append( buildFileUrlQuestion( question ) );
                break;
            }
            default: {
                console.error(question.type, " is not a supported question type");
            }
        }

    });




    return step;

}

/**
 * Builds the Progress Indicator DOM
 * @param {*} stepConfig 
 * @returns 
 */
function buildProgressIndicator(stepConfig, index) {
    let progressIndicator = stepProgressIdicatorTemplate.content.firstElementChild.cloneNode(true);
    progressIndicator.dataset.step_id = index;

    let indicatorLabel = progressIndicator.querySelector(".indicator-label");
    indicatorLabel.innerText = stepConfig.label;

    return progressIndicator;

}

/**
 * Question Builders
 */

// Radio Button Builder
function buildRadioQuestion(questionConfig) {

    let questionDOM = radioButtomFormTemplate.content.firstElementChild.cloneNode(true);

    /**
     * Set the question description/title
     */
    let title = questionDOM.querySelector(".title");
    title.innerText = questionConfig.description;


    let radioFields = questionDOM.querySelector(".fields");
    let radioGroup = radioFields.querySelector(".radio-group");
    let radioButtonTemplate = radioGroup.querySelector(".radio-button-template");

    /**
     * Build the custom buttons
     */
    questionConfig.options.forEach(option => {

        let sazxRadioButton = radioButtonTemplate.content.firstElementChild.cloneNode(true);
        let label = sazxRadioButton.querySelector(".label");
        let input = sazxRadioButton.querySelector(".input");

        input.setAttribute("name", questionConfig.name);
        input.setAttribute("id", `sazx-${questionConfig.name}-${option.value}`);
        input.setAttribute("value", option.value);

        label.setAttribute("for", `sazx-${questionConfig.name}-${option.value}`)
        label.innerText = option.title;

        radioGroup.append(sazxRadioButton);
    });


    return questionDOM;

}

// Free text input builder
function buildFreeTextQuestion(questionConfig) {

    let questionDOM = freeTextFormTemplate.content.firstElementChild.cloneNode(true);

    let title = questionDOM.querySelector(".title");
    title.innerText = questionConfig.description;


    let fields = questionDOM.querySelector(".fields");
    let sazxFreeInputs = fields.querySelector(".text-inputs");
    let sazxFreeInputTemplate = sazxFreeInputs.querySelector(".text-input-template");

    questionConfig.inputs.forEach(input => {
        let sazxFreeInput = sazxFreeInputTemplate.content.firstElementChild.cloneNode(true);
        let textLabel = sazxFreeInput.querySelector(".label");
        textLabel.setAttribute("for", `sazx-${questionConfig.name}-${input.name}`);
        textLabel.innerText = input.label;

        let textInput = sazxFreeInput.querySelector(".input");
        textInput.setAttribute("name", input.name);
        textInput.setAttribute("id", `sazx-${questionConfig.name}-${input.name}`);


        sazxFreeInputs.append(sazxFreeInput);

    });



    // let input = questionDOM.querySelector("");
    // input.setAttribute("name", questionConfig.name);
    // // questionDOM


    return questionDOM;
}

// file upload/url builder

function buildFileUrlQuestion(questionConfig) {
    let questionDOM = fileUrlFormTemplate.content.firstElementChild.cloneNode(true);
    
    let title= questionDOM.querySelector(".title");
        title.innerText = questionConfig.description;

    let fileInput =   questionDOM.querySelector(".file-input .input");
        fileInput.setAttribute( "name" , questionConfig.name); 
        
        /**
         * FIle Url not implemented yet
         */
    
    
    return questionDOM;

}
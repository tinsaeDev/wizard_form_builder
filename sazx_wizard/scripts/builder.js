

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
let columnMapperFormTemplate;
let resultTableFormTemplate;

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
    columnMapperFormTemplate = document.querySelector("#sazx_wizard_template_column-mapper");
    resultTableFormTemplate = document.querySelector("#sazx_wizard_template_result_table");

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

            case "file": {
                step.append(buildFileUrlQuestion(question));
                break;
            }

            case "column_mapper": {
                step.append(buildColumnMapperQuestion(question));
                break;
            }

            case "result" : {
                step.append(buildResultsTableQuestion(question));
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
        label.innerText = option.label;

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

    let title = questionDOM.querySelector(".title");
    title.innerText = questionConfig.description;

    let fileInput = questionDOM.querySelector(".file-input .input");
    fileInput.setAttribute("name", questionConfig.name);

    /**
     * FIle Url not implemented yet
     */


    return questionDOM;

}


// Column mapper builder

function buildColumnMapperQuestion(questionConfig) {

    let questionDOM = columnMapperFormTemplate.content.firstElementChild.cloneNode(true);
    let title = questionDOM.querySelector(".title");
    title.innerText = questionConfig.description;


    // Build the table rows
    let tableBody = questionDOM.querySelector("table tbody");
    let bodyRowTemplate = questionDOM.querySelector("table tbody .tr-template");
    let bodyRowFileColumnSelectTemplate = questionDOM.querySelector("table tbody .select-template");
    let bodyRowFileColumnOptionTemplate = questionDOM.querySelector("table tbody .select-option-template");
    questionConfig.columns.forEach( (column, rowIndex) => {

        let bodyRow = bodyRowTemplate.content.firstElementChild.cloneNode(true);


        // fileColumnArray , shall be read from file
        let fileColumnArray = [
            "File Column 1",
            "File Column 2",
            "File Column 3",
            "File Column 4",
        ];



        let fileColumn = bodyRow.querySelector(".file-column");
        let select = bodyRowFileColumnSelectTemplate.content.firstElementChild.cloneNode(true);
        select.setAttribute("name", rowIndex );

        fileColumnArray.forEach( (column,optionIndex) =>{

            let option = bodyRowFileColumnOptionTemplate.content.firstElementChild.cloneNode(true);
                option.setAttribute("value", optionIndex );
                option.innerText = column;

                select.append( option );


        } );

        fileColumn.append( select );





        let mapToColumn = bodyRow.querySelector(".map-to");
        mapToColumn.querySelector(".label").innerText = column;
        
        tableBody.append( bodyRow );
    })





    return questionDOM;
}


// Result table builder
function buildResultsTableQuestion( questionConfig ){
    let questionDOM = resultTableFormTemplate.content.firstElementChild.cloneNode(true);

    let title = questionDOM.querySelector(".title");
        title.innerText = questionConfig.description;

        let tableHeadRow = questionDOM.querySelector("table thead tr");
        let tableHeadRowCellTemplate = tableHeadRow.querySelector(".template-head-tr-th");

        // Create table header cells from data
        questionConfig.data.head.forEach( column=>{
            let cell = tableHeadRowCellTemplate.content.firstElementChild.cloneNode(true);
            cell.innerText = column;

            tableHeadRow.append( cell );
        } );

        // Create table rows from data
        let tableBody = questionDOM.querySelector("table tbody");
        let tableBodyRowTemplate = tableBody.querySelector(".template-body-tr");
        questionConfig.data.body.forEach( row=>{
            let tableBodyRow = tableBodyRowTemplate.content.firstElementChild.cloneNode( true );
            let tableBodyCellTemplate = tableBodyRow.querySelector(".template-body-tr-td");

            row.forEach( column=>{
                let tableBodyCell = tableBodyCellTemplate.content.firstElementChild.cloneNode( true );
                tableBodyCell.innerText = column;

                tableBodyRow.append( tableBodyCell );

            } );

        tableBody.append( tableBodyRow );
        } );

    return questionDOM;
} 



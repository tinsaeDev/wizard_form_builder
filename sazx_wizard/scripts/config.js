

const formConfig = {
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


console.log("");
/**
 * Run this script on the page load
 */
 (function () {

    if (document.readyState === "complete") {
        /**
         * If the page has alread loaded, directly call the builder function
         */
        build(formConfig, "#wizwiz");
    } else {
        window.addEventListener("load", function (event) {
            build(formConfig, "#wizwiz");
        });
    }
})();
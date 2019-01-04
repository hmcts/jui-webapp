// module.exports = {
//     idPrefix: 'create',
//     name: 'create',
//     header: 'Make a decision',
//     formGroupValidators: [],
//     validationHeaderErrorMessages: [
//         {
//             validationLevel: 'formControl',
//             controlId: 'makeDecision',
//             text: 'Select yes if you want to make a decision',
//             href: '#'
//         }
//     ],
//     groups: [
//         {
//             fieldset: [
//                 {
//                     legend: {
//                         text: 'Are you satisfied that petitioner is entitled to a decree of divorce on the ground that the marriage has broken down irretrievably?',
//                         isPageHeading: true,
//                         classes: 'govuk-fieldset__legend--m'
//                     }
//                 },
//                 {
//                     radios: {
//                         control: 'makeDecision',
//                         classes: 'govuk-radios--inline',
//                         validators: ['required'],
//                         validationError: {
//                             value: 'Please select one of the option',
//                             controlId: 'makeDecision'
//                         },
//                         radioGroup: [
//                             {
//                                 value: 'yes',
//                                 text: 'Yes',
//                                 hiddenAccessibilityText: 'some hidden text'
//                             },
//                             {
//                                 value: 'no',
//                                 text: 'No',
//                                 hiddenAccessibilityText: 'some hidden text'
//                             }
//                         ]
//                     }
//                 }
//             ]
//         },
//         {
//             button: {
//                 control: 'createButton',
//                 value: 'Continue',
//                 type: 'submit',
//                 classes: '',
//                 onEvent: 'continue'
//             },
//         },
//     ],
// }

module.exports = {
    idPrefix: 'costs-order',
    name: 'costs-order',
    header: 'What type of costs order is needed?',
    formGroupValidators: [],
    validationHeaderErrorMessages: [
        {
            validationLevel: 'formControl',
            controlId: 'costOrder',
            text: 'Please choose an order',
            href: '#'
        }
    ],
    groups: [
        {
            fieldset: [
                {
                    radios: {
                        control: 'costOrder',
                        classes: '',
                        validators: ['required'],
                        validationError: {
                            value: 'Please select one of the option',
                            controlId: 'costOrder'
                        },
                        radioGroup: [
                            {
                                value: 'orderCosts',
                                text: 'An order that respondent will pay the petitioner’s costs',
                                hiddenAccessibilityText: 'An order that respondent will pay the petitioner’s costs',
                                groups: [
                                    {
                                        radios: {
                                            control: 'orderCosts',
                                            radioGroup: [
                                                {
                                                    value: 'agreedTo',
                                                    text: 'Agreed to',
                                                    hiddenAccessibilityText: 'Agreed to',
                                                    groups: [
                                                        {
                                                            input: {
                                                                label: {
                                                                    text: 'In pounds',
                                                                    classes: ''
                                                                },
                                                                control: 'agreedInPounds',
                                                                classes: 'govuk-input--width-10 govuk-!-margin-bottom-6'
                                                            }
                                                        },
                                                        {
                                                            input: {
                                                                label: {
                                                                    text: 'Or as a percentage',
                                                                    classes: ''
                                                                },
                                                                control: 'agreedPercentage',
                                                                classes: 'govuk-input--width-10'
                                                            }
                                                        }
                                                    ]
                                                },
                                                {
                                                    value: 'limitedTo',
                                                    text: 'Limited to',
                                                    hiddenAccessibilityText: 'Limited to',
                                                    groups: [
                                                        {
                                                            input: {
                                                                label: {
                                                                    text: 'In pounds',
                                                                    classes: ''
                                                                },
                                                                control: 'limitedInPounds',
                                                                classes: 'govuk-input--width-10 govuk-!-margin-bottom-6'
                                                            }
                                                        },
                                                        {
                                                            input: {
                                                                label: {
                                                                    text: 'Or as a percentage',
                                                                    classes: ''
                                                                },
                                                                control: 'limitedPercentage',
                                                                classes: 'govuk-input--width-10'
                                                            }
                                                        }
                                                    ]
                                                },
                                                {
                                                    value: 'ifNotAgreed',
                                                    text: 'To be subject to detailed assessment if not agreed',
                                                    hiddenAccessibilityText: 'To be subject to detailed assessment if not agreed'
                                                }
                                            ]
                                        }
                                    }
                                ]
                            },
                            {
                                value: 'other',
                                text: 'Other',
                                hiddenAccessibilityText: 'Other',
                                groups: [
                                    {
                                        textarea: {
                                            label: {
                                                text: 'Details',
                                                classes:''
                                            },
                                            validationError: {
                                                value: 'Please enter details',
                                                controlId: 'details'
                                            },
                                            control: 'details',
                                            value: '',
                                            validators: ['required']
                                        }
                                    },
                                ]
                            },
                            {
                                devider: 'or'
                            },
                            {
                                value: 'noOrder',
                                text: 'No order for costs',
                                hiddenAccessibilityText: 'No order for costs'
                            }
                        ]
                    }
                }
            ]
        },
        {
            button: {
                control: 'createButton',
                value: 'Continue',
                type: 'submit',
                classes: '',
                onEvent: 'continue'
            }
        }
    ]
}

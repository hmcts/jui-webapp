module.exports = {
    idPrefix: 'costs-order',
    name: 'costs-order',
    header: 'What type of costs order is needed?',
    formGroupValidators: [],
    validationHeaderErrorMessages: [
    ],
    groups: [
        {
            fieldset: [
                {
                    radios: {
                        control: 'costOrder',
                        classes: '',
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
                                            control: 'details',
                                            value: ''
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

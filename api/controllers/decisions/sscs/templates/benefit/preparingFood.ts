module.exports = {
    idPrefix: 'PreparingFood',
    name: 'preparing-food',
    header: 'Preparing food',
    caption: {
        classes: 'govuk-caption-xl',
        text: 'Daily living'
    },
    formGroupValidators: [],
    validationHeaderErrorMessages: [
        {
            validationLevel: 'formControl',
            controlId: 'dailyLivingPreparingFood',
            text: 'Select at least one activity',
            href: '#'
        }
    ],
    groups: [
        {
            fieldset: [
                {
                    legend: {
                        text: 'Select your new score',
                        isPageHeading: true,
                        classes: 'govuk-fieldset__legend--m'
                    }
                },
                {
                    radios: {
                        control: 'dailyLivingPreparingFood',
                        validators: ['required'],
                        validationError: {
                            value: 'Select at least one activity',
                            controlId: 'dailyLivingPreparingFood'
                        },
                        radioGroup: [
                            {
                                value: '0',
                                text: 'Can prepare and cook a simple meal unaided',
                                hint: {
                                    text: '0 points',
                                    classes: 'govuk-hint govuk-radios__hint'
                                }
                            },
                            {
                                value: '2.0',
                                text: 'Needs to use an aid or appliance to be able to either prepare or cook a simple meal',
                                hint: {
                                    text: '2 points',
                                    classes: 'govuk-hint govuk-radios__hint'
                                }
                            },
                            {
                                value: '2.1',
                                text: 'Cannot cook a simple meal using a conventional cooker but is able to do so using a microwave',
                                hint: {
                                    text: '2 points',
                                    classes: 'govuk-hint govuk-radios__hint'
                                }
                            },
                            {
                                value: '2.2',
                                text: 'Needs prompting to be able to either prepare or cook a simple meal',
                                hint: {
                                    text: '2 points',
                                    classes: 'govuk-hint govuk-radios__hint'
                                }
                            },
                            {
                                value: '4',
                                text: 'Needs supervision or assistance to either prepare or cook a simple meal',
                                hint: {
                                    text: '4 points',
                                    classes: 'govuk-hint govuk-radios__hint'
                                }
                            },
                            {
                                value: '8',
                                text: 'Cannot prepare and cook food',
                                hint: {
                                    text: '8 points',
                                    classes: 'govuk-hint govuk-radios__hint'
                                }
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

module.exports = {
    idPrefix: 'TakingNutrition',
    name: 'taking-nutrition',
    header: 'Taking nutrition',
    caption: {
        classes: 'govuk-caption-xl',
        text: 'Daily living'
    },
    formGroupValidators: [],
    validationHeaderErrorMessages: [
        {
            validationLevel: 'formControl',
            controlId: 'dailyLivingTakingNutrition',
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
                        control: 'dailyLivingTakingNutrition',
                        validators: ['required'],
                        validationError: {
                            value: 'Select at least one activity',
                            controlId: 'dailyLivingTakingNutrition'
                        },
                        radioGroup: [
                            {
                                value: '0',
                                text: 'Can take nutrition unaided',
                                hint: {
                                    text: '0 points',
                                    classes: 'govuk-hint govuk-radios__hint'
                                }
                            },
                            {
                                value: '2.0',
                                text: 'Needs either:',
                                hint: {
                                    text: '2 points',
                                    classes: 'govuk-hint govuk-radios__hint'
                                },
                                list: {
                                    classes: 'govuk-list--bullet govuk-!-margin-bottom-0',
                                    text: [
                                        'to use an aid or appliance to be able to take nutrition',
                                        'supervision to be able to take nutrition',
                                        'assistance to be able to cut up food'
                                    ]
                                }
                            },
                            {
                                value: '2.1',
                                text: 'Needs a therapeutic source to be able to take nutrition',
                                hint: {
                                    text: '2 points',
                                    classes: 'govuk-hint govuk-radios__hint'
                                }
                            },
                            {
                                value: '4',
                                text: 'Needs prompting to be able to take nutrition',
                                hint: {
                                    text: '4 points',
                                    classes: 'govuk-hint govuk-radios__hint'
                                }
                            },
                            {
                                value: '6',
                                text: 'Needs assistance to be able to manage a therapeutic source to take nutrition',
                                hint: {
                                    text: '6 points',
                                    classes: 'govuk-hint govuk-radios__hint'
                                }
                            },
                            {
                                value: '8',
                                text: 'Cannot convey food and drink to their mouth and needs another person to do so',
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

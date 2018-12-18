module.exports = {
    idPrefix: 'DressingUndressing',
    name: 'dressing-undressing',
    header: 'Dressing and undressing',
    caption: {
        classes: 'govuk-caption-xl',
        text: 'Daily living'
    },
    formGroupValidators: [],
    validationHeaderErrorMessages: [
        {
            validationLevel: 'formControl',
            controlId: 'dailyLivingDressingUndressing',
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
                        control: 'dailyLivingDressingUndressing',
                        validationError: {
                            value: 'Select at least one activity',
                            controlId: 'dailyLivingDressingUndressing'
                        },
                        radioGroup: [
                            {
                                value: '0',
                                text: 'Can dress and undress unaided',
                                hint: {
                                    text: '0 points',
                                    classes: 'govuk-hint govuk-radios__hint'
                                }
                            },
                            {
                                value: '2.0',
                                text: 'Needs to use an aid or appliance to be able to dress or undress',
                                hint: {
                                    text: '2 point',
                                    classes: 'govuk-hint govuk-radios__hint'
                                }
                            },
                            {
                                value: '2.1',
                                text: 'Needs either:',
                                hint: {
                                    text: '2 points',
                                    classes: 'govuk-hint govuk-radios__hint'
                                },
                                list: {
                                    classes: 'govuk-list--bullet govuk-!-margin-bottom-0',
                                    text: [
                                        'prompting to be able to dress, undress or determine appropriate circumstances for remaining clothed',
                                        'prompting or assistance to be able to select appropriate clothing'
                                    ]
                                }
                            },
                            {
                                value: '2.2',
                                text: 'Needs assistance to be able to dress or undress their lower body',
                                hint: {
                                    text: '2 points',
                                    classes: 'govuk-hint govuk-radios__hint'
                                }
                            },
                            {
                                value: '4',
                                text: 'Needs assistance to be able to dress or undress their upper body',
                                hint: {
                                    text: '4 points',
                                    classes: 'govuk-hint govuk-radios__hint'
                                }
                            },
                            {
                                value: '8',
                                text: 'Cannot dress or undress at all',
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

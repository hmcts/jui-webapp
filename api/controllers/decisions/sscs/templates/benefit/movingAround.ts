module.exports = {
    idPrefix: 'MovingAround',
    name: 'moving-around',
    header: 'Moving around',
    caption: {
        classes: 'govuk-caption-xl',
        text: 'Mobility'
    },
    formGroupValidators: [],
    validationHeaderErrorMessages: [
        {
            validationLevel: 'formControl',
            controlId: 'MobilityMovingAround',
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
                        control: 'MobilityMovingAround',
                        validators: ['required'],
                        validationError: {
                            value: 'Select at least one activity',
                            controlId: 'MobilityMovingAround'
                        },
                        radioGroup: [
                            {
                                value: '0',
                                text: 'Can stand and then move more than 200 metres, either aided or unaided',
                                hint: {
                                    text: '0 points',
                                    classes: 'govuk-hint govuk-radios__hint'
                                }
                            },
                            {
                                value: '4',
                                text: 'Can stand and then move more than 50 metres but no more than 200 metres, either aided or unaided',
                                hint: {
                                    text: '4 point',
                                    classes: 'govuk-hint govuk-radios__hint'
                                }
                            },
                            {
                                value: '8',
                                text: 'Can stand and then move unaided more than 20 metres but no more than 50 metres',
                                hint: {
                                    text: '8 points',
                                    classes: 'govuk-hint govuk-radios__hint'
                                }
                            },
                            {
                                value: '10',
                                text: 'Can stand and then move using an aid or appliance more than 20 metres but no more than 50 metres',
                                hint: {
                                    text: '10 points',
                                    classes: 'govuk-hint govuk-radios__hint'
                                }
                            },
                            {
                                value: '12.0',
                                text: 'Can stand and then move more than 1 metre but no more than 20 metres, either aided or unaided',
                                hint: {
                                    text: '12 points',
                                    classes: 'govuk-hint govuk-radios__hint'
                                }
                            },
                            {
                                value: '12.1',
                                text: 'Cannot, either aided or unaided:',
                                hint: {
                                    text: '12 points',
                                    classes: 'govuk-hint govuk-radios__hint'
                                },
                                list: {
                                    classes: 'govuk-list--bullet govuk-!-margin-bottom-0',
                                    text: [
                                        'stand',
                                        'move more than 1 metre'
                                    ]
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

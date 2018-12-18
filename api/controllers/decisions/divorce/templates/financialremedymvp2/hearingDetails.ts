module.exports={
        idPrefix: 'hearing-details',
        name: 'hearing-details',
        header: 'Hearing details',
        formGroupValidators: [],
        validationHeaderErrorMessages: [
            {
                validationLevel: 'formControl',
                controlId: 'estimateLengthOfHearing',
                text: 'Enter the length of hearing in minutes, for example "20"',
                href: '#'
            },
            {
                validationLevel: 'formControl',
                controlId: 'whenHearingPlaced',
                text: 'Enter when you’d like the hearing to take place',
                href: '#'
            },
            {
                validationLevel: 'formControl',
                controlId: 'whichCourt',
                text: 'Choose a court',
                href: '#'
            }
        ],
        groups: [
            {
                input: {
                    label: {
                        text: 'Estimate length of hearing in minutes',
                        classes: 'govuk-label--m'
                    },
                    validators: ['required'],
                    validationError: {
                        value: 'Enter the length of hearing in minutes, for example "20"',
                        controlId: 'estimateLengthOfHearing'
                    },
                    control: 'estimateLengthOfHearing',
                    classes: 'govuk-input--width-3'
                }
            },
            {
                input: {
                    label: {
                        text: 'When should the hearing take place?',
                        classes: 'govuk-label--m'
                    },
                    hint: {
                        text: 'For example, ‘fix hearing for first available date’',
                        classes: 'govuk-hint'
                    },
                    control: 'whenHearingPlaced',
                    validators: ['required'],
                    validationError: {
                        value: 'Enter when you’d like the hearing to take place',
                        controlId: 'whenHearingPlaced'
                    },
                    classes: ''
                }
            },
            {
                fieldset: [
                    {
                        legend: {
                            text: 'Which court?',
                            isPageHeading: true,
                            classes: 'govuk-fieldset__legend--m'
                        }
                    },
                    {
                        radios: {
                            control: 'whichCourt',
                            validators: ['required'],
                            validationError: {
                                value: 'Choose a court',
                                controlId: 'whichCourt'
                            },
                            radioGroup: [
                                {
                                    value: 'southWest',
                                    text: 'South West Divorce Centre',
                                    hint: {
                                      text: 'Southampton',
                                      classes: 'govuk-hint govuk-radios__hint'
                                    }
                                },
                                {
                                    value: 'eastMidlands',
                                    text: 'East Midlands Divorce Centre',
                                    hint: {
                                      text: 'Nottingham',
                                      classes: 'govuk-hint govuk-radios__hint'
                                    }
                                },
                                {
                                    value: 'westMidlands',
                                    text: 'West Midlands Divorce Centre',
                                    hint: {
                                      text: 'Stoke',
                                      classes: 'govuk-hint govuk-radios__hint'
                                    }
                                },
                                {
                                    value: 'northWest',
                                    text: 'North West Divorce Centre',
                                    hint: {
                                      text: 'Liverpool',
                                      classes: 'govuk-hint govuk-radios__hint'
                                    }
                                }
                            ]
                        }
                    }
                ]
            },
            {
                textarea: {
                    label: 'Any other hearing details (optional)',
                    hint: {
                        text: 'For example, if you need to hear the case. Or if you need to transfer either the financial remedy or entire divorce case to another court.'
                    },
                    control: 'otherHearingDetails',
                    value: ''
                }
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
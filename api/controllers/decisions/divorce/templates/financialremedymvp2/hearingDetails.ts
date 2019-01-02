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
                        textarea: {
                            label: {
                                text: 'Which court?',
                                classes: 'govuk-label--m'
                            },
                            validationError: {
                                value: 'Enter the directions that are required',
                                controlId: 'Directions'
                            },
                            control: 'whichCourt',
                            validators: ['required'],
                            value: ''
                        }
                    }
                ]
            },
            {
                textarea: {
                    label: {
                        text: 'Any other hearing details (optional)',
                        classes: 'govuk-label--m'
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

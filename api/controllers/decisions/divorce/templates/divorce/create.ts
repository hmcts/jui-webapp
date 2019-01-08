module.exports = {
    idPrefix: 'create',
    name: 'create',
    header: 'Make a decision',
    formGroupValidators: [],
    validationHeaderErrorMessages: [
        {
            validationLevel: 'formControl',
            controlId: 'makeDecision',
            text: 'Select yes if you want to make a decision',
            href: '#'
        }
    ],
    groups: [
        {
            fieldset: [
                {
                    legend: {
                        text: 'Are you satisfied that petitioner is entitled to a decree of divorce on the ground that the marriage has broken down irretrievably?',
                        isPageHeading: true,
                        classes: 'govuk-fieldset__legend--m'
                    }
                },
                {
                    radios: {
                        control: 'makeDecision',
                        classes: 'govuk-radios--inline',
                        validators: ['required'],
                        validationError: {
                            value: 'Please select one of the option',
                            controlId: 'makeDecision'
                        },
                        radioGroup: [
                            {
                                value: 'yes',
                                text: 'Yes',
                                hiddenAccessibilityText: 'some hidden text'
                            },
                            {
                                value: 'no',
                                text: 'No',
                                hiddenAccessibilityText: 'some hidden text'
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
            },
        },
    ],
}

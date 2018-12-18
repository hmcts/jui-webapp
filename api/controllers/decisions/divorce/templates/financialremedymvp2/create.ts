module.exports = {
    idPrefix: 'create',
    name: 'create',
    header: 'Do you want to approve the draft consent order?',
    formGroupValidators: [],
    validationHeaderErrorMessages: [
        {
            validationLevel: 'formControl',
            controlId: 'approveDraftConsent',
            text: 'Select yes if you want to approve the draft consent order',
            href: '#'
        }
    ],
    groups: [
        {
            fieldset: [
                {
                    radios: {
                        control: 'approveDraftConsent',
                        classes: 'govuk-radios--inline',
                        validators: ['required'],
                        validationError: {
                            value: 'Select yes if you want to approve the draft consent order',
                            controlId: 'preliminaryView'
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

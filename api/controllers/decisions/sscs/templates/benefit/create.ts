module.exports = {
    idPrefix: 'create',
    name: 'create',
    header: 'What do you want to send to the parties?',
    formGroupValidators: [],
    validationHeaderErrorMessages: [
        {
            validationLevel: 'formControl',
            controlId: 'preliminaryView',
            text: 'Select if you want to send a preliminary view or a final decision',
            href: '#'
        }
    ],
    groups: [
        {
            fieldset: [
                {
                    radios: {
                        control: 'preliminaryView',
                        validators: ['required'],
                        validationError: {
                            value: 'Select if you want to send a preliminary view or a final decision',
                            controlId: 'preliminaryView'
                        },
                        radioGroup: [
                            {
                                value: 'yes',
                                text: 'Preliminary view',
                                hiddenAccessibilityText: 'some hidden text'
                            },
                            {
                                value: 'no',
                                text: 'Final decision',
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
            }
        }
    ]
}

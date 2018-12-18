module.exports = {
    idPrefix: 'check',
    header: 'Check your decision',
    name: 'check-final-decision',
    formGroupValidators: [],
    validationHeaderErrorMessages: [],
    groups: [
        {
            page: 'create',
            contents: [
                {
                    title: 'What do you want to send to the parties?',
                    details: [
                        {
                            control: 'preliminaryView',
                            type: 'radio',
                            no: 'Final decision',
                            yes: 'Preliminary view'
                        }
                    ],
                    link: {
                        text: 'Change',
                        event: 'create',
                        hiddenAccessibilityText: 'decision'
                    }
                }
            ]
        },
        {
            page: 'notes-for-court-administrator',
            contents: [
                {
                    title: 'Decision notes',
                    details: [
                        {
                            control: 'decisionNotes',
                            type: 'textarea'
                        }
                    ],
                    link: {
                        text: 'Change',
                        event: 'final-decision',
                        hiddenAccessibilityText: 'notes'
                    }
                }
            ]
        }
    ],
    buttons: [
        {
            control: 'createButton',
            value: 'Submit',
            onEvent: 'submit'
        }
    ]
}


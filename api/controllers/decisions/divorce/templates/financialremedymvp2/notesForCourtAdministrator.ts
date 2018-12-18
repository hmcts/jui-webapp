module.exports = {
        formGroupValidators: [],
        header: 'Notes for court administrator (optional)',
        hint: 'This won’t be seen by the parties.',
        groups: [
            {
                textarea: {
                    label: 'Notes for court administrator',
                    control: 'notesForAdmin',
                    value: ''
                }
            },
            {
                button: {
                    control: 'createButton',
                    value: 'Continue',
                    type: 'submit',
                    classes: '',
                    onEvent: 'continue',
                },
            },
        ],
        idPrefix: 'notes-for-court-administrator',
        name: 'notes-for-court-administrator',
        validationHeaderErrorMessages: [],
}

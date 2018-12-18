module.exports = {
    idPrefix: 'CommunicatingVerbally',
    name: 'communicating-verbally',
    header: 'Communicating verbally',
    caption: {
        classes: 'govuk-caption-xl',
        text: 'Daily living'
    },
    formGroupValidators: [],
    validationHeaderErrorMessages: [
        {
            validationLevel: 'formControl',
            controlId: 'dailyLivingCommunicatingVerbally',
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
                        control: 'dailyLivingCommunicatingVerbally',
                        validators: ['required'],
                        validationError: {
                            value: 'Select at least one activity',
                            controlId: 'dailyLivingCommunicatingVerbally'
                        },
                        radioGroup: [
                            {
                                value: '0',
                                text: 'Can express and understand verbal information unaided',
                                hint: {
                                    text: '0 points',
                                    classes: 'govuk-hint govuk-radios__hint'
                                }
                            },
                            {
                                value: '2',
                                text: 'Needs to use an aid or appliance to be able to speak or hear',
                                hint: {
                                    text: '2 point',
                                    classes: 'govuk-hint govuk-radios__hint'
                                }
                            },
                            {
                                value: '4',
                                text: 'Needs communication support to be able to express or understand complex verbal information',
                                hint: {
                                    text: '4 points',
                                    classes: 'govuk-hint govuk-radios__hint'
                                }
                            },
                            {
                                value: '8',
                                text: 'Needs communication support to be able to express or understand basic verbal information',
                                hint: {
                                    text: '8 points',
                                    classes: 'govuk-hint govuk-radios__hint'
                                }
                            },
                            {
                                value: '12',
                                text: 'Cannot express or understand verbal information at all even with communication support',
                                hint: {
                                    text: '12 points',
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

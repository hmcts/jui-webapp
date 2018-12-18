module.exports = {
    idPrefix: 'EngangingPeople',
    name: 'engaging-face',
    header: 'Engaging with other people face to face',
    caption: {
        classes: 'govuk-caption-xl',
        text: 'Daily living'
    },
    formGroupValidators: [],
    validationHeaderErrorMessages: [
        {
            validationLevel: 'formControl',
            controlId: 'dailyLivingEngangingPeople',
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
                        control: 'dailyLivingEngangingPeople',
                        validators: ['required'],
                        validationError: {
                            value: 'Select at least one activity',
                            controlId: 'dailyLivingEngangingPeople'
                        },
                        radioGroup: [
                            {
                                value: '0',
                                text: 'Can engage with other people unaided',
                                hint: {
                                    text: '0 points',
                                    classes: 'govuk-hint govuk-radios__hint'
                                }
                            },
                            {
                                value: '2',
                                text: 'Needs prompting to be able to engage with other people',
                                hint: {
                                    text: '2 point',
                                    classes: 'govuk-hint govuk-radios__hint'
                                }
                            },
                            {
                                value: '4',
                                text: 'Needs social support to be able to engage with other people',
                                hint: {
                                    text: '4 points',
                                    classes: 'govuk-hint govuk-radios__hint'
                                }
                            },
                            {
                                value: '8',
                                text: 'Cannot engage with other people due to such engagement causing either:',
                                list: {
                                    classes: 'govuk-list--bullet govuk-!-margin-bottom-0',
                                    text: [
                                        'overwhelming psychological distress to the claimant',
                                        'the claimant to exhibit behaviour which would result in a substantial risk of harm to the claimant or another person'
                                    ]
                                },
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

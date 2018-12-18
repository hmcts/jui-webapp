module.exports = {
    idPrefix: 'ManagingTherapy',
    name: 'managing-therapy',
    header: 'Managing therapy or monitoring a health condition',
    caption: {
        classes: 'govuk-caption-xl',
        text: 'Daily living'
    },
    formGroupValidators: [],
    validationHeaderErrorMessages: [
        {
            validationLevel: 'formControl',
            controlId: 'dailyLivingManagingTherapy',
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
                        control: 'dailyLivingManagingTherapy',
                        validators: ['required'],
                        validationError: {
                            value: 'Select at least one activity',
                            controlId: 'dailyLivingManagingTherapy'
                        },
                        radioGroup: [
                            {
                                value: '0',
                                text: 'Either:',
                                hint: {
                                    text: '0 points',
                                    classes: 'govuk-hint govuk-radios__hint'
                                },
                                list: {
                                    classes: 'govuk-list--bullet govuk-!-margin-bottom-0',
                                    text: [
                                        'does not receive medication or therapy or need to monitor a health condition',
                                        'or can manage medication or therapy or monitor a health condition unaided'
                                    ]
                                }
                            },
                            {
                                value: '1',
                                text: 'Needs either:',
                                hint: {
                                    text: '1 point',
                                    classes: 'govuk-hint govuk-radios__hint'
                                },
                                list: {
                                    classes: 'govuk-list--bullet govuk-!-margin-bottom-0',
                                    text: [
                                        'to use an aid or appliance to be able to manage medication',
                                        'supervision, prompting or assistance to be able to manage medication or monitor a health condition',
                                        'supervision, prompting or assistance to be able to monitor a health condition'
                                    ]
                                }
                            },
                            {
                                value: '2',
                                text: 'Needs supervision, prompting or assistance to be able to manage therapy that takes no more than 3.5 hours a week',
                                hint: {
                                    text: '2 points',
                                    classes: 'govuk-hint govuk-radios__hint'
                                }
                            },
                            {
                                value: '4',
                                text: 'Needs supervision, prompting or assistance to be able to manage therapy that takes more than 3.5 but no more than 7 hours a week',
                                hint: {
                                    text: '4 points',
                                    classes: 'govuk-hint govuk-radios__hint'
                                }
                            },
                            {
                                value: '6',
                                text: 'Needs supervision, prompting or assistance to be able to manage therapy that takes more than 7 but no more than 14 hours a week',
                                hint: {
                                    text: '6 points',
                                    classes: 'govuk-hint govuk-radios__hint'
                                }
                            },
                            {
                                value: '8',
                                text: 'Needs supervision, prompting or assistance to be able to manage therapy that takes more than 14 hours a week',
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

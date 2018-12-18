module.exports = {
    idPrefix: 'scores',
    name: 'scores',
    header: 'Which activities were relevant for the tribunal?',
    formGroupValidators: [
        {
            validatorFunc: 'isAnyCheckboxChecked',
            validationErrorId: 'selectActivities',
            checkboxes: [
                'preparingFood',
                'takingNutrition',
                'managingTherapy',
                'washingBathing',
                'managingToilet',
                'dressingUndressing',
                'communicatingVerbally',
                'readingAndUnderstanding',
                'engagingWithOtherPeople',
                'makingBudgetingDecisions',
                'planningFollowingJourneys',
                'movingAround'
            ]
        }
    ],
    validationHeaderErrorMessages: [
        {
            validationLevel: 'formGroup',
            formGroupValidationErrorId: 'selectActivities',
            text: 'Select reasons the consent order was not approved',
            href: '#'
        }
    ],
    groups: [
        {
            fieldset: [
                {
                    legend: {
                        text: 'Daily living',
                        isPageHeading: true,
                        classes: 'govuk-fieldset__legend--m'
                    }
                },
                {
                    hint: {
                        text: 'Select all that apply.',
                        classes: 'govuk-hint'
                    }
                },
                {
                    validationError: {
                        value: 'Select reasons the consent order was not approved',
                        identifier: 'selectActivities'
                    }
                },
                {
                    checkbox: {
                        control: 'preparingFood',
                        value: false,
                        text: 'Preparing food'
                    }
                },
                {
                    checkbox: {
                        control: 'takingNutrition',
                        value: false,
                        text: 'Taking nutrition'
                    }
                },
                {
                    checkbox: {
                        control: 'managingTherapy',
                        value: false,
                        text: 'Managing therapy or monitoring a health condition'
                    }
                },
                {
                    checkbox: {
                        control: 'washingBathing',
                        value: false,
                        text: 'Washing and bathing'
                    }
                },
                {
                    checkbox: {
                        control: 'managingToilet',
                        value: false,
                        text: 'Managing toilet needs or incontinence'
                    }
                },
                {
                    checkbox: {
                        control: 'dressingUndressing',
                        value: false,
                        text: 'Dressing and undressing'
                    }
                },
                {
                    checkbox: {
                        control: 'communicatingVerbally',
                        value: false,
                        text: 'Communicating verbally'
                    }
                },
                {
                    checkbox: {
                        control: 'readingAndUnderstanding',
                        value: false,
                        text: 'Reading and understanding signs, symbols and words'
                    }
                },
                {
                    checkbox: {
                        control: 'engagingWithOtherPeople',
                        value: false,
                        text: 'Engaging with other people face to face'
                    }
                },
                {
                    checkbox: {
                        control: 'makingBudgetingDecisions',
                        value: false,
                        text: 'Making budgeting decisions'
                    }
                }
            ]
        },
        {
            fieldset: [
                {
                    legend: {
                        text: 'Mobility',
                        isPageHeading: true,
                        classes: 'govuk-fieldset__legend--m'
                    }
                },
                {
                    hint: {
                        text: 'Select all that apply.',
                        classes: 'govuk-hint'
                    }
                },
                {
                    checkbox: {
                        control: 'planningFollowingJourneys',
                        value: false,
                        text: 'Planning and following journeys'
                    }
                },
                {
                    checkbox: {
                        control: 'movingAround',
                        value: false,
                        text: 'Moving around'
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

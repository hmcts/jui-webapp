module.exports = {
    idPrefix: 'PlanningJourneys',
    name: 'planning-journeys',
    header: 'Planning and following journeys',
    caption: {
        classes: 'govuk-caption-xl',
        text: 'Mobility'
    },
    formGroupValidators: [],
    validationHeaderErrorMessages: [
        {
            validationLevel: 'formControl',
            controlId: 'MobilityPlanningJourneys',
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
                        control: 'MobilityPlanningJourneys',
                        validators: ['required'],
                        validationError: {
                            value: 'Select at least one activity',
                            controlId: 'MobilityPlanningJourneys'
                        },
                        radioGroup: [
                            {
                                value: '0',
                                text: 'Can plan and follow the route of a journey unaided',
                                hint: {
                                    text: '0 points',
                                    classes: 'govuk-hint govuk-radios__hint'
                                }
                            },
                            {
                                value: '4',
                                text: 'Needs prompting to be able to undertake any journey to avoid overwhelming psychological distress to the claimant',
                                hint: {
                                    text: '4 point',
                                    classes: 'govuk-hint govuk-radios__hint'
                                }
                            },
                            {
                                value: '8',
                                text: 'For reasons other than psychological distress, cannot plan the route of a journey',
                                hint: {
                                    text: '8 points',
                                    classes: 'govuk-hint govuk-radios__hint'
                                }
                            },
                            {
                                value: '10.0',
                                text: 'For reasons other than psychological distress, cannot follow the route of an unfamiliar journey without another person, assistance dog or orientation aid',
                                hint: {
                                    text: '10 points',
                                    classes: 'govuk-hint govuk-radios__hint'
                                }
                            },
                            {
                                value: '10.1',
                                text: 'Cannot undertake any journey because it would cause overwhelming psychological distress to the claimant',
                                hint: {
                                    text: '10 points',
                                    classes: 'govuk-hint govuk-radios__hint'
                                }
                            },
                            {
                                value: '12',
                                text: 'For reasons other than psychological distress, cannot follow the route of a familiar journey without another person, an assistance dog or an orientation aid',
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

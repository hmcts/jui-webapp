module.exports = {
    idPrefix: 'set-award-dates',
    name: 'set-award-dates',
    header: 'Set award dates',
    formGroupValidators: [
        {
            validatorFunc: 'isAllFieldsRequired',
            validationErrorId: 'startDate',
            checkboxes: [
                'awardStartDateDay', 'awardStartDateMonth', 'awardStartDateYear'
            ]
        },
        {
            validatorFunc: 'isAllFieldsRequired',
            validationErrorId: 'endDate',
            checkboxes: [
                'awardEndDateDay', 'awardEndDateMonth', 'awardEndDateYear'
            ]
        }
    ],
    validationHeaderErrorMessages: [
        {
            validationLevel: 'formGroup',
            formGroupValidationErrorId: 'startDate',
            text: 'Select start date',
            href: '#'
        },
        {
            validationLevel: 'formGroup',
            formGroupValidationErrorId: 'endDate',
            text: 'Select the end date',
            href: '#'
        },
        {
            validationLevel: 'formControl',
            controlId: 'endDateRadio',
            text: 'Select the end date',
            href: '#'
        }
    ],
    groups: [
        {
            legend: {
                text: 'Start date',
                isPageHeading: true,
                classes: 'govuk-fieldset__legend--m'
            }
        },
        {
            hint: {
                text: 'For example, 12 4 2018',
                classes: 'govuk-hint'
            }
        },
        {
            date: {
                validationError: {
                    value: 'Select start date',
                    identifier: 'startDate'
                },
                formName: 'startDate',
                day: {
                    input: {
                        label: {
                            text: 'Day',
                            classes: 'govuk-date-input__label'
                        },
                        control: 'awardStartDateDay',
                        classes: 'govuk-date-input__input govuk-input--width-2',
                        validators: ['required']
                    }
                },
                month: {
                    input: {
                        label: {
                            text: 'Month',
                            classes: 'govuk-date-input__label'
                        },
                        control: 'awardStartDateMonth',
                        classes: 'govuk-date-input__input govuk-input--width-2',
                        validators: ['required']
                    }
                },
                year: {
                    input: {
                        label: {
                            text: 'Year',
                            classes: 'govuk-date-input__label'
                        },
                        control: 'awardStartDateYear',
                        classes: 'govuk-date-input__input govuk-input--width-4',
                        validators: ['required']
                    }
                }
            }
        },
        {
            fieldset: [
                {
                    radios: {
                        control: 'endDateRadio',
                        validationError: {
                            value: 'Select the end date',
                            controlId: 'endDateRadio'
                        },
                        validators: ['required'],
                        radioGroup: [
                            {
                                value: 'endDate',
                                text: 'Set end date',
                                hiddenAccessibilityText: 'some hidden text',
                                groups: [
                                    {
                                        legend: {
                                            text: 'End date',
                                            isPageHeading: true,
                                            classes: 'govuk-fieldset__legend--m'
                                        }
                                    },
                                    {
                                        hint: {
                                            text: 'For example, 12 4 2019',
                                            classes: 'govuk-hint'
                                        }
                                    },
                                    {
                                        date: {
                                            formName: 'endDate',
                                            validationError: {
                                                value: 'Select the end date',
                                                identifier: 'endDate'
                                            },
                                            day: {
                                                input: {
                                                    label: {
                                                        text: 'Day',
                                                        classes: 'govuk-date-input__label'
                                                    },
                                                    control: 'awardEndDateDay',
                                                    classes: 'govuk-date-input__input govuk-input--width-2',
                                                    validators: ['required']
                                                }
                                            },
                                            month: {
                                                input: {
                                                    label: {
                                                        text: 'Month',
                                                        classes: 'govuk-date-input__label'
                                                    },
                                                    control: 'awardEndDateMonth',
                                                    classes: 'govuk-date-input__input govuk-input--width-2',
                                                    validators: ['required']
                                                }
                                            },
                                            year: {
                                                input: {
                                                    label: {
                                                        text: 'Year',
                                                        classes: 'govuk-date-input__label'
                                                    },
                                                    control: 'awardEndDateYear',
                                                    classes: 'govuk-date-input__input govuk-input--width-4',
                                                    validators: ['required']
                                                }
                                            }
                                        }
                                    }
                                ]
                            },
                            {
                                value: 'indefinite',
                                text: 'Indefinite award',
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

module.exports = {
    idPrefix: 'set-award-dates',
    name: 'set-award-dates',
    header: 'Set award dates',
    formGroupValidators: [
        {
            validatorFunc: 'isRadioValidWhenSomeOptionSelected',
            validationErrorId: 'endDateRadio',
            controls: {
                radioControl: 'endDateRadio',
                selectedOptions: [
                    {
                        selectedOption: 'endDate',
                        childValidator: {
                            validatorFunc: 'isAllFieldsRequired',
                            validationErrorId: 'awardEndDate',
                            controls: [
                                'awardEndDateDay', 'awardEndDateMonth', 'awardEndDateYear'
                            ]
                        }
                    }
                ]
            }
        },
        {
            validatorFunc: 'isAllFieldsRequired',
            validationErrorId: 'startDate',
            controls: [
                'awardStartDateDay', 'awardStartDateMonth', 'awardStartDateYear'
            ]
        },
        {
            validatorFunc: 'isValidDate',
            validationErrorId: 'startDateValid',
            controls: [
                'awardStartDateYear', 'awardStartDateMonth', 'awardStartDateDay' // accepts only format YYYY, mm, dd
            ]
        }
    ],
    validationHeaderErrorMessages: [
        {
            validationLevel: 'formGroup',
            formGroupValidationErrorId: 'startDate',
            text: 'Enter start date',
            href: '#'
        },
        {
            validationLevel: 'formGroup',
            formGroupValidationErrorId: 'startDateValid',
            text: 'Start date must be valid',
            href: '#'
        },
        {
            validationLevel: 'formGroup',
            formGroupValidationErrorId: 'awardEndDate',
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
            validationError: {
                value: 'Enter start date',
                identifier: 'startDate'
            }
        },
        {
            validationError: {
                value: 'Start date must be valid',
                identifier: 'startDateValid'
            }
        },
        {
            date: {
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
            legend: {
                text: 'What do you want to do about the end date?',
                isPageHeading: true,
                classes: 'govuk-fieldset__legend--m'
            }
        },
        {
            fieldset: [
                {
                    validationError: [
                        {
                            value: 'Set end date',
                            identifier: 'awardEndDate'
                        }
                    ]
                },
                {
                    radios: {
                        control: 'endDateRadio',
                        radioGroup: [
                            {
                                value: 'endDate',
                                text: 'Set end date',
                                hiddenAccessibilityText: 'some hidden text',
                                groups: [
                                    {
                                        validationError: {
                                            value: 'Enter end date',
                                            identifier: 'endDate'
                                        }
                                    },
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
                                            formName: 'awardEndDate',
                                            day: {
                                                input: {
                                                    label: {
                                                        text: 'Day',
                                                        classes: 'govuk-date-input__label'
                                                    },
                                                    control: 'awardEndDateDay',
                                                    classes: 'govuk-date-input__input govuk-input--width-2',
                                                }
                                            },
                                            month: {
                                                input: {
                                                    label: {
                                                        text: 'Month',
                                                        classes: 'govuk-date-input__label'
                                                    },
                                                    control: 'awardEndDateMonth',
                                                    classes: 'govuk-date-input__input govuk-input--width-2'
                                                }
                                            },
                                            year: {
                                                input: {
                                                    label: {
                                                        text: 'Year',
                                                        classes: 'govuk-date-input__label'
                                                    },
                                                    control: 'awardEndDateYear',
                                                    classes: 'govuk-date-input__input govuk-input--width-4'
                                                }
                                            }
                                        }
                                    }
                                ]
                            },
                            {
                                value: 'indefinite',
                                text: 'Indefinite award',
                                hiddenAccessibilityText: 'some hidden text',
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

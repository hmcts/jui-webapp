//
// The data below is a stub of ui Controls data
// Data structure
// Judistdiction =>> page_id ==> pagedata
// api URL http://localhost:3000/api/decisions/state/fr/1536577824150765/create
//

module.exports = {
    fr: {
        create: {
            idPrefix: 'create',
            name: 'create',
            header: 'Do you want to approve the draft consent order?',
            groups: [
                {
                    fieldset: {
                        radios: {
                            control: 'approveDraftConsent',
                            radioGroup: [
                                {
                                    value: 'yes',
                                    text: 'Yes'
                                },
                                {
                                    value: 'no',
                                    text: 'No'
                                }
                            ]
                        }
                    }
                }
            ],
            buttons: [
                {
                    control: 'createButton',
                    value: 'Continue',
                    onEvent: 'continue'
                }
            ]
        },
        'reject-reasons':  {
            idPrefix: 'reject-reasons',
            name: 'reject-reasons',
            header: 'What should appear in the directions order?',
            groups: [
                {
                    fieldset: {
                        legend: {
                            text: 'Reasons the consent order was not approved',
                            isPageHeading: true,
                            classes: 'govuk-fieldset__legend--xl'
                        },
                        hint: { text: 'Select all that apply.' },
                        checkboxes: [
                            {
                                control: 'partiesNeedAttend',
                                value: false,
                                text: 'The parties need to attend a hearing'
                            },
                            {
                                control: 'NotEnoughInformation',
                                value: false,
                                text: 'Not enough information was supplied to decide if the order is fair',
                                sub: {
                                    legend: 'Information required',
                                    checkboxes: [
                                        {
                                            control: 'capitalPositions',
                                            value: true,
                                            text: 'The parties’ capital positions if the order were to take effect'
                                        },
                                        {
                                            control: 'partiesHousingNeeds',
                                            value: false,
                                            text: 'The parties’ housing needs and whether they are met by the order'
                                        },
                                        {
                                            control: 'justificationDeparture',
                                            value: false,
                                            text: 'The justification for departure from equality of capital'
                                        },
                                        {
                                            control: 'partiesPensionProvision',
                                            value: false,
                                            text: 'The parties’ pension provision if the order were to take effect'
                                        },
                                        {
                                            control: 'childrensHousingNeeds',
                                            value: false,
                                            text: 'The children’s housing needs and whether they are met by the order'
                                        },
                                        {
                                            control: 'netEffectOrder',
                                            value: false,
                                            text: 'The net effect of the order'
                                        },
                                        {
                                            control: 'Other2',
                                            value: false,
                                            text: 'Other',
                                            sub: {
                                                legend: 'What information is needed?',
                                                textareas: [
                                                    {
                                                        control: 'informationNeeded',
                                                        value: 'Infrmation text'
                                                    }
                                                ]
                                            }
                                        }
                                    ]
                                }
                            },
                            {
                                control: 'd81',
                                value: false,
                                text: 'The D81 form is incomplete'
                            },
                            {
                                control: 'pensionAnnex',
                                value: false,
                                text: 'The pension annex was not attached'
                            },
                            {
                                control: 'applicantTakenAdvice',
                                value: false,
                                text: 'It’s not clear if the applicant has taken independent legal advice'
                            },
                            {
                                control: 'respondentTakenAdvice',
                                value: false,
                                text: 'It’s not clear if the respondent has taken independent legal advice'
                            },
                            {
                                control: 'Other2',
                                value: false,
                                text: 'Other',
                                sub: {
                                    legend: 'Reason',
                                    textareas: [
                                        {
                                            control: 'Reason',
                                            value: 'Reason text'
                                        }
                                    ]
                                }
                            }
                        ]
                    }
                },
                {
                    textarea: {
                        label: 'Directions',
                        control: 'Directions',
                        value: 'Direction text'
                    }
                },
                {
                    fieldset: {
                        legend: {
                            text: 'Do you want to include an annotated version of the draft consent order?',
                            isPageHeading: false,
                            classes: 'govuk-fieldset__legend--m'
                        },
                        hint: { text: 'You can use this to illustrate any detailed points or feedback for the parties.' },
                        radios: {
                            control: 'includeAnnotatedVersionDraftConsOrder',
                            radioGroup: [
                                {
                                    value: 'yes',
                                    text: 'Yes',
                                    hiddenAccessibilityText: ', send an annotated version of the draft consent order to the parties'
                                },
                                {
                                    value: 'no',
                                    text: 'No',
                                    hiddenAccessibilityText: ', I don’t want to send an annotated version of the draft consent order to the parties'
                                }
                            ]
                        }
                    }
                }
            ],
            buttons: [
                {
                    control: 'createButton',
                    value: 'Continue',
                    onEvent: 'continue'
                }
            ]
        },
        'notes-for-court-administrator': {
            idPrefix: 'notes-for-court-administrator',
            name: 'notes-for-court-administrator',
            header: 'Notes for court administrator (optional)',
            hint: 'This won’t be seen by the parties.',
            textarea: {
                label: 'Notes for court administrator',
                control: 'notesForAdmin',
                value: 'Notes for court administrator text'
            },
            button: {
                control: 'createButton',
                value: 'Continue',
                onEvent: 'continue'
            }
        },
        check: {
            idPrefix: 'check',
            name: 'check'
        },
        'decision-confirmation': {
            idPrefix: 'decision-confirmation',
            name: 'decision-confirmation',
            buttons: [
                {
                    control: 'createButton',
                    value: 'Continue',
                    onEvent: 'continue'
                }
            ]
        },
        'draft-consent-order': {
            idPrefix: 'draft-consent-order',
            name: 'draft-consent-order',
            header: 'Add or change comments',
            buttons: [
                {
                    control: 'createButton',
                    value: 'Continue',
                    onEvent: 'continue'
                }
            ]
        },
        'hearing-details': {
            idPrefix: 'hearing-details',
            name: 'hearing-details',
            header: 'Hearing details',
            groups: [
                {
                    inputs: [
                        {
                            label: {
                                text: 'Estimate length of hearing in minutes',
                                classes: 'govuk-label--m'
                            },
                            control: 'estimateLengthOfHearing',
                            classes: 'govuk-input--width-3'
                        }
                    ]
                },
                {
                    inputs: [
                        {
                            label: {
                                text: 'When should the hearing take place?',
                                classes: 'govuk-label--m'
                            },
                            hint: { text: 'For example, ‘fix hearing for first available date’' },
                            control: 'whenHearingPlaced'
                        }
                    ]
                },
                {
                    fieldset: {
                        legend: {
                            text: 'Which court?',
                            isPageHeading: true,
                            classes: 'govuk-fieldset__legend--m'
                        },
                        radios: {
                            control: 'whichCourt',
                            radioGroup: [
                                {
                                    value: 'southWest',
                                    text: 'South West Divorce Centre',
                                    hint: { text: 'Southampton' }
                                },
                                {
                                    value: 'eastMidlands',
                                    text: 'East Midlands Divorce Centre',
                                    hint: { text: 'Nottingham' }
                                },
                                {
                                    value: 'westMidlands',
                                    text: 'West Midlands Divorce Centre',
                                    hint: { text: 'Stoke' }
                                },
                                {
                                    value: 'northWest',
                                    text: 'North West Divorce Centre',
                                    hint: { text: 'Liverpool' }
                                }
                            ]
                        }
                    }
                },
                {
                    textarea: {
                        label: 'Any other hearing details (optional)',
                        hint: { text: 'For example, if you need to hear the case. Or if you need to transfer either the financial remedy or entire divorce case to another court.' },
                        control: 'otherHearingDetails',
                        value: 'Other hearing details text'
                    }
                }
            ],
            buttons: [
                {
                    control: 'createButton',
                    value: 'Continue',
                    onEvent: 'continue'
                }
            ]
        }
    }
};

module.exports = {
        idPrefix: 'check',
        header: 'Check your decision',
        name: 'check',
        formGroupValidators: [],
        validationHeaderErrorMessages: [],
        groups: [
            {
                header: 'Draft consent order',
                page: 'create',
                contents: [
                    {
                        title: 'Decision',
                        titleYes: 'Decision',
                        details: [
                            {
                                control: 'approveDraftConsent',
                                type: 'radio',
                                no: 'Consent order not approved',
                                yes: 'Consent order approved'
                            }
                        ],
                        link: {
                            text: 'Change',
                            event: 'create',
                            hiddenAccessibilityText: 'reasons'
                        }
                    }
                ]
            },
            {
                header: 'Notes for court administrator',
                page: 'notes-for-court-administrator',
                contents: [
                    {
                        title: 'Notes',
                        titleYes: 'Notes for court administrator',
                        details: [
                            {
                                control: 'notesForAdmin',
                                type: 'textarea'
                            }
                        ],
                        link: {
                            text: 'Change',
                            event: 'notes-for-court-administrator',
                            hiddenAccessibilityText: 'notes'
                        }
                    }
                ]
            },
            {
                header: 'Directions order',
                page: 'reject-reasons',
                contents: [
                    {
                        title: 'Reasons',
                        details: [
                            {
                                control: 'partiesNeedAttend',
                                type: 'checkbox',
                                true: 'The parties need to attend a hearing'
                            },
                            {
                                type: 'checkbox',
                                control: 'NotEnoughInformation',
                                true: 'Not enough information was supplied to decide if the order is fair:'
                            },
                            {
                                ul: {
                                    classes: 'govuk-list--bullet',
                                    li: [
                                        {
                                            type: 'checkbox',
                                            control: 'capitalPositions',
                                            true: 'The parties’ capital positions if the order were to take effect'
                                        },
                                        {
                                            type: 'checkbox',
                                            control: 'partiesHousingNeeds',
                                            true: 'The parties’ housing needs and whether they are met by the order'
                                        },
                                        {
                                            type: 'checkbox',
                                            control: 'justificationDeparture',
                                            true: 'The justification for departure from equality of capital'
                                        },
                                        {
                                            type: 'checkbox',
                                            control: 'partiesPensionProvision',
                                            true: 'The parties’ pension provision if the order were to take effect'
                                        },
                                        {
                                            type: 'checkbox',
                                            control: 'childrensHousingNeeds',
                                            true: 'The children’s housing needs and whether they are met by the order'
                                        },
                                        {
                                            type: 'checkbox',
                                            control: 'netEffectOrder',
                                            true: 'The net effect of the order'
                                        },
                                        {
                                            type: 'checkbox',
                                            control: 'Other'
                                        },
                                        {
                                            control: 'informationNeeded',
                                            type: 'textarea'
                                        }
                                    ]
                                }
                            },
                            {
                                type: 'checkbox',
                                control: 'orderNotAppearOfS25ca1973',
                                true: 'The order doesn’t appear fair taking account of S25 Matrimonial Causes Act 1973'
                            },
                            {
                                type: 'checkbox',
                                control: 'd81',
                                true: 'The D81 form is incomplete'
                            },
                            {
                                type: 'checkbox',
                                control: 'pensionAnnex',
                                true: 'The pension annex was not attached'
                            },
                            {
                                type: 'checkbox',
                                control: 'applicantTakenAdvice',
                                true: 'It’s not clear if the applicant has taken independent legal advice'
                            },
                            {
                                control: 'Reason',
                                type: 'textarea'
                            }
                        ],
                        link: {
                            text: 'Change',
                            event: 'reject-reasons',
                            hiddenAccessibilityText: 'reasons'
                        }
                    },
                    {
                        title: 'Directions',
                        details: [
                            {
                                control: 'Directions',
                                type: 'textarea'
                            }
                        ],
                        link: {
                            text: 'Change',
                            event: 'reject-reasons',
                            hiddenAccessibilityText: 'reasons'
                        }
                    },
                    {
                        title: 'Include an annotated version of the draft consent order?',
                        details: [
                            {
                                control: 'includeAnnotatedVersionDraftConsOrder',
                                type: 'radio',
                                no: 'No',
                                yes: 'Yes'
                            }
                        ],
                        link: {
                            text: 'Change',
                            event: 'reject-reasons',
                            hiddenAccessibilityText: 'reasons'
                        }
                    }
                ]
            },
            {
                header: 'Comments on draft consent order',
                page: 'draft-consent-order',
                contents: [
                    {
                        title: 'Comments',
                        details: [
                            {
                                type: 'comment'
                            }
                        ],
                        link: {
                            text: 'Change',
                            event: 'draft-consent-order',
                            hiddenAccessibilityText: 'draft-consent-order'
                        }
                    }
                ]
            },
            {
                header: 'Hearing details',
                page: 'hearing-details',
                contents: [
                    {
                        title: 'Estimate length of hearing in minutes',
                        details: [
                            {
                                control: 'estimateLengthOfHearing',
                                type: 'input'
                            }
                        ],
                        link: {
                            text: 'Change',
                            event: 'hearing-details',
                            hiddenAccessibilityText: 'reasons'
                        }
                    },
                    {
                        title: 'When should the hearing take place?',
                        details: [
                            {
                                control: 'whenHearingPlaced',
                                type: 'input'
                            }
                        ],
                        link: {
                            text: 'Change',
                            event: 'hearing-details',
                            hiddenAccessibilityText: 'reasons'
                        }
                    },
                    {
                        title: 'Which court?',
                        details: [
                            {
                                control: 'whichCourt',
                                type: 'input'
                            }
                        ],
                        link: {
                            text: 'Change',
                            event: 'hearing-details',
                            hiddenAccessibilityText: 'reasons'
                        }
                    },
                    {
                        title: 'Any other hearing details (optional)',
                        details: [
                            {
                                control: 'otherHearingDetails',
                                type: 'input'
                            }
                        ],
                        link: {
                            text: 'Change',
                            event: 'hearing-details',
                            hiddenAccessibilityText: 'reasons'
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


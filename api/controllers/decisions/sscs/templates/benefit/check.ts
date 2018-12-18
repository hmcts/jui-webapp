module.exports = {
    idPrefix: 'check',
    header: 'Explain the tribunal’s view',
    name: 'check',
    formGroupValidators: [],
    validationHeaderErrorMessages: [
        {
            validationLevel: 'formControl',
            controlId: 'reasonsTribunalView',
            text: 'Enter the Reasons for the tribunal’s view',
            href: '#'
        }
    ],
    groups: [
        {
            inset: {
                text: 'This will be sent to both the appellant and DWP.'
            }
        },
        {
            heading: {
                text: 'Activities and descriptors you consider relevant to the appeal',
                classes: 'govuk-heading-l'
            }
        },
        {
            table:{
                classes: 'govuk-!-margin-bottom-8 jui-table',
                caption: {
                    text:'Daily living',
                    classes:'govuk-heading-m'
                },
                headers: [
                    'Activity',
                    'Descriptor',
                    'Points',
                    ' '
                ],
                activities: [
                    {
                        type: 'preparingFood',
                        selector: 'dailyLivingPreparingFood',
                        name: 'Preparing food',
                        link: 'preparing-food',
                        hiddenAccessibilityText: ' new score for daily living: preparing food',
                        scores: [
                            {
                                selector: '0',
                                text: 'Can prepare and cook a simple meal unaided',
                                score: 0
                            },
                            {
                                selector: '2.0',
                                text: 'Needs to use an aid or appliance to be able to either prepare or cook a simple meal',
                                score: 2
                            },
                            {
                                selector: '2.1',
                                text: 'Cannot cook a simple meal using a conventional cooker but is able to do so using a microwave',
                                score: 2
                            },
                            {
                                selector: '2.2',
                                text: 'Needs prompting to be able to either prepare or cook a simple meal',
                                score: 2
                            },
                            {
                                selector: '4',
                                text: 'Needs supervision or assistance to either prepare or cook a simple meal',
                                score: 4
                            },
                            {
                                selector: '8',
                                text: 'Cannot prepare and cook food',
                                score: 8
                            }
                        ]
                    },
                    {
                        type: 'takingNutrition',
                        selector: 'dailyLivingTakingNutrition',
                        name: 'Taking nutrition',
                        link: 'taking-nutrition',
                        hiddenAccessibilityText: ' new score for daily living: taking nutrition',
                        scores: [
                            {
                                selector: '0',
                                text: 'Can take nutrition unaided',
                                score: 0
                            },
                            {
                                selector: '2.0',
                                text: 'Needs either:',
                                list: {
                                    classes: 'govuk-list--bullet govuk-!-margin-bottom-0',
                                    text: [
                                        'to use an aid or appliance to be able to take nutrition',
                                        'supervision to be able to take nutrition',
                                        'assistance to be able to cut up food'
                                    ]
                                },
                                score: 2
                            },
                            {
                                selector: '2.1',
                                text: 'Needs a therapeutic source to be able to take nutrition',
                                score: 2
                            },
                            {
                                selector: '4',
                                text: 'Needs prompting to be able to take nutrition',
                                score: 4
                            },
                            {
                                selector: '6',
                                text: 'Needs assistance to be able to manage a therapeutic source to take nutrition',
                                score: 6
                            },
                            {
                                selector: '8',
                                text: 'Cannot convey food and drink to their mouth and needs another person to do so',
                                score: 8
                            }
                        ]
                    },
                    {
                        type: 'managingTherapy',
                        selector: 'dailyLivingManagingTherapy',
                        name: 'Managing therapy or monitoring a health condition',
                        link: 'managing-therapy',
                        hiddenAccessibilityText: ' new score for daily living: managing therapy',
                        scores: [
                            {
                                selector: '0',
                                text: 'Either:',
                                list: {
                                    classes: 'govuk-list--bullet govuk-!-margin-bottom-0',
                                    text: [
                                        'does not receive medication or therapy or need to monitor a health condition',
                                        'or can manage medication or therapy or monitor a health condition unaided'
                                    ]
                                },
                                score: 0
                            },
                            {
                                selector: '1',
                                text: 'Needs either:',
                                list: {
                                    classes: 'govuk-list--bullet govuk-!-margin-bottom-0',
                                    text: [
                                        'to use an aid or appliance to be able to manage medication',
                                        'supervision, prompting or assistance to be able to manage medication or monitor a health condition',
                                        'supervision, prompting or assistance to be able to monitor a health condition'
                                    ]
                                },
                                score: 1
                            },
                            {
                                selector: '2',
                                text: 'Needs supervision, prompting or assistance to be able to manage therapy that takes no more than 3.5 hours a week',
                                score: 2
                            },
                            {
                                selector: '4',
                                text: 'Needs supervision, prompting or assistance to be able to manage therapy that takes more than 3.5 but no more than 7 hours a week',
                                score: 4
                            },
                            {
                                selector: '6',
                                text: 'Needs supervision, prompting or assistance to be able to manage therapy that takes more than 7 but no more than 14 hours a week',
                                score: 6
                            },
                            {
                                selector: '8',
                                text: 'Needs supervision, prompting or assistance to be able to manage therapy that takes more than 14 hours a week',
                                score: 8
                            }
                        ]
                    },
                    {
                        type: 'washingBathing',
                        selector: 'dailyLivingWashingBathing',
                        name: 'Washing and bathing',
                        link: 'washing-bathing',
                        hiddenAccessibilityText: ' new score for daily living: washing and bathing',
                        scores: [
                            {
                                selector: '0',
                                text: 'Can wash and bathe unaided',
                                score: 0
                            },
                            {
                                selector: '2.0',
                                text: 'Needs to use an aid or appliance to be able to wash or bathe',
                                score: 2
                            },
                            {
                                selector: '2.1',
                                text: 'Needs supervision or prompting to be able to wash or bathe',
                                score: 2
                            },
                            {
                                selector: '2.2',
                                text: 'Needs assistance to be able to wash either their hair or body below the waist',
                                score: 2
                            },
                            {
                                selector: '3',
                                text: 'Needs assistance to be able to get in or out of a bath or shower',
                                score: 3
                            },
                            {
                                selector: '4',
                                text: 'Needs assistance to be able to wash their body between the shoulders and waist',
                                score: 4
                            },
                            {
                                selector: '8',
                                text: 'Cannot wash and bathe at all and needs another person to wash their entire body',
                                score: 8
                            }
                        ]
                    },
                    {
                        type: 'managingToilet',
                        selector: 'dailyLivingManagingToilet',
                        name: 'Managing toilet needs or incontinence',
                        link: 'managing-toilet',
                        hiddenAccessibilityText: ' new score for daily living: managing toilet',
                        scores: [
                            {
                                selector: '0',
                                text: 'Can manage toilet needs or incontinence unaided',
                                score: 0
                            },
                            {
                                selector: '2.0',
                                text: 'Needs to use an aid or appliance to be able to manage toilet needs or incontinence',
                                score: 2
                            },
                            {
                                selector: '2.1',
                                text: 'Needs supervision or prompting to be able to manage toilet needs',
                                score: 2
                            },
                            {
                                selector: '4',
                                text: 'Needs assistance to be able to manage toilet needs',
                                score: 4
                            },
                            {
                                selector: '6',
                                text: 'Needs assistance to be able to manage incontinence of either bladder and bowel',
                                score: 6
                            },
                            {
                                selector: '8',
                                text: 'Needs assistance to be able to manage incontinence of both bladder and bowel',
                                score: 8
                            }
                        ]
                    },
                    {
                        type: 'dressingUndressing',
                        selector: 'dailyLivingDressingUndressing',
                        name: 'Dressing and undressing',
                        link: 'dressing-undressing',
                        hiddenAccessibilityText: ' new score for daily living: dressing and undressing',
                        scores: [
                            {
                                selector: '0',
                                text: 'Can dress and undress unaided',
                                score: 0
                            },
                            {
                                selector: '2.0',
                                text: 'Needs to use an aid or appliance to be able to dress or undress',
                                score: 2
                            },
                            {
                                selector: '2.1',
                                text: 'Needs either:',
                                list: {
                                    classes: 'govuk-list--bullet govuk-!-margin-bottom-0',
                                    text: [
                                        'prompting to be able to dress, undress or determine appropriate circumstances for remaining clothed',
                                        'prompting or assistance to be able to select appropriate clothing'
                                    ]
                                },
                                score: 2
                            },
                            {
                                selector: '2.2',
                                text: 'Needs assistance to be able to dress or undress their lower body',
                                score: 2
                            },
                            {
                                selector: '4',
                                text: 'Needs assistance to be able to dress or undress their upper body',
                                score: 4
                            },
                            {
                                selector: '8',
                                text: 'Cannot dress or undress at all',
                                score: 8
                            }
                        ]
                    },
                    {
                        type: 'communicatingVerbally',
                        selector: 'dailyLivingCommunicatingVerbally',
                        name: 'Communicating verbally',
                        link: 'communicating-verbally',
                        hiddenAccessibilityText: ' new score for daily living: communicating verbally',
                        scores: [
                            {
                                selector: '0',
                                text: 'Can express and understand verbal information unaided',
                                score: 0
                            },
                            {
                                selector: '2',
                                text: 'Needs to use an aid or appliance to be able to speak or hear',
                                score: 2
                            },
                            {
                                selector: '4',
                                text: 'Needs communication support to be able to express or understand complex verbal information',
                                score: 4
                            },
                            {
                                selector: '8',
                                text: 'Needs communication support to be able to express or understand basic verbal information',
                                score: 8
                            },
                            {
                                selector: '12',
                                text: 'Cannot express or understand verbal information at all even with communication support',
                                score: 12
                            }
                        ]
                    },
                    {
                        type: 'readingAndUnderstanding',
                        selector: 'dailyLivingReadingSigns',
                        name: 'Reading and understanding signs, symbols and words',
                        link: 'reading-signs',
                        hiddenAccessibilityText: ' new score for daily living: reading and understanding signs, symbols and words',
                        scores: [
                            {
                                selector: '0',
                                text: 'Can read and understand basic and complex written information either unaided or using spectacles or contact lenses',
                                score: 0
                            },
                            {
                                selector: '2.0',
                                text: 'Needs to use an aid or appliance, other than spectacles or contact lenses, to be able to read or understand either basic or complex written information',
                                score: 2
                            },
                            {
                                selector: '2.1',
                                text: 'Needs prompting to be able to read or understand complex written information',
                                score: 2
                            },
                            {
                                selector: '4',
                                text: 'Needs prompting to be able to read or understand basic written information',
                                score: 4
                            },
                            {
                                selector: '8',
                                text: 'Cannot read or understand signs, symbols or words at all',
                                score: 8
                            }
                        ]
                    },
                    {
                        type: 'engagingWithOtherPeople',
                        selector: 'dailyLivingEngangingPeople',
                        name: 'Engaging with other people face to face',
                        link: 'engaging-face',
                        hiddenAccessibilityText: ' new score for daily living: engaging with other people face to face',
                        scores: [
                            {
                                selector: '0',
                                text: 'Can engage with other people unaided',
                                score: 0
                            },
                            {
                                selector: '2',
                                text: 'Needs prompting to be able to engage with other people',
                                score: 2
                            },
                            {
                                selector: '4',
                                text: 'Needs social support to be able to engage with other people',
                                score: 4
                            },
                            {
                                selector: '8',
                                text: 'Cannot engage with other people due to such engagement causing either:',
                                list: {
                                    classes: 'govuk-list--bullet govuk-!-margin-bottom-0',
                                    text: [
                                        'overwhelming psychological distress to the claimant',
                                        'the claimant to exhibit behaviour which would result in a substantial risk of harm to the claimant or another person'
                                    ]
                                },
                                score: 8
                            }
                        ]
                    },
                    {
                        type: 'makingBudgetingDecisions',
                        selector: 'dailyLivingMakingBudgetDecisions',
                        name: 'Making budgeting decisions',
                        link: 'budgeting-decisions',
                        hiddenAccessibilityText: ' new score for daily living: making budgeting decisions',
                        scores: [
                            {
                                selector: '0',
                                text: 'Can manage complex budgeting decisions unaided',
                                score: 0
                            },
                            {
                                selector: '2.0',
                                text: 'Needs prompting or assistance to be able to make complex budgeting decisions',
                                score: 2
                            },
                            {
                                selector: '4',
                                text: 'Needs prompting or assistance to be able to make simple budgeting decisions',
                                score: 4
                            },
                            {
                                selector: '6',
                                text: 'Cannot make any budgeting decisions at all',
                                score: 6
                            }
                        ]
                    }
                ]
            }
        },
        {
            table:{
                classes: 'govuk-!-margin-bottom-8 jui-table',
                caption: {
                    text:'Mobility',
                    classes:'govuk-heading-m'
                },
                headers: [
                    'Activity',
                    'Descriptor',
                    'Points',
                    ' '
                ],
                activities: [
                    {
                        type: 'planningFollowingJourneys',
                        selector: 'MobilityPlanningJourneys',
                        name: 'Planning and following journeys',
                        link: 'planning-journeys',
                        hiddenAccessibilityText: ' new score for daily living: planning and following journeys',
                        scores: [
                            {
                                selector: '0',
                                text: 'Can plan and follow the route of a journey unaided',
                                score: 0
                            },
                            {
                                selector: '4',
                                text: 'Needs prompting to be able to undertake any journey to avoid overwhelming psychological distress to the claimant',
                                score: 4
                            },
                            {
                                selector: '8',
                                text: 'For reasons other than psychological distress, cannot plan the route of a journey',
                                score: 8
                            },
                            {
                                selector: '10.0',
                                text: 'For reasons other than psychological distress, cannot follow the route of an unfamiliar journey without another person, assistance dog or orientation aid',
                                score: 10
                            },
                            {
                                selector: '10.1',
                                text: 'Cannot undertake any journey because it would cause overwhelming psychological distress to the claimant',
                                score: 10
                            },
                            {
                                selector: '12',
                                text: 'For reasons other than psychological distress, cannot follow the route of a familiar journey without another person, an assistance dog or an orientation aid',
                                score: 12
                            }
                        ]
                    },
                    {
                        type: 'movingAround',
                        selector: 'MobilityMovingAround',
                        name: 'Moving around',
                        link: 'moving-around',
                        hiddenAccessibilityText: ' new score for daily living: moving around',
                        scores: [
                            {
                                selector: '0',
                                text: 'Can stand and then move more than 200 metres, either aided or unaided',
                                score: 0
                            },
                            {
                                selector: '4',
                                text: 'Can stand and then move more than 50 metres but no more than 200 metres, either aided or unaided',
                                score: 4
                            },
                            {
                                selector: '8',
                                text: 'Can stand and then move unaided more than 20 metres but no more than 50 metres',
                                score: 8
                            },
                            {
                                selector: '10',
                                text: 'Can stand and then move using an aid or appliance more than 20 metres but no more than 50 metres',
                                score: 10
                            },
                            {
                                selector: '12.0',
                                text: 'Can stand and then move more than 1 metre but no more than 20 metres, either aided or unaided',
                                score: 12
                            },
                            {
                                selector: '12.1',
                                text: 'Cannot, either aided or unaided:',
                                list: {
                                    classes: 'govuk-list--bullet govuk-!-margin-bottom-0',
                                    text: [
                                        'stand',
                                        'move more than 1 metre'
                                    ]
                                },
                                score: 12
                            }
                        ]
                    }
                ]
            }
        },
        {
            heading: {
                text: 'Reasons for the tribunal’s view',
                classes: 'govuk-heading-l'
            }
        },
        {
            textarea: {
                validationError: {
                    value: 'Reasons for the tribunal’s view is mandatory field',
                    controlId: 'reasonsTribunalView'
                },
                control: 'reasonsTribunalView',
                value: '',
                validators: ['required']
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

// event : event name
// state | states : one state or many states for  event
// condition | conditions : one condition or many conditions for state
// result state to enter

//  condition :
//      variableName,  value

// event  --> state/states | result
// state/states ---> condition/conditions -> result

// [state] and . and ... are special casess

// result:
// string , "some- page" , a page to go to
// array , a list of pages to add to a register and the next page is first on register stack
// string , "..." pop next page of register stack

/*tslint:disable */
export const mapping = [
    {
        register: [
            { communicatingVerbally: 'communicating-verbally' },
            { dressingUndressing: 'dressing-undressing' },
            { engagingWithOtherPeople: 'engaging-face' },
            { makingBudgetingDecisions: 'budgeting-decisions' },
            { managingTherapy: 'managing-therapy' },
            { managingToilet: 'managing-toilet' },
            { movingAround: 'moving-around' },
            { planningFollowingJourneys: 'planning-journeys' },
            { preparingFood: 'preparing-food' },
            { readingAndUnderstanding: 'reading-signs' },
            { takingNutrition: 'taking-nutrition' },
            { washingBathing: 'washing-bathing' },
            'check',
        ]
    },
    {
        event: 'change',
        result: '[state]',
    },
    {
        event: 'continue',
        states: [
            {
                state: 'create',
                conditions: [
                    {
                        condition: [{ preliminaryView: 'yes' }],
                        result: 'preliminary-advanced',
                    },
                    {
                        condition: [{ preliminaryView: 'no' }],
                        result: 'final-decision',
                    }
                ]
            },
            {
                state: 'final-decision',
                result: 'check-final-decision'
            },
            {
                state: 'check-final-decision',
                result: '.'
            },
            {
                state: 'preliminary-advanced',
                result: 'set-award-dates',
            },
            {
                state: 'set-award-dates',
                result: 'scores',
            },
            {
                state: 'scores',
                result: '<register>'
            },
            {
                state: 'check',
                result: 'check-tribunal'
            },
            {
                state: 'check-tribunal',
                result: 'decision-confirmation'
            },
            {
                state: 'communicating-verbally',
                result: '...',
            },
            {
                state: 'dressing-undressing',
                result: '...',
            },
            {
                state: 'engaging-face',
                result: '...',
            },
            {
                state: 'budgeting-decisions',
                result: '...',
            },
            {
                state: 'managing-therapy',
                result: '...',
            },
            {
                state: 'managing-toilet',
                result: '...',
            },
            {
                state: 'moving-around',
                result: '...',
            },
            {
                state: 'planning-journeys',
                result: '...',
            },
            {
                state: 'preparing-food',
                result: '...',
            },
            {
                state: 'reading-signs',
                result: '...',
            },
            {
                state: 'taking-nutrition',
                result: '...',
            },
            {
                state: 'washing-bathing',
                result: '...',
            }
        ]
    }
]
/*tslint:enable */

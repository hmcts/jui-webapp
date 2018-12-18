
export const templates: any = {}

// Define all the case type template includes, right now benefit

templates.benefit = {}

// end case type definition

// Define all the pages for a case type

templates.benefit.create = require('./benefit/create')
templates.benefit['preliminary-advanced'] = require('./benefit/preliminaryAdvanced')
templates.benefit['final-decision'] = require('./benefit/finalDecision')
templates.benefit['set-award-dates'] = require('./benefit/setAwardDates')

templates.benefit.scores = require('./benefit/scores')
templates.benefit['communicating-verbally'] = require('./benefit/communicatingVerbally')
templates.benefit['dressing-undressing'] = require('./benefit/dressingUndressing')
templates.benefit['engaging-face'] = require('./benefit/engagingFace')
templates.benefit['budgeting-decisions'] = require('./benefit/budgetingDecisions')
templates.benefit['managing-therapy'] = require('./benefit/managingTherapy')
templates.benefit['managing-toilet'] = require('./benefit/managingToilet')
templates.benefit['moving-around'] = require('./benefit/movingAround')
templates.benefit['planning-journeys'] = require('./benefit/planningJourneys')
templates.benefit['preparing-food'] = require('./benefit/preparingFood')
templates.benefit['reading-signs'] = require('./benefit/readingSigns')
templates.benefit['taking-nutrition'] = require('./benefit/takingNutrition')
templates.benefit['washing-bathing'] = require('./benefit/washingBathing')
templates.benefit.check = require('./benefit/check')
templates.benefit['check-final-decision'] = require('./benefit/checkFinalDecision')
templates.benefit['check-tribunal'] = require('./benefit/checkTribunal')
templates.benefit['decision-confirmation'] = require('./benefit/decisionConfirmation')

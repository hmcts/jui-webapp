export const templates: any = {}

templates.financialremedymvp2 = {}

// Define all the pages for a case type
templates.financialremedymvp2.create = require('./financialremedymvp2/create')
templates.financialremedymvp2.check = require('./financialremedymvp2/check')
templates.financialremedymvp2['decision-confirmation'] = require('./financialremedymvp2/decisionConfirmation')
templates.financialremedymvp2['draft-consent-order'] = require('./financialremedymvp2/draftConsentOrder')
templates.financialremedymvp2['hearing-details'] = require('./financialremedymvp2/hearingDetails')
templates.financialremedymvp2['notes-for-court-administrator'] = require('./financialremedymvp2/notesForCourtAdministrator')
templates.financialremedymvp2['reject-reasons'] = require('./financialremedymvp2/rejectReasons')


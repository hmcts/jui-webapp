const express = require('express');
const config = require('../../config');
const stateMeta = require('./state_meta');

// The dummy "draft store" below
let dummyFormDataStore = {
};

function handlePostState(req, res, responseJSON, theState) {
    const formValues = req.body.formValues;
    if (formValues) {
        // TODO: some data validation should be here ?
        dummyFormDataStore = formValues;
        console.log(dummyFormDataStore);
    }

    if (req.body.event === 'continue') {
        switch (theState.inStateId)  {
        case 'create':
            if (formValues.approveDraftConsent === 'yes') {
                responseJSON.newRoute = 'notes-for-court-administrator'
            } else {
                responseJSON.newRoute = 'reject-reasons'
            }
            break;
        case 'notes-for-court-administrator':
            responseJSON.newRoute = 'check'
            break;
        case 'check':
            responseJSON.newRoute = 'decision-confirmation'
            break;
        default:
            break;
        }

        // update meta data according to newly selected state
        if (responseJSON.newRoute) {
            responseJSON.meta = stateMeta[theState.inJurisdiction][responseJSON.newRoute];
        }
    }
}

function responseAssert(res, responseJSON, condition, statusHint) {
    if (!condition) {
        res.status(404);
        responseJSON.statusHint = statusHint;
    }

    return condition;
}

function handleStateRoute(req, res) {
    const inJurisdiction = req.params.jur_id;
    const inCaseId = req.params.case_id;
    const inStateId = req.params.state_id;

    const theState = {
        inJurisdiction,
        inCaseId,
        inStateId
    };

    const responseJSON = {};

    if (responseAssert(res, responseJSON, stateMeta[inJurisdiction], 'Input parameter route_id: uknown jurisdiction') 
        && responseAssert(res, responseJSON, stateMeta[inJurisdiction][inStateId], 'Input parameter route_id wrong: no route with this id inside jurisdiction ${inRouteJur}')
    ) {
        // for GET we return meta for the state requested by inStateId
        // however, for POST, the meta may get overwritten if the change of state occurs
        responseJSON.meta = stateMeta[inJurisdiction][inStateId];
        
        if (req.method === 'POST')
        {
            handlePostState(req, res, responseJSON, theState);
        }
        responseJSON.formValues = dummyFormDataStore;
    }

    res.send(JSON.stringify(responseJSON));
};

module.exports = app => {
    const router = express.Router({ mergeParams: true });
    app.use('/decisions', router);

    router.get('/state/:jur_id/:case_id/:state_id', handleStateRoute);
    router.post('/state/:jur_id/:case_id/:state_id', handleStateRoute);
}

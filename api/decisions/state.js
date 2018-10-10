const Store = require('../lib/store');
const express = require('express');
const stateMeta = require('./state_meta');

const ERROR404 = 404;

/* eslint-disable-next-line complexity */
function handlePostState(req, res, responseJSON, theState) {
    const store = new Store(req);
    const inCaseId = req.params.case_id;

    const formValues = req.body.formValues;
    if (formValues) {
        store.set(`decisions_${inCaseId}`, formValues);
    }

    /* eslint-disable indent */
    if (req.body.event === 'continue') {
        switch (theState.inStateId) {
            case 'create':
                if (formValues.approveDraftConsent === 'yes') {
                    responseJSON.newRoute = 'notes-for-court-administrator';
                } else {
                    responseJSON.newRoute = 'reject-reasons';
                }
                break;
            case 'notes-for-court-administrator':
                responseJSON.newRoute = 'check';
                break;
            case 'check':
                responseJSON.newRoute = 'decision-confirmation';
                break;
            case 'reject-reasons':
                if (formValues.includeAnnotatedVersionDraftConsOrder === 'yes') {
                    responseJSON.newRoute = 'draft-consent-order';
                } else if (formValues.partiesNeedAttend === true) {
                    responseJSON.newRoute = 'hearing-details';
                } else {
                    responseJSON.newRoute = 'notes-for-court-administrator';
                }
                break;
            case 'draft-consent-order':
                if (formValues.partiesNeedAttend === true) {
                    responseJSON.newRoute = 'hearing-details';
                } else {
                    responseJSON.newRoute = 'notes-for-court-administrator';
                }
                break;
            default:
                break;
        }
        // update meta data according to newly selected state
        if (responseJSON.newRoute) {
            responseJSON.meta = stateMeta[theState.inJurisdiction][responseJSON.newRoute];
        }
    }
    /* eslint-enable indent */
}

function responseAssert(res, responseJSON, inJurisdiction, inStateId, statusHint) {
    if (stateMeta[inJurisdiction] && stateMeta[inJurisdiction][inStateId]) {
        res.status(ERROR404);
        responseJSON.statusHint = statusHint;
        return false;
    }

    return true;
}

function handleStateRoute(req, res) {
    const store = new Store(req);
    const inJurisdiction = req.params.jur_id;
    const inCaseId = req.params.case_id;
    const inStateId = req.params.state_id;

    const theState = {
        inJurisdiction,
        inCaseId,
        inStateId
    };

    const responseJSON = {};

    if (
        responseAssert(res, responseJSON, stateMeta[inJurisdiction], 'Input parameter route_id: uknown jurisdiction') &&
        responseAssert(
            res,
            responseJSON,
            stateMeta[inJurisdiction][inStateId],
            'Input parameter route_id wrong: no route with this id inside jurisdiction ${inRouteJur}'
        )
    ) {
        // for GET we return meta for the state requested by inStateId
        // however, for POST, the meta may get overwritten if the change of state occurs
        responseJSON.meta = stateMeta[inJurisdiction][inStateId];

        if (req.method === 'POST') {
            handlePostState(req, res, responseJSON, theState);
        }

        responseJSON.formValues = store.get(`decisions_${inCaseId}`) || {};
    }
    req.session.save(() => res.send(JSON.stringify(responseJSON)));
}

module.exports = app => {
    const router = express.Router({ mergeParams: true });
    app.use('/decisions', router);

    router.get('/state/:jur_id/:case_id/:state_id', handleStateRoute);
    router.post('/state/:jur_id/:case_id/:state_id', handleStateRoute);
};

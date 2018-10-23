const express = require('express');
const { getHearing, getHearingIdOrCreateHearing } = require('../services/coh-cor-api/coh-cor-api');


function getOptions(req) {
    return {
        headers: {
            Authorization: `Bearer ${req.auth.token}`,
            ServiceAuthorization: req.headers.ServiceAuthorization
        }
    };
}

// TODO: need to relayout the api with the front app in the future.
module.exports = app => {
    const casesRouter = express.Router({ mergeParams: true });
    app.use('/cases', casesRouter);

    casesRouter.get('/:jur/:casetype/:case_id/hearing', (req, res, next) => {
        const userId = req.auth.userId;
        const caseId = req.params.case_id;
        const options = getOptions(req);

        getHearingIdOrCreateHearing(caseId, userId, options)
            .then(hearingId => getHearing(hearingId, options))
            .then(response => {
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.setHeader('content-type', 'application/json');
                res.status(200).send(JSON.stringify(response));
            })
            .catch(response => {
                console.log(response.error || response);
                res.status(response.error.status).send(response.error.message);
            });
    });


    const hearingRouter = express.Router({ mergeParams: true });
    app.use('/hearings', hearingRouter);

    hearingRouter.post('/:case_id', (req, res, next) => {
        const userId = req.auth.userId;
        const caseId = req.params.case_id;
        const options = getOptions(req);


        getHearingIdOrCreateHearing(caseId, userId, options)
            .then(response => {
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.setHeader('content-type', 'application/json');
                res.status(201)
                    .send(JSON.stringify(response));
            })
            .catch(response => {
                console.log('Request for a hearing to be listed ERROR---->', response.error || response);
                res.status(response.error.status)
                    .send(response.error.message);
            });
    });
};

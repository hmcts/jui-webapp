const express = require('express');
const config = require('../../config');
const generateRequest = require('../lib/request');


function getAnnotationSet(uuid, options) {
    return generateRequest('GET', `${config.services.em_anno_api}/annotation-sets/${uuid}`, options);
}

function getAnnotationHealth(options) {
    return generateRequest('GET', `${config.services.em_anno_api}/health`, options);
}

function getAnnotationInfo(options) {
    return generateRequest('GET', `${config.services.em_anno_api}/info`, options);
}


function getOptions(req) {
    return {
        headers: {
            Authorization: `Bearer ${req.auth.token}`,
            ServiceAuthorization: req.headers.ServiceAuthorization
        }
    };
}

module.exports = app => {
    const router = express.Router({ mergeParams: true });
    app.use('/annotations', router);

    router.get('/annotations-set/:uuid', (req, res, next) => {
        const uuid = req.params.uuid;
        const options = getOptions(req);

        getAnnotationSet(uuid, options)
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
    router.get('/info', (req, res, next) => {
        const options = getOptions(req);

        getAnnotationInfo(options)
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
    router.get('/health', (req, res, next) => {
        const options = getOptions(req);

        getAnnotationHealth(options)
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
};

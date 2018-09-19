const generateRequest = require('../lib/request');
const config = require('../../config');

function getAnnotationSet(documentUrl, userId, options) {
    return generateRequest('GET', `${config.services.em_anno_api}/annotation-sets/filter?url=${documentUrl}`, options)
}

//List of cases
module.exports = (req, res, next) => {
    const token = req.auth.token;
    const userId = req.auth.userId;
    const documentUrl = req.query.url
    const options = {
        headers: {
            'Authorization': `Bearer ${token}`,
            'ServiceAuthorization': req.headers.ServiceAuthorization
        }
    };
    getAnnotationSet(documentUrl, userId, options)
        .then(annotationSets => {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('content-type', 'application/json');
            res.status(200).send(JSON.stringify(annotationSets));
    }).catch(response => {
        console.log(response.error || response);
        res.status(response.statusCode || 500).send(response);
    });
};

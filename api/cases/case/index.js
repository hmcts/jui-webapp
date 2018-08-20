const express = require('express');
const config = require('../../../config/index');
const getCaseTemplate = require('./templates');
const generateRequest = require('../../lib/request');
const valueProcessor = require('../../lib/processors/value-processor');
const { getEvents } = require('../../events');
const { getDocuments } = require('../../documents');
const { getAllQuestionsByCase } = require('../../questions');

function getCase(caseId, userId, jurisdiction, caseType, options) {
    return generateRequest('GET', `${config.services.ccd_data_api}/caseworkers/${userId}/jurisdictions/${jurisdiction}/case-types/${caseType}/cases/${caseId}`, options);
}

function hasCOR(jurisdiction, caseType) {
    return jurisdiction === 'SSCS';
}

function getCaseWithEventsAndQuestions(caseId, userId, jurisdiction, caseType, options) {
    const promiseArray = [
        getCase(caseId, userId, jurisdiction, caseType, options),
        getEvents(caseId, userId, jurisdiction, caseType, options)
    ];

    if (hasCOR(jurisdiction, caseType)) {
        promiseArray.push(getAllQuestionsByCase(caseId, userId, options, jurisdiction));
    }

    return Promise.all(promiseArray);
}

function replaceSectionValues(section, caseData) {
    if (section.sections && section.sections.length) {
        section.sections.forEach(childSection => {
            replaceSectionValues(childSection, caseData);
        });
    } else {
        section.fields.forEach(field => {
            field.value = valueProcessor(field.value, caseData);
        });
    }
}

// GET case callback
module.exports = (req, res, next) => {
        const token = req.auth.token;
        const userId = req.auth.userId;
        const caseId = req.params.case_id;
        const jurisdiction = req.params.jur;
        const caseType = req.params.casetype;

        const options = {
            headers: {
                Authorization: `Bearer ${token}`,
                ServiceAuthorization: req.headers.ServiceAuthorization
            }
        };

        getCaseWithEventsAndQuestions(caseId, userId, jurisdiction, caseType, options)
            .then(([caseData, events, questions]) => {
                caseData.questions = questions;
                caseData.events = events;

                const schema = JSON.parse(JSON.stringify(getCaseTemplate(caseData.jurisdiction, caseData.case_type_id)));
                if (schema.details) {
                    replaceSectionValues(schema.details, caseData);
                }
                schema.sections.forEach(section => replaceSectionValues(section, caseData));
                schema.id = caseData.id;
                schema.case_jurisdiction = caseData.jurisdiction;
                schema.case_type_id = caseData.case_type_id;


                const docIds = (caseData.documents || [])
                    .filter(document => document.value.documentLink)
                    .map(document => {
                        const splitDocLink = document.value.documentLink.document_url.split('/');
                        return splitDocLink[splitDocLink.length - 1];
                    });

                getDocuments(docIds, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        ServiceAuthorization: req.headers.ServiceAuthorization,
                        'user-roles': req.auth.data
                    }
                })
                    .then(documents => {
                        documents = documents.map(doc => {
                            const splitURL = doc._links.self.href.split('/');
                            doc.id = splitURL[splitURL.length - 1];
                            return doc;
                        });

                        schema.documents = documents;
                        res.setHeader('Access-Control-Allow-Origin', '*');
                        res.setHeader('content-type', 'application/json');
                        res.status(200).send(JSON.stringify(schema));
                    });
            })
            .catch(response => {
                console.log(response.error || response);
                res.status(response.error.status)
                    .send(response.error.message);
            });
};

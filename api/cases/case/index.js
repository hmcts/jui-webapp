const express = require('express')
const getCaseTemplate = require('./templates')
const valueProcessor = require('../../lib/processors/value-processor')
const { getEvents } = require('../../events/event')
const { getDocuments } = require('../../services/dm-store-api/dm-store-api')
const { getAllQuestionsByCase } = require('../../questions/question')
const { getCCDCase } = require('../../services/ccd-store-api/ccd-store')
const { getHearingByCase } = require('../../services/coh-cor-api/coh-cor-api')
const processCaseStateEngine = require('../../lib/processors/case-state-model')

function hasCOR(jurisdiction, caseType) {
    return jurisdiction === 'SSCS'
}

function getCaseWithEventsAndQuestions(userId, jurisdiction, caseType, caseId, options) {
    const promiseArray = [
        getCCDCase(userId, jurisdiction, caseType, caseId, options),
        getEvents(userId, jurisdiction, caseType, caseId, options)
    ]

    if (hasCOR(jurisdiction, caseType)) {
        promiseArray.push(getAllQuestionsByCase(caseId, userId, options, jurisdiction))
        promiseArray.push(getHearingByCase(caseId, options))
    }

    return Promise.all(promiseArray)
}

function replaceSectionValues(section, caseData) {
    if (section.sections && section.sections.length) {
        section.sections.forEach(childSection => {
            replaceSectionValues(childSection, caseData)
        })
    } else {
        section.fields.forEach(field => {
            field.value = valueProcessor(field.value, caseData)
        })
    }
}

function getDocIdList(documents) {
    return (documents || []).map(document => {
        const splitDocLink = document.document_url.split('/')
        return splitDocLink[splitDocLink.length - 1]
    })
}

function appendDocIdToDocument(documents) {
    return documents.map(doc => {
        const splitURL = doc._links.self.href.split('/')
        doc.id = splitURL[splitURL.length - 1]
        return doc
    })
}

function getOptions(req) {
    return {
        headers: {
            Authorization: `Bearer ${req.auth.token}`,
            ServiceAuthorization: req.headers.ServiceAuthorization
        }
    }
}

function getOptionsDoc(req) {
    return {
        headers: {
            Authorization: `Bearer ${req.auth.token}`,
            ServiceAuthorization: req.headers.ServiceAuthorization,
            'user-roles': req.auth.data
        }
    }
}

// GET case callback
module.exports = app => {
    const router = express.Router({ mergeParams: true })
    app.use('/case', router)

    router.get('/:jur/:casetype/:case_id', (req, res, next) => {
        const userId = req.auth.userId
        const jurisdiction = req.params.jur
        const caseType = req.params.casetype
        const caseId = req.params.case_id

        getCaseWithEventsAndQuestions(userId, jurisdiction, caseType, caseId, getOptions(req))
            .then(([caseData, events, questions, hearings]) => {
                caseData.events = events;
                caseData.questions = (questions) ? questions.sort((a, b) => (a.question_round_number < b.question_round_number)) : [];
                caseData.hearing_data = (hearings && hearings.online_hearings) ? hearings.online_hearings[0] : [];

                const ccdState = caseData.state;
                const hearingData = (hearings && hearings.online_hearings) ? hearings.online_hearings[0] : undefined;
                const questionRoundData = caseData.questions;
                const consentOrder = caseData.case_data.consentOrder ? caseData.case_data.consentOrder : undefined
                const hearingType = caseData.case_data.appeal ? caseData.case_data.appeal.hearingType : undefined;

                const caseState = processCaseStateEngine({
                    jurisdiction,
                    caseType,
                    ccdState,
                    hearingType,
                    hearingData,
                    questionRoundData,
                    consentOrder
                });
                caseData.state = caseState;

                const schema = JSON.parse(JSON.stringify(getCaseTemplate(caseData.jurisdiction, caseData.case_type_id)));
                if (schema.details) {
                    replaceSectionValues(schema.details, caseData)
                }
                schema.sections.forEach(section => replaceSectionValues(section, caseData))
                schema.id = caseData.id
                schema.case_jurisdiction = caseData.jurisdiction
                schema.case_type_id = caseData.case_type_id

                getDocuments(getDocIdList(caseData.documents), getOptionsDoc(req))
                    .then(appendDocIdToDocument)
                    .then(documents => {
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
    });

    router.get('/:jur/:casetype/:case_id/raw', (req, res, next) => {
        const userId = req.auth.userId;
        const jurisdiction = req.params.jur;
        const caseType = req.params.casetype;
        const caseId = req.params.case_id;

        getCaseWithEventsAndQuestions(userId, jurisdiction, caseType, caseId, getOptions(req))
            .then(([caseData, events, questions, hearings]) => {
                caseData.events = events;
                caseData.questions = (questions) ? questions.sort((a, b) => (a.question_round_number < b.question_round_number)) : [];
                caseData.hearing_data = hearings.online_hearings[0] || [];

                const schema = JSON.parse(JSON.stringify(getCaseTemplate(caseData.jurisdiction, caseData.case_type_id)));
                if (schema.details) {
                    replaceSectionValues(schema.details, caseData);
                }
                schema.sections.forEach(section => replaceSectionValues(section, caseData));
                schema.id = caseData.id;
                schema.case_jurisdiction = caseData.jurisdiction;
                schema.case_type_id = caseData.case_type_id;

                getDocuments(getDocIdList(caseData.documents), getOptionsDoc(req))
                    .then(appendDocIdToDocument)
                    .then(documents => {
                        schema.documents = documents;
                        res.setHeader('Access-Control-Allow-Origin', '*');
                        res.setHeader('content-type', 'application/json');
                        res.status(200).send(JSON.stringify(caseData));
                    });
            })
            .catch(response => {
                console.log(response.error || response);
                res.status(response.error.status)
                    .send(response.error.message);
            });
    });
};
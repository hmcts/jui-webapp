import * as express from 'express'
import { config } from '../../../config'
const generateRequest = require('../../lib/request/request')
const headerUtilities = require('../../lib/utilities/headerUtilities')

const url = config.services.ccd_def_api

function getJurisdictions(options) {
    return generateRequest('GET', `${url}/api/data/jurisdictions`, options)
}

function getCaseTypes(jurisdictions, options) {
    // return generateRequest('GET', `${url}/api/data/jurisdictions/${jurisdictions}/case-type`, options)
}

function getHealth(options) {
    return generateRequest('GET', `${url}/health`, options)
}

function getInfo(options) {
    return generateRequest('GET', `${url}/info`, options)
}

function getOptions(req) {
    return headerUtilities.getAuthHeaders(req)
}

module.exports = app => {
    const router = express.Router({ mergeParams: true })
    app.use('/ccd-def', router)

    router.get('/jurisdictions', (req, res, next) => {
        getJurisdictions(getOptions(req)).pipe(res)
    })

    // router.get('/jurisdictions/:jurisdictions', (req, res, next) => {
    //     const jurisdictions = req.params.jurisdictions
    //     getCaseTypes(jurisdictions, getOptions(req)).pipe(res)
    // })

    // router.get('/jurisdictions/:jurisdictions/eventStates', (req, res, next) => {
    //     const jurisdictions = req.params.jurisdictions
    //     getCaseTypes(jurisdictions, getOptions(req))
    //         .then(obj =>
    //             obj.map(jud => {
    //                 return {
    //                     id: jud.id,
    //                     events: jud.events.map(event => {
    //                         return {
    //                             a: `${event.pre_states.length > 0 ? event.pre_states : '()'} => ${event.id} => ${event.post_state}`,
    //                             // event,
    //                             fields: event.case_fields.filter(f => f.display_context !== 'READONLY').map(f => f.case_field_id),
    //                             acls: event.acls.map(
    //                                 a =>
    //                                     `${a.role} [${a.create ? 'C,' : ''}${a.read ? 'R,' : ''}${a.update ? 'U,' : ''}${
    //                                         a.delete ? 'D' : ''
    //                                     }]`
    //                             )
    //                             // id: event.id,
    //                             // name: event.name,
    //                             // pre_states: event.pre_states,
    //                             // post_state: event.post_state
    //                         }
    //                     })
    //                 }
    //             })
    //         )
    //         .then(results => {
    //             res.setHeader('Access-Control-Allow-Origin', '*')
    //             res.setHeader('content-type', 'application/json')
    //             res.status(200).send(JSON.stringify(results))
    //         })
    //         .catch(response => {
    //             console.log(response.error || response)
    //             res.status(response.statusCode || 500).send(response)
    //         })
    //})

    router.get('/health', (req, res, next) => {
        getHealth(getOptions(req)).pipe(res)
    })

    router.get('/info', (req, res, next) => {
        getInfo(getOptions(req)).pipe(res)
    })
}

module.exports.getInfo = getInfo

module.exports.getHealth = getHealth

module.exports.getJurisdictions = getJurisdictions

module.exports.getCaseTypes = getCaseTypes

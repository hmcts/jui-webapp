import * as express from 'express'
import * as log4js from 'log4js'
import { config } from '../../../config'
import { Store } from '../../lib/store/store'

import * as divorcePayload from './divorce'
import * as divorceMapping from './divorce/mapping'

import * as stateMeta from './divorce/state_meta'

import * as sscs from './sscs/'

const divorceType = 'DIVORCE'
const sscsType = 'SSCS'

const logger = log4js.getLogger('scss engine')
logger.level = config.logging ? config.logging : 'OFF'

function some(array, predicate) {
    for (const item in array) {
        if (array[item]) {
            const result = predicate(array[item])
            if (result) {
                return result
            }
        }
    }
    return null
}

function pushStack(req, stack) {
    const jurisdiction = req.params.jurId
    const caseId = req.params.caseId
    const caseTypeId = req.params.caseTypeId.toLowerCase()
    let newStack = [...stack]

    const store = new Store(req)
    const currentStack = store.get(`decisions_stack_${jurisdiction}_${caseTypeId}_${caseId}`)
    if (currentStack === '' || currentStack === null) {
        newStack = [...currentStack, stack]
    }
    store.set(`decisions_stack_${jurisdiction}_${caseTypeId}_${caseId}`, newStack)
}

function shiftStack(req, variables) {
    const jurisdiction = req.params.jurId
    const caseId = req.params.caseId
    const caseTypeId = req.params.caseTypeId.toLowerCase()

    const store = new Store(req)
    let matching = false

    while (matching) {
        const currentStack = store.get(`decisions_stack_${jurisdiction}_${caseTypeId}_${caseId}`)
        logger.info(`popped stack ${currentStack[0]}`)
        const currentItem = currentStack.shift()
        logger.info(`Got item ${currentItem}`)
        logger.info(currentItem)
        store.set(`decisions_stack_${jurisdiction}_${caseTypeId}_${caseId}`, currentStack)

        const key = Object.keys(currentItem)[0]
        if (Object.keys(currentItem).length) { // item is an object with variable to evaluate
            matching = (variables[key]) ? currentItem[key] : null
        }
    }
}

// does not handle OR yet
function handleCondition(conditionNode, variables) {
    // index 0 hardcoded, not interating through for OR
    const key = Object.keys(conditionNode.condition[0])[0]
    console.log(conditionNode)
    if (variables[key] === conditionNode.condition[0][key]) {
        return conditionNode.result // eslint-disable-line no-param-reassign
    }
    return null
}

function handleState(stateNode, variables) {
    if (stateNode.condition) {
        return handleCondition(stateNode, variables)
    } else if (stateNode.conditions) {
        logger.info(`Found multiple conditions for ${stateNode.state}`)
        return some(stateNode.conditions, conditions => handleCondition(conditions, variables))
    } else if (stateNode.result) {
        logger.info(`State result without conditional: ${stateNode.result}`)
        return stateNode.result
    }
    return null
}

function handleInstruction(instruction, stateId, variables) {
    if (instruction.state && instruction.state === stateId) {
        return handleState(instruction, variables)
    } else if (instruction.states) {
        logger.info(`Found multiple states for ${instruction.event}`)
        return some(instruction.states, stateNode => {
            if (stateNode.state === stateId) {
                return handleState(stateNode, variables)
            }

            return false
        })
    }
    return null
}

function process(req, res, mapping, payload, templates) {
    const jurisdiction = req.params.jurId
    const caseId = req.params.caseId
    const caseTypeId = req.params.caseTypeId.toLowerCase()
    const stateId = req.params.stateId

    const event = req.body.event
    let variables = req.body.formValues

    let meta = {}
    let newRoute = null
    const store = new Store(req)

    if (variables) {
        store.set(`decisions_${jurisdiction}_${caseTypeId}_${caseId}`, variables)
    }

    if (req.method === 'POST') {
        console.log(event)
        mapping.some((instruction, i) => {
            if (instruction.event === event) {
                // event is the main index and so there can only be one instruction per event - exit after finding
                logger.info(`Found matching event for ${event}`)
                let result = handleInstruction(instruction, stateId, variables)
                logger.info(`result ${result}`)
                if (Array.isArray(result)) {
                    logger.info('Pushing stack')
                    pushStack(req, result)
                    result = shiftStack(req, variables)
                    logger.info(`Popped stack ${result}`)
                } else if (result === '...') {
                    result = shiftStack(req, variables)
                } else if (result === '[state]') {
                    result = req.params.stateId
                } else if (result === 'end') {
                    payload(req, res)
                } else if (result) {
                    console.log('assigning meta', caseTypeId, result)
                    meta = templates[caseTypeId][result]
                    console.log(meta)
                    newRoute = result
                }
            }
            return false
        })
    } else {
        console.log(templates)
        meta = templates[caseTypeId][stateId]
    }

    variables = store.get(`decisions_${jurisdiction}_${caseTypeId}_${caseId}`) || {}

    const response = {
        formValues: variables,
        meta,
        newRoute,
    }
    req.session.save(() => res.send(JSON.stringify(response)))
}

function handleStateRoute(req, res) {
    console.log(req.method)

    const jurisdiction = req.params.jurId

    switch (jurisdiction) {
        case divorceType:
        console.log("divorce")
        process(req, res, divorceMapping, divorcePayload, stateMeta)
        break
        case sscsType:
        console.log('SSCS')
        process(req, res, sscs.mapping, {}, sscs.templates)
        break
    default:
    }
}

export default app => {
    const router = express.Router({ mergeParams: true })
    app.use('/decisions', router)

    router.get('/state/:jurId/:caseTypeId/:caseId/:stateId', handleStateRoute)
    router.post('/state/:jurId/:caseTypeId/:caseId/:stateId', handleStateRoute)
}
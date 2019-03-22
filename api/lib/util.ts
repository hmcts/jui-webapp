import * as express from 'express'
import * as path from 'path'
import { decrypt } from './encryption'
import * as errorStack from './errorStack'
import { http } from './http'
import * as log4jui from './log4jui'
import { JUILogger } from './models'

const utilLogger: JUILogger = log4jui.getLogger('util')

let refJudgeLookUp = []

export function asyncReturnOrError(
    promise: any,
    message: string,
    res: express.Response | null,
    logger: JUILogger,
    setResponse: boolean = true
): any {
    return promise
        .then(data => {
            return data
        })
        .catch(err => {
            const msg = `${message}`
            logger.error(msg)

            if (setResponse) {
                let status
                if (exists(err, 'response.status')) {
                    status = err.response.status
                } else {
                    status = err.statusCode || 500
                }
                res.status(status).send(JSON.stringify(errorStack.get()))
            }

            return null
        })
}

export function some(array, predicate) {
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

export function dotNotation(nestled: string) {
    return nestled.replace(/[\[\]]/g, '.')
}

export function valueOrNull(object: any, nestled: string) {
    const value = exists(object, nestled, true)
    return value ? value : null
}

export function exists(object: any, nestled: string, returnValue = false) {
    const dotArray = dotNotation(nestled).split('.')
    if (object) {
        if (dotArray.length && dotArray[0] !== '') {
            const current = dotArray[0]
            dotArray.shift()
            if (object[current]) {
                return exists(object[current], dotArray.join('.'), returnValue)
            } else {
                return false
            }
        } else {
            return returnValue ? object : true
        }
    } else {
        return false
    }
}

export function shorten(str: string, maxLen: number): string {
    return str.length > maxLen ? `${str.substring(0, maxLen)}...` : str
}

export function isObject(o) {
    return o !== null && typeof o === 'object' && Array.isArray(o) === false
}

export function judgeLookUp(judgeEmail) {
    if (!refJudgeLookUp.length) {
        utilLogger.info('Decrypting judge data ...')
        try {
            utilLogger.info(`Running from__dirname ${__dirname}`)
            const data = decrypt(path.join(__dirname, '../lib/config/refJudgeLookUp.crypt'))
            refJudgeLookUp = JSON.parse(data)
        } catch (e) {
            utilLogger.error(e)
        }
    }

    const judge = refJudgeLookUp.filter(judgeLookup => judgeLookup.email === judgeEmail)
    return judge.length ? judge[0].name : judgeEmail
}

export async function getHealth(url: string) {
    const response = await http.get(`${url}/health`)

    return response.data
}

export async function getInfo(url: string) {
    const response = await http.get(`${url}/info`)

    return response.data
}

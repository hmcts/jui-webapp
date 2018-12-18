
const proxy = require('../lib/request/proxy')
import { config } from '../../config'
import { http } from '../lib/http'

const url = config.services.draft_store_api

let DMconfig

export function setConfig(req) {
    DMconfig = {
        headers:
            { ServiceAuthorization: `Bearer ${req.headers.ServiceAuthorization}` },
    }
}
export async function createDraft() {
    const response = await http.post(proxy(`${url}/drafts`), {
        "id": "123",
    }, DMconfig)
    return response.data
}

export async function getAllDrafts() {
    const response = await http.get(`${url}/drafts`, DMconfig)
    console.log(response.data)
}

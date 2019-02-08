import * as express from 'express'

let  request = null

export function errorStack(req: express.Request , res: express.Response , next: express.next){
    request = req
    console.log('okay')
    request.session.errorStack = []
    next()

}

export function push(data: any): void {
    request.session.errorStack.push(data)
}

export function pop(): any {
    return request.session.errorStack.pop()
}

export function get(): any[] {
    return request.session.errorStack.reverse()
}
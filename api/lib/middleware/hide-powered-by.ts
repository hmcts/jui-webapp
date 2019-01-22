import {Request, Response} from 'express'

export function hidePoweredBy() {
    return (req: Request, res: Response, next: any) => {
        res.app.disable('x-powered-by')
        res.removeHeader('Server')
        next()
    }
}

import {Request, Response} from 'express'

export function frameguard() {
    return (req: Request, res: Response, next: any) => {
        res.setHeader('X-Frame-Options', 'SAMEORIGIN')
        next()
    }
}

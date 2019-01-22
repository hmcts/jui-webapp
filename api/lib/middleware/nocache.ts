import {Request, Response} from 'express'

export function nocache() {
    return (req: Request, res: Response, next: any) => {
        res.setHeader('Surrogate-Control', 'no-store')
        res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
        res.setHeader('Pragma', 'no-cache')
        res.setHeader('Expires', '0')
        next()
    }
}

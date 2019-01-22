import {Request, Response} from 'express'

export function frameguard( directive: string ) {
    return (req: Request, res: Response, next: any) => {
        res.setHeader('X-Frame-Options', directive)
        next()
    }
}

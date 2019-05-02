import { NextFunction, Request, Response } from 'express'

export function accessControlAllowOriginHeaders(req: Request, res: Response, next: NextFunction) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    next()
}

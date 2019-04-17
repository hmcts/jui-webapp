import { Response } from 'express'
const that = this

export function nocache(res: Response) {
    res.setHeader('Surrogate-Control', 'no-store')
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
    res.setHeader('Pragma', 'no-cache')
    res.setHeader('Expires', '0')
}

export function hidePoweredBy(res: Response) {
    res.app.disable('x-powered-by')
    res.removeHeader('Server')
}

export function frameguard(res: Response) {
    res.setHeader('X-Frame-Options', 'SAMEORIGIN')
}

export function securityHeaders(req: Request, res: Response, next: any) {
    that.frameguard(res)
    that.nocache(res)
    that.hidePoweredBy(res)
    next()
}

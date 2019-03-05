import { Request, Response } from 'express'

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
    frameguard(res)
    nocache(res)
    hidePoweredBy(res)
    next()
}

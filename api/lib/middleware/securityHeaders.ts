import * as headerHelpers from '../utilities/headerHelpers'

export function securityHeaders(req: Request, res: Response, next: any) {
    headerHelpers.frameguard(res)
    headerHelpers.nocache(res)
    headerHelpers.hidePoweredBy(res)
    next()
}

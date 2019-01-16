import * as express from 'express'
import * as helmet from 'helmet'

export interface SecurityDirectives {
    fontSrc: string[]
    scriptSrc: string[]
    connectSrc: string[]
    mediaSrc: string[]
    frameSrc: string[]
    imgSrc: string[]
}

export interface SecurityConfig {
    referrerPolicy: string
    directives: SecurityDirectives
}

export function appHelmet(config: SecurityConfig) {
    return (req: express.Request, res: express.Response, next: any) => {
        req.app.use(helmet())
        req.app.use(helmet.contentSecurityPolicy({ directives: config.directives }))
        req.app.use(helmet.referrerPolicy({ policy: config.referrerPolicy }))
        next()
    }
}

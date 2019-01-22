import { frameguard, hidePoweredBy, nocache } from './index'

export function securityHeaders(app) {
    app.use(frameguard())
    app.use(nocache())
    app.use(hidePoweredBy())
}

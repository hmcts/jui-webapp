class Store {
    constructor(req) {
        this.session = req.session
    }

    set(key, value) {
        this.session[key] = value
    }

    get(key) {
        return this.session[key]
    }
}

module.exports = Store

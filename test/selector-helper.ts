const config = {
    lookups: {}
};

export class Selector {
    static selector(selector) {
        if (selector.search(/\s/ig) !== -1) {
            throw new Error('selector cannot contain spaces');
        }
        return selector.split('|')
            .map(level => level.split('.')
                .map(part => Selector.processRecursive(part) || `[data-selector~="${part}"]`)
                .join(''))
            .join(' ');
    }

    private static processRecursive(part) {
        if (part in config.lookups) {
            if (config.lookups[part].indexOf('|') === -1) {
                return config.lookups[part];
            } else {
                return Selector.selector(config.lookups[part]);
            }
        }
    }
}

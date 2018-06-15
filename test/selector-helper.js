const config = {
    lookups: {}
};

function processRecursive(part) {
    if (part in config.lookups) {
        if (config.lookups[part].indexOf('|') === -1) {
            return config.lookups[part];
        } else {
            return processSelector(config.lookups[part]);
        }
    }
}

function processSelector(selector) {
    if (selector.search(/\s/ig) !== -1) {
        throw new Error('selector cannot contain spaces');
    }
    return selector.split('|')
        .map(level => level.split('.')
            .map(part => processRecursive(part) || `[data-selector~="${part}"]`)
            .join(''))
        .join(' ');
}

module.exports = processSelector;

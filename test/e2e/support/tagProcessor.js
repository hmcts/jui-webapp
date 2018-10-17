module.exports = function(config, argv) {
<<<<<<< HEAD
    let tags = '@dashboard';
=======
    let tags = '@summary';
>>>>>>> master
    if (config.defaultTags) {
        tags = config.defaultTags.join(' and ');
    }

    if (argv.tags) {
        if (tags) tags += ' and ';
        tags += argv.tags;
    }

    console.log('Applying tag expression: ', tags);
    return tags;
};

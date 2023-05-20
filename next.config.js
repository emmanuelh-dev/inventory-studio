const path = require('path');
module.exports = {
    webpack: (config) => {
        config.resolve.alias['@'] = path.resolve(__dirname);
        config.resolve.alias['@hocs'] = path.resolve(__dirname, 'src/hocs');
        config.resolve.alias['@utils'] = path.resolve(__dirname, 'src/utils');
        config.resolve.alias['@hooks'] = path.resolve(__dirname, 'src/hooks');
        config.resolve.alias['@messages'] = path.resolve(__dirname, 'src/messages');
        config.resolve.alias['@services'] = path.resolve(__dirname, 'src/services');
        config.resolve.alias['@constants'] = path.resolve(__dirname, 'src/constants');
        config.resolve.alias['@components'] = path.resolve(__dirname, 'src/components');

        config.watchOptions = {
            poll: 1000, // Check for changes every second
            aggregateTimeout: 300, // delay before rebuilding
        };
        return config;
    },
};

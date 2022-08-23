const path = require('path');
module.exports = {
    webpack: (config) => {
      config.resolve.alias['@'] = path.resolve(__dirname);
      config.resolve.alias['@components'] = path.resolve(__dirname, 'src/components');
      return config;
    }
};
'use strict';

const path = require('path');

module.exports = appInfo => {
  const config = {};
  config.customLogger = {
    stickyLogger: {
      file: path.join(appInfo.root, 'logs/middleware/sticky.log'),
      consoleLevel: 'NONE',
    },
  };
  return config;
};

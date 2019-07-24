'use strict';

const awaitEvent = require('await-event');

exports.requestStickyWorkerPort = async function(app) {
  app.messenger.send({
    action: 'requestStickyWorkerPort',
    to: 'agent',
    data: {
      pid: process.pid,
    },
  });
  const { port } = await awaitEvent('responseStickyWorkerPort');
  return port;
};

exports.returnStickyWorkerPort = function(app) {
  app.messenger.send({
    action: 'returnStickyWorkerPort',
    to: 'agent',
    data: {
      pid: process.pid,
    },
  });
};

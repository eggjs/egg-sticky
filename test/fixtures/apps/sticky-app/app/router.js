'use strict';

module.exports = app => {
  app.get('/', ctx => {
    const { port } = ctx.app.server.address();
    ctx.body = {
      port,
      pid: process.pid,
    };
  });
};

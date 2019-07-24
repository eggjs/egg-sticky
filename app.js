'use strict';

const PortManager = require('./lib');

class AppHook {
  constructor(app) {
    this.app = app;
  }

  configDidLoad() {
    const startPort = this.app.config.cluster.listen.port;
    const endPort = startPort + this.app.options.workers - 1;
    this.portManager = new PortManager({
      startPort,
      endPort,
      logger: this.app.getLogger('stickyLogger'),
    });
  }

  async didLoad() {
    const port = await this.portManager.getPort();
    this.app.config.cluster.listen.port = port;
  }

  async beforeClose() {
    await this.portManager.returnPort();
  }
}

module.exports = AppHook;

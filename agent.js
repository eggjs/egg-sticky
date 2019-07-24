'use strict';

const PortManager = require('./lib');

class AgentHook {
  constructor(agent) {
    this.agent = agent;
  }

  configDidLoad() {
    const startPort = this.agent.config.cluster.listen.port;
    const endPort = startPort + this.agent.options.workers - 1;
    this.portManager = new PortManager({
      startPort,
      endPort,
      logger: this.agent.getLogger('stickyLogger'),
    });
  }
}

module.exports = AgentHook;

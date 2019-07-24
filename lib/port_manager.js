'use strict';

const assert = require('assert');
const Base = require('sdk-base');

class PortManager extends Base {
  /**
   * @class
   * @param {object} options -
   * @param {number} options.startPort -
   * @param {number} options.endPort -
   * @param {Logger} options.logger -
   */
  constructor(options) {
    assert(Number.isInteger(options.startPort), 'startPort should be integer');
    assert(Number.isInteger(options.endPort), 'endPort should be integer');
    assert(options.logger, 'logger is required');
    super(Object.assign({}, options));
    /** @type {Map<number, number|null>} <port, worker pid> */
    this.ports = new Map();
    for (let port = options.startPort; port <= options.endPort; port++) {
      this._addPort(port);
    }
    this.ready(true);
  }

  async getPort(pid) {
    assert(Number.isInteger(pid), `invalidate pid ${pid}`);
    for (const [ port, tempPid ] of this.ports) {
      if (!tempPid) {
        this._markPort(port, pid);
        this.logger.info(`[sticky/agent] get port: ${port} for pid: ${pid}`);
        return port;
      }
    }
    this.logger.info(`[sticky/agent] get port for pid: ${pid} failed: no free port`);
    throw new Error('no free port');
  }

  async returnPort(pid) {
    assert(Number.isInteger(pid), `invalidate pid ${pid}`);
    for (const [ port, tempPid ] of this.ports) {
      if (tempPid === pid) {
        this.logger.info(`[sticky/agent] return port: ${port} for pid: ${pid}`);
        this._unmarkPort(port);
        return port;
      }
    }
    this.logger.info(`[sticky/agent] return port for pid: ${pid}, pid not exists`);
    return null;
  }

  get logger() {
    return this.options.logger;
  }

  _addPort(port) {
    this.ports.set(port, null);
  }

  _markPort(port, pid) {
    assert(this.ports.has(port), `port ${port} not find, should not mark`);
    this.ports.set(port, pid);
  }

  _unmarkPort(port) {
    assert(this.ports.has(port), `port ${port} not find, should not unmark`);
    this.ports.set(port, null);
  }
}

module.exports = PortManager;

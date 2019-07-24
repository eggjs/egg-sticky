'use strict';

const assert = require('assert');
const { APIClientBase } = require('cluster-client');
const DataClient = require('./port_manager');

class ApiClient extends APIClientBase {
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
    this.ready(true);
  }

  get DataClient() {
    return DataClient;
  }

  get delegates() {
    return {
      getPort: 'invoke',
      returnPort: 'invoke',
    };
  }

  async getPort() {
    const pid = process.pid;
    let port;
    try {
      port = await this._client.getPort(pid);
    } catch (e) {
      e.message = `[sticky/app] get port for pid: ${pid} failed: ${e.message}`;
      this.logger.error(e);
      return;
    }
    this.logger.info('[sticky/app] get port %s for pid: %s', port, pid);
    return port;
  }

  async returnPort() {
    const pid = process.pid;
    let port;
    try {
      port = await this._client.returnPort(pid);
    } catch (e) {
      e.message = `[sticky/app] return pid: ${pid} port failed: ${e.message}`;
      this.logger.error(e);
      return;
    }
    this.logger.info('[sticky/app] return port %s for pid: %s', port, pid);
  }

  get logger() {
    return this.options.logger;
  }
}

module.exports = ApiClient;

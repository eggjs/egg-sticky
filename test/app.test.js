'use strict';

const assert = require('assert');
const mock = require('egg-mock');
const httpclient = require('urllib');

describe('test/app.test.js', () => {
  let cluster;

  before(async () => {
    cluster = mock.cluster({
      baseDir: 'apps/sticky-app',
      workers: 4,
      nginxSticky: true,
    });
    cluster.debug();

    await cluster.ready();
  });

  after(async () => {
    await cluster.close();
  });

  it('should work', async () => {
    const urls = [
      'http://127.0.0.1:7001',
      'http://127.0.0.1:7002',
      'http://127.0.0.1:7003',
      'http://127.0.0.1:7004',
    ];
    const res = await Promise.all(urls.map(t =>
      httpclient.request(t, {
        dataType: 'json',
      })
    ));
    const pids = new Set();
    for (let i = 0; i < 4; i++) {
      assert(res[i].data.port === 7001 + i);
      pids.add(res[i].data.pid);
    }
    assert(pids.size === 4);
  });
});

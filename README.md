# egg-sticky

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![David deps][david-image]][david-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/egg-sticky.svg?style=flat-square
[npm-url]: https://npmjs.org/package/egg-sticky
[travis-image]: https://img.shields.io/travis/node-modules/egg-sticky.svg?style=flat-square
[travis-url]: https://travis-ci.org/node-modules/egg-sticky
[codecov-image]: https://codecov.io/gh/node-modules/egg-sticky/branch/master/graph/badge.svg
[codecov-url]: https://codecov.io/gh/node-modules/egg-sticky
[david-image]: https://img.shields.io/david/node-modules/egg-sticky.svg?style=flat-square
[david-url]: https://david-dm.org/node-modules/egg-sticky
[snyk-image]: https://snyk.io/test/npm/egg-sticky/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/npm/egg-sticky
[download-image]: https://img.shields.io/npm/dm/egg-sticky.svg?style=flat-square
[download-url]: https://npmjs.org/package/egg-sticky

`egg-sticky` should be used with lb which has sticky function like nginx, this plugin make worker listen different port.
If `config.cluster.listen.port` is `7001` and have 4 workers, will listen [7001, 7002, 7003, 7004].

## usage

```js
// plugin.js
exports.sticky = {
  enable: true,
  package: 'egg-sticky',
};

// package.json
{
  "scripts": {
    "start": "egg-scripts start --nginx-sticky"
  }
}
```

```
// nginx conf
upstream backend {
    server 127.0.0.1:7001;
    server 127.0.0.1:7002;
    server 127.0.0.1:7003;
    server 127.0.0.1:7004;

    sticky cookie srv_id expires=1h domain=.example.com path=/;
}
```

## License

[MIT](LICENSE)

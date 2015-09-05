# raop-mdns-server

A RAOP mDNS broadcast server.

This module is not a RAOP server in it self, but mearly broadcasting its
address (the mac/ip of the machine running this Node module) using
multicast DNS.

[![Build status](https://travis-ci.org/watson/raop-mdns-server.svg?branch=master)](https://travis-ci.org/watson/raop-mdns-server)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

## Installation

```
npm install raop-mdns-server
```

## Usage

```js
var mdns = require('raop-mdns-server')

var opts = {
  name: 'My RAOP Server',
  version: '1.0.0',
  port: 5000
}

mdns(opts, function (err) {
  if (err) throw err
  console.log('RAOP server is being advertised')
})
```

## License

MIT

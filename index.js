'use strict'

var mdns = require('mdns')
var getmac = require('getmac')
var pkg = require('./package')
var debug = require('debug')(pkg.name)

// required options:
// - name
// - port
//
// optional options:
// - txt
// - mac
module.exports = function (opts, cb) {
  if (opts.mac) {
    broadcast(opts.mac)
  } else {
    getMac(function (err, mac) {
      if (err) return cb(err)
      broadcast(mac)
    })
  }

  function broadcast (mac) {
    var fullName = mac.toUpperCase().replace(/:/g, '') + '@' + opts.name
    var txt = opts.txt || generateTxt(mac)
    debug('Advertising RAOP server on port %d', opts.port, fullName, txt)

    mdns
      .createAdvertisement(mdns.tcp('raop'), opts.port, { name: fullName, txtRecord: txt })
      .start()

    process.nextTick(function () {
      cb(null, txt)
    })
  }

  function generateTxt (mac) {
    return {
      txtvers: '1',     // TXT record version 1
      ch: '2',          // audio channels: stereo
      cn: '0,1,2,3',    // audio codecs
      da: 'true',
      et: '0,3,5',      // supported encryption types
      md: '0,1,2',      // supported metadata types
      pw: 'false',      // does the speaker require a password?
      sv: 'false',
      sr: '44100',      // audio sample rate: 44100 Hz
      ss: '16',         // audio sample size: 16-bit
      tp: 'UDP',        // supported transport: TCP or UDP
      vs: '130.14',     // server version
      am: 'AppleTV2,1', // device model
      sf: '0x4'
    }
  }
}

function getMac (cb) {
  // TODO: This doesn't necessarily find the MAC address associated with the
  // interface that the server is broadcasting on
  debug('Getting server MAC address')
  getmac.getMac(function (err, mac) {
    if (err) return cb(err)
    debug('Found MAC address', mac)
    cb(null, mac)
  })
}

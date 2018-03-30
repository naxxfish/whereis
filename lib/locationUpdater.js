const mqtt = require('mqtt')
const EventEmitter = require('events').EventEmitter
const debug = require('debug')('locationUpdater')

class LocationUpdater extends EventEmitter {
  constructor (config) {
    debug('constructor')
    super()
    this._location = null
    this._public = false
    const client = mqtt.connect(config.mqtt.uri, {
      username: config.mqtt.username,
      password: config.mqtt.password
    })

    client.on('connect', () => {
      this.emit('connected')
      client.subscribe(config.mqtt.topic)
    })

    client.on('message', (topic, message) => {
      debug('topic: %s message: %s', topic, message.toString('utf-8'))
      switch (topic) {
        case config.mqtt.topic:
          this._processOwntracksMessage(message)
          break
        default:
          break
      }
    })
  }
  getLocation () {
    debug('getLocation')
    if (this._public && this._location) {
      debug('location is public, returning it')
      return this._location
    } else {
      debug('location is private, not returning it')
      return null
    }
  }
  _processLocation (location) {
    debug('_processLocation')
    if (location._cp !== undefined && location._cp === true) {
      debug('incoming public location')
      this._public = true
      this._location = location
      this.emit('location', location)
    } else {
      debug('incoming private location')
      this._public = false
      this.emit('location', null)
    }
  }
  _processOwntracksMessage (rawMessage) {
    debug('_processOwntracksMessage', rawMessage)
    var message = JSON.parse(rawMessage.toString('utf-8'))
    switch (message._type) {
      case 'location':
        this._processLocation(message)
        break
      default:
        this.emit('warning', 'unprocessed message ' + rawMessage.toString('utf-8'))
    }
  }
}

module.exports = LocationUpdater

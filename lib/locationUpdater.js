const mqtt = require('mqtt')
const EventEmitter = require('events').EventEmitter
const debug = require('debug')('locationUpdater')
const assert = require('chai').assert

class LocationUpdater extends EventEmitter {
  constructor (config) {
    debug('constructor')
    super()
    this._location = null
    this._public = false
    this._client = null
    this._config = config
    assert.exists( config.mqtt )
    assert.exists( config.mqtt.username )
    assert.exists( config.mqtt.password )
    assert.exists( config.mqtt.uri )
  }

  connect() {
    try {
      this._client = mqtt.connect(this._config.mqtt.uri, {
        username: this._config.mqtt.username,
        password: this._config.mqtt.password
      })
    } catch (e)
    {
      throw new Error("Can't connect to MQTT broker " + e)
    }
    if (this._client !== undefined)
    {
      this._client.on('connect', () => {
        this.emit('connected')
        client.subscribe(config.mqtt.topic)
      })

      this._client.on('message', (topic, message) => {
        debug('topic: %s message: %s', topic, message.toString('utf-8'))
        switch (topic) {
          case this._config.mqtt.topic:
            this._processOwntracksMessage(message)
            break
          default:
            break
        }
      })
    }
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

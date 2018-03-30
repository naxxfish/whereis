const LocationUpdater = require('../lib/locationUpdater')
const mqtt = require('mqtt')
const sinon = require('sinon')
const chai = require('chai')

describe('locationUpdater', () => {
  describe('connect', () => {
    it('should try to connect to mqtt broker', () => {
      var mock = sinon.mock(mqtt)
      var expectation = mock.expects('connect')
      var updater = new LocationUpdater({
        mqtt: {
          uri: 'mqtt://localhost:8883',
          username: '123',
          password: '123'
        }
      })
      updater.connect()
      mock.verify()
    })
    it('should fail to be created if any arguments are missing', () => {
      chai.expect(() => {
        var updater = new LocationUpdater({
          mqtt: { }
        })
      }).to.throw()
    })
  })
})

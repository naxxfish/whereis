# whereis ?
[![Build Status](https://travis-ci.org/naxxfish/whereis.svg?branch=master)](https://travis-ci.org/naxxfish/whereis)

Sometimes, you just want some people to know where you are ...

## What does it do?
If you have [ownTracks](http://owntracks.org/) set up on your phone, connected to a MQTT broker - this application will display a web page which, when you have the [copy option](http://owntracks.org/booklet/features/copy/) turned on, it will display a google map showing your location.  When copy mode is turned off, it will show something else.  

## Configuration

Before running, you'll need to create a `config.json` file in the `config/` directory, use example-config.json as a starting point.  

Here is a description of the options.

### mqtt
* `uri` - a [mqtt uri](https://github.com/mqtt/mqtt.github.io/wiki/URI-Scheme)
* `username` and `password` - the username and password to use to connect to the broker'
* `topic` - the topic to subscribe to for updates, this is usually `owntracks/<username>/<device ID>` as configured in owntracks.

### google
* `maps_api_key` - your [Google Maps API key](https://developers.google.com/maps/documentation/javascript/get-api-key)

## License

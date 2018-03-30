const config = require('./config/config.json')
const LocationUpdater = require('./lib/locationUpdater')
const path = require('path')
const express = require('express')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const compression = require('compression')
const bunyan = require('bunyan')
const bunyanMiddleware = require('bunyan-middleware')
const bunyanPretty = require('bunyan-pretty')
var logger = bunyan.createLogger(
  { name: 'whereis',
    stream: process.stdout.isTTY ? bunyanPretty() : process.stdout,
    level: 'info' })

app.use(bunyanMiddleware(
  { headerName: 'X-Request-Id',
    propertyName: 'reqId',
    logName: 'req_id',
    logger: logger
  }
))

app.use(compression())
app.set('view engine', 'pug')

app.get('/css/normalize.css', (req, res) => {
  res.sendFile('normalize.css', {
    root: path.join(__dirname, '/node_modules/normalize.css'),
    dotfiles: 'deny'
  })
})
app.get('/', (req, res) => {
  res.render('index', config)
})

app.use('/', express.static(path.join(__dirname, 'public')))

let locationUpdater = new LocationUpdater(config)
locationUpdater.on('location', (location) => {
  console.log(location)
})

io.on('connection', (socket) => {
  socket.emit('location', locationUpdater.getLocation())
  locationUpdater.on('location', (location) => {
    socket.emit('location', location)
  })
})

app.get('/api/location', (req, res) => {
  res.json(locationUpdater.getLocation())
})

server.listen(3000, () => {
  console.log('listening on port 3000')
})

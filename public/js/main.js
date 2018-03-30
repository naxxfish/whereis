$(document).ready(function () {
  console.log('setting up sockets')
  var socket = io()
  socket.on('location', processLocation)
  console.log('sockets set up')
  setupTerminal()
})

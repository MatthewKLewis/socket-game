//// Imports ////
const express = require("express");
const http = require("http")
const socketio = require("socket.io");
const router = require('./router')
const cors = require('cors')

//// Settings ////
PORT = process.env.PORT || 4000;
const app = express()
const server = http.createServer(app)
const io = socketio(server, {cors: {origin: '*'}})

app.use(router);
app.use(cors);

//temporary store of player positions
let positions = [];

//// All code having to do with this socket's connection:
io.on('connection', (socket) => {
  console.log('A Player has connected')

  //Join:
  socket.on('join', ({name, room}) => {
    console.log(`${name} connecting to ${room}...`)
    socket.join(room)
  });

  //Players Setting Positions:
  socket.on('setPosition', (movement)=> {
      // When any player setPosition, the server responds with all player positions.
      positions = {name: movement.name, x: movement.x, y: movement.y, facing: movement.facing}      
      socket.broadcast.emit('respondAllPositions', positions)
  });

  //Players doing something else:
  socket.on('doSomethingElse', (data) => {
    console.log(data)
  });

  // Disconnect:
  socket.on('disconnect', ()=> {
    console.log('a client disconnected.')
    socket.broadcast.emit('playerDisconnect')
  })
})

server.listen(PORT, ()=> {
  console.log("Server has Started on: " + PORT)
})

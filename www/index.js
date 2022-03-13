var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

server.listen(3000);

app.get('/', function(request, respons) {
    respons.sendFile(__dirname + '/index.html');
});

users = [];
connections = [];

io.sockets.on('connection', function(socket) {
    console.log("в сети")
    connections.push(socket);

    socket.on('dissconect', function(data) {
        connections.splice(connections.indexOf(socket), 1);
        console.log("вне сети ")


    });
    socket.on('send mess', function(data) {
        io.sockets.emit('add mess', { msg: data });
    });
});
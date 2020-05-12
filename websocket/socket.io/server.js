var express = require('express')
var app = express()
var server = require('http').Server(app)
var ws = require('socket.io')(server)
//将socket 服务器与express，进行结合

// app.use(express.static(__dirname + '/client'))

ws.on('connection', client => {
    client.emit('skio', 'hello Word skio')
    client.on('clientSays', msg => {
        console.log('client--', msg)
    })
})


server.listen(8081, '0.0.0.0')  //允许所有ID访问
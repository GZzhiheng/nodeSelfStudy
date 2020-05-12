const WebSocket = require('ws')
const ws = new WebSocket.Server({port: 8080}, () => {
  console.log('socket start')
})
let clients = []
let number = 0
ws.on('connection', client => {
  number += 1
  clients.push(client)
  client.send('欢迎光临--' + number) // 数据传输字符串
  client.on('message', msg => {
    console.log('来自前端的数据：', msg)
    if (msg === "广播") {
      sendAll(msg + '---来自前端')
    }
  })
  client.on('close', () => {
    console.log('前端主动断开连接')
  })
})

function sendAll(msg) {
  for (let i = 0; i < clients.length; i++) {
    clients[i].send(msg)
  }
}
const express = require('express')
const app = express()

app.get('/user/add', (req, res) => {
  res.send('user/add')
})

app.get('/user/del', (req, res) => {
  res.send('user/del')
})

app.listen(3000, () => {
  console.log('server start')
})
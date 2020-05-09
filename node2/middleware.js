const express = require('express')
const app = express()


app.get('/test1', (req, res, next) => {
  console.log('text1')
  next()

},
(req, res) => {
  console.log('cb2')
  res.send('cb2')
})

app.listen(3000, () => {
  console.log('server start')
})
const express = require('express')
const app = express()
const path = require('path')
console.log(__dirname)
console.log(path.join(__dirname))

app.use(express.static(path.join(__dirname, './static')))
// app.use('/', express.static(path.join(__dirname, './static')))
// app.use('/public', express.static(path.join(__dirname, './static')))


app.listen(3000, () => {
  console.log('server start')
})
const express = require('express')
const db = require('./db/connect')
const app = express()
const path = require('path')
const bodyparser = require('body-parser')

// cors解决跨域问题
const cors = require('cors')
app.use(cors())

app.use(bodyparser.urlencoded({extended: false}))
app.use(bodyparser.json())
app.use('/public', express.static(path.join(__dirname, './static')))
app.use('/public/html/static', express.static(path.join(__dirname, './static/static')))
app.use('/public/html/lib', express.static(path.join(__dirname, './static/lib')))

// 路由
const userRouter = require('./router/userRouter')
const foodRouter = require('./router/foodRouter')
const fileRouter = require('./router/fileRouter')

app.use('/user', userRouter)
app.use('/food', foodRouter)
app.use('/file', fileRouter)

app.listen(3000, () => {
  console.log('server start')
  console.log('http://localhost:3000/public/html/index.html')
})
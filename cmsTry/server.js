const express = require('express')
const db = require('./db/connect')
const app = express()
const path = require('path')
const bodyparser = require('body-parser')
const cookieparser = require('cookie-parser')
const session = require('express-session')

// cors解决跨域问题
const cors = require('cors')
app.use(cors())

app.use(bodyparser.urlencoded({extended: false}))
app.use(bodyparser.json())
app.use('/public', express.static(path.join(__dirname, './static')))
app.use('/public/html/static', express.static(path.join(__dirname, './static/static')))
app.use('/public/html/lib', express.static(path.join(__dirname, './static/lib')))

// 设置session cookie
app.use(cookieparser())
app.use(session({
  secret: 'aabbc',  //  为了安全性，设置session，密钥
  cookie: {maxAge: 60 * 1000, secure: true}, //  有效时间
  resave: true, // 默认true，没有修改，也设置session的值
  saveUninitialized: false  //无论有没有session、cookie，每个请求都设置session、cookie，默认给标识connect.sid
}))

// 路由
const userRouter = require('./router/userRouter')
const foodRouter = require('./router/foodRouter')
const fileRouter = require('./router/fileRouter')

app.use('/user', userRouter)
// food添加session
app.use('/food', (req, res, next) => {
  console.log(req.body)
  console.log(req.session)
  if (req.session.login) {
    next()
  } else {
    res.send({code: -999, msg: '请先登陆'})
  }
}, foodRouter)
// app.use('/food', foodRouter)
app.use('/file', fileRouter)

app.listen(3000, () => {
  console.log('server start')
  console.log('http://localhost:3000/public/html/index.html')
})
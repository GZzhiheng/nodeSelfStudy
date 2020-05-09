const express = require('express')
const app = express()
const userRouter = require('./router/userRouter')
const foodRouter = require('./router/foodRouter')


app.use('/user', userRouter)
app.use('/food', foodRouter)
app.listen(3000, () => {
  console.log('server start')
})
const express = require('express')
const router = express.Router()

// invoked for any requests passed to this router
router.use(function (req, res, next) {
  // .. some logic here .. like any other middleware
  console.log('inUserRouter')
  next()
})

// will handle any request that ends in /events
// depends on where the router is "use()'d"
router.get('/add', function (req, res, next) {
  console.log('userAdd')
  res.send('userAdd')
})
router.get('/del', function (req, res, next) {
  console.log('userDel')
  res.send('userDel')
})

module.exports = router
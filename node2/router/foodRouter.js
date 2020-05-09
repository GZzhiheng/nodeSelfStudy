const express = require('express')
const router = express.Router()

// invoked for any requests passed to this router
router.use(function (req, res, next) {
  // .. some logic here .. like any other middleware
  console.log('inFoodRouter')
  next()
})

// will handle any request that ends in /events
// depends on where the router is "use()'d"
router.get('/add', function (req, res, next) {
  console.log('foodAdd')
  res.send('foodAdd')
})
router.get('/del', function (req, res, next) {
  console.log('foodDel')
  res.send('foodDel')
})

module.exports = router
const fs = require('fs')
fs.rename('./test', './test01', err => {
  console.log(err)
})

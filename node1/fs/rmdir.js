const fs = require('fs')

fs.rmdir('./test01', err => {
  console.log(err)
})

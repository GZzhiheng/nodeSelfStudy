const fs = require('fs')

fs.mkdir('./test', (err, data) => {
  if(err) {
    console.log(err)
  } else {
    console.log(data)
  }
})
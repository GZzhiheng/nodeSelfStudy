const fs = require('fs')

// let dirSync = fs.readdirSync('./node1')
// console.log(dirSync)

fs.readdir('./node1', (err, res) => {
  console.log(err)
  console.log(res)
})

// c(create)u(updata)r(read)d(delete)
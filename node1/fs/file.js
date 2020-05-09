const fs = require('fs')

// 创建文件 覆盖写入
// fs.writeFile('name.txt', '创建text文件', err => {
//   console.log(err)
// })

// 添加文件内容
// fs.appendFile('name.txt', '添加文件内容', err => {
//   console.log(err)
// })

// 读取文件信息
// fs.readFile('name.txt', 'utf8', (err, msg) => {
//   console.log(err)
//   console.log(msg)
//   // console.log(msg.toString('utf8'))
// })

//删除文件
fs.unlink('name.txt', err => {
  console.log(err)
})

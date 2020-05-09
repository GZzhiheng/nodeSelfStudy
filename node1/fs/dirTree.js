const fs = require('fs')

// fs.readdir('../../node1', (err, dirs) => {
//   if (err) {
//     console.log('读取文件失败')
//   } else {
//     console.log(dirs)
//   }
// })

// class:stats  doc里面，有类的更多方法
fs.stat('../../node1', (err, stats) => {
  if(err) return console.log('读取文件失败')
  console.log(stats)
  if(stats.isFile) {
    console.log('is file')
  } else {
    console.log('is dir')
  }
})

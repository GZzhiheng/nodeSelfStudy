const express = require('express')
const router = express.Router()
const multer = require('multer')

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './static/uploads')
  },
  filename: function (req, file, cb) {
    console.log('req---', req)
    console.log('file---', file)
    let fileName = file.originalname.split('.')
    let randomName = `${new Date().getTime()}.${fileName[fileName.length - 1]}`
    // cb(null, file.originalname) //  原始名字
    cb(null, randomName) //  随机名字
  }
})
 
var upload = multer({ storage: storage })
// 多图上传 upload.array(imgs, 2) 数字表示接受多少张图片
router.post('/upload', upload.single('imgs'),(req, res) => {
  // imgs 要上传的图片数据key值 必须与前端保持统一
  let {size, mimetype, path} = req.file
  let type = ['jpg', 'jpeg', 'png', 'gif']  // 允许上传的类型
  let tmpType = mimetype.split('/')[1]
  if (size >= 500*1024) {
    res.send({err: -1, msg: '文件太大'})
  } else if (type.indexOf(tmpType) === -1) {
    res.send({err: -2, msg: '文件类型错误'})
  } else {
    let imgUrl = `/public/uploads/${req.file.filename}`
    res.send({err: 0, msg: '上传成功', data: imgUrl})
  }
  console.log('req.file--', req.file)
})

module.exports = router
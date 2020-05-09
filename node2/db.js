// 链接数据库
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/test',{useNewUrlParser: true, useUnifiedTopology: true})

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('we are connected!')
});

// scheme 对象

// 创建一个scheme集合相关的对象

const Schema = mongoose.Schema

const userSchema = new Schema({
  us: {type: String, required: true},
  ps: {type: String, required: true},
  age: Number,
  sex: {type: Number, default: 0}
})

// 将schema 对象转化为数据模型
const User = mongoose.model('user', userSchema) //该数据对象和集合关联（'集合名', schema对象）
// 操作数据库
// User.insertMany({
//   us: 'wangyi',
//   ps: '123',
//   age: 16
// }).then(res => {
//   console.log(res, '插入成功')
// }).catch(err => {
//   console.log('插入失败')
// })

// 查询
// User.find({})
// .then(res => {
//   console.log(res)
//   console.log('查询成功')
// })
// .catch(err => {
//   console.log('查询出错')
// })
// 删除
User.remove()
.then(res => {
  console.log(res)
  console.log('删除成功')
})
.catch(err => {
  console.log('删除出错')
})

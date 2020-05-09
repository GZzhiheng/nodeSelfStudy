const express = require('express')
const router = express.Router()
const User = require('../db/model/userModel')
const Mail = require('../util/mail')

const codes = {}

// invoked for any requests passed to this router
// router.use(function (req, res, next) {
//   // .. some logic here .. like any other middleware
//   console.log('inUserRouter')
//   next()
// })

// will handle any request that ends in /events
// depends on where the router is "use()'d"
/**
 * @api {post} /user/reg 用户注册
 * @apiName reg
 * @apiGroup User
 *
 * @apiParam {String} us 用户账号.
 * @apiParam {String} ps 用户密码.
 * @apiParam {String} code 验证码.
 *
 * @apiSuccess {String} success 注册成功.
 * @apiSuccess {String} fail 注册失败.
 */
router.post('/reg', function (req, res) {
  // 获取数据
  // 数据处理
  // 返回数据
  let {us, ps, code} = req.body
  console.log(us, ps, code)
  if (us && ps && code) {
    if(codes[us] !== code) {
      return res.send('验证码错误')
    }
    User.find({us}).then(data => {
      if (data.length > 0) {
        res.send('用户已存在')
      } else {
        return User.insertMany({
          us: us,
          ps: ps,
          age: 10
        })
      }
    })
    .then(result => {
      if (result) {
        res.send('注册成功')
      }
    }).catch(err => {
      console.log('注册失败--', err)
      err.send('注册失败')
    })
  } else {
    return res.send('请输入正确的用户名与密码')
  }
})

/**
 * @api {post} /user/login 用户登陆
 * @apiName login
 * @apiGroup User
 *
 * @apiParam {String} us 用户账号.
 * @apiParam {String} ps 用户密码.
 *
 * @apiSuccess {String} success 登陆成功.
 * @apiSuccess {String} fail 登陆失败.
 */

router.post('/login', function (req, res) {
  let {us, ps} = req.body
  if (us && ps) {
    User.find({us, ps})
    .then(result => {
      if(result.length > 0) return res.send('登陆成功')
    }).catch(err => {
      console.log('登陆失败')
      res.send('登陆失败')
    })
  } else {
    return res.send('登陆错误参数错误')
  }
})

/**
 * @api {post} /user/getMailCode 发送邮件验证码
 * @apiName getMailCode
 * @apiGroup User
 *
 * @apiParam {String} us 用户账号.
 * @apiParam {String} ps 用户邮箱.
 *
 * @apiSuccess {String} success 发送成功.
 * @apiSuccess {String} fail 发送失败.
 */

// 发送邮件验证码
router.post('/getMailCode', (req, res) => {
  // console.log('req--', req.body)
  // console.log('res--', res)
  let {sendMail, us} = req.body
  let code = parseInt(Math.random()*10000)
  if (sendMail) {
    Mail.send({mail: sendMail, code: code})
    .then(result => {
      console.log('sendresult--->', result)
      if (result) {
        // TODO 添加时间戳
        codes[us] = String(code)
        res.send(`验证码已发送至${result.accepted[0]}`)
      }
    }).catch(err => {
      console.log('发送失败')
      res.send('发送失败')
    })
  } else {
    res.send('请输入验证邮件号')
  }
})

module.exports = router
// ysmpirmgzjcbdaei
"use strict";
const nodemailer = require("nodemailer");
const sendAccount = {
  user: '1733257324@qq.com',
  pass: 'ysmpirmgzjcbdaei'
}

// create reusable transporter object using the default SMTP transport
const send = ({mail = '', code = ''}) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.qq.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: sendAccount.user, // generated ethereal user
      pass: sendAccount.pass // generated ethereal password
    }
  })
  console.log(mail, code)
  let mailObj = {
    from: '1733257324@qq.com', // sender address
    to: mail, // list of receivers
    subject: "验证码", // Subject line
    text: `验证码：${code}，有效期5分钟`, // plain text body
    // html: "<b>Hello world?</b>" // html body
  }

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailObj, (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}

module.exports = {send}
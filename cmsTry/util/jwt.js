const jwt = require('jsonwebtoken')
const scrict = 'aabbcc'

let payload = {
  us: 123,
  ps: 456
}

function creatToken(payload) {
  // 产生token
  payload.ctime = Date.now()
  payload.exp = 1000*60*60*24 + payload.ctime
  return jwt.sign(payload, scrict)
}

function checkToken(token) {
  return new Promise((resovle, reject) => {
    jwt.verify(token, scrict, (err, data) => {
      console.log('token--', token)
      console.log('scrict--', scrict)
      if(err) {
        console.log(err)
        reject('token 无效')
      } else {
        console.log('checkToken--', data)
        if (data.exp < Date.now()) {
          reject('token已过期')
        } else {
          resovle(data)
        }
      }
    })
  })
}

module.exports = {
  creatToken,
  checkToken
}
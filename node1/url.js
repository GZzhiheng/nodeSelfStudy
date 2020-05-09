const url = require('url')
let urlString ='http://www.baidu.com/a/b?search=1&name=2#123456'

const urlObj = url.parse(urlString)

console.log(urlObj)

const urlObj2 = {
  protocol: 'http:',
  slashes: true,
  auth: null,
  host: 'www.baidu.com',
  port: null,
  hostname: 'www.baidu.com',
  hash: '#123456',
  search: '?search=1&name=2',
  query: 'search=1&name=2',
  pathname: '/a/b',
  path: '/a/b?search=1&name=2',
  href: 'http://www.baidu.com/a/b?search=1&name=2#123456' 
}

const urlString2 =  url.format(urlObj2)
console.log(urlString2)

// 类比json对象
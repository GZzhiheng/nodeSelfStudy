const express = require('express')
const router = express.Router()
const foodModel = require('../db/model/foodModel')

/**
 * @api {post} /food/add 添加菜品
 * @apiName add
 * @apiGroup Food
 *
 * @apiParam {String} name 菜名.
 * @apiParam {String} price 价格.
 * @apiParam {String} dec 描述.
 * @apiParam {String} typename 配别.
 * @apiParam {Number} typeid id.
 * @apiParam {String} img 图片地址.
 *
 * @apiSuccess {String} success 添加成功.
 * @apiSuccess {String} fail 添加失败.
 */
router.post('/add', (req, res) => {
  // let data = {
  //   name: '牛肉',
  //   price: '111',
  //   dec: '好吃',
  //   typename: '肉类',
  //   typeid: 1,
  //   img: '/public/image/slider3.jpg',
  // }
  let {name,price,dec,typename,typeid,img} = req.body
  foodModel.insertMany({name,price,dec,typename,typeid,img})
  .then(() => {
    res.send({code: 1, msg: '添加成功'})
  })
  .catch(err => {
    console.log('err-->', err)
    res.send('添加失败')
  })
})

/**
 * @api {post} /food/getFoodById id查询菜品
 * @apiName getFoodById
 * @apiGroup Food
 *
 * @apiParam {Number} id 菜品id.
 *
 * @apiSuccess {String} success 查询成功.
 * @apiSuccess {String} fail 查询失败.
 */
router.post('/getFoodById', (req, res) => {
  let _id = req.body.id
  foodModel.find({_id})
  .then(data => {
    console.log(data)
    res.send({code: 1, msg: '查询成功', list: data})
  })
  .catch(err => {
    console.log('err-->', err)
    res.send('查询失败')
  })
})

/**
 * @api {post} /food/getFoodByType 查询分类
 * @apiName getFoodByType
 * @apiGroup Food
 *
 * @apiParam {Number} typeid id.
 *
 * @apiSuccess {String} success 查询成功.
 * @apiSuccess {String} fail 查询失败.
 */
router.post('/getFoodByType', (req, res) => {
  let params = req.body.typeid === '0' ? {} : {typeid: req.body.typeid}
  let pageSize = Number(req.body.pageSize) || 3
  let pageNo = Number(req.body.pageNo) || 1
  let count = 0

  foodModel.find(params)
  .then(list => {
    count = list.length
    return foodModel.find(params).limit(pageSize).skip((pageNo-1) * pageSize)
  })
  .then(data => {
    console.log(data)
    let allpage = Math.ceil(count/pageSize)
    // res.send({code: 0, msg: '查询成功', list: data})
    res.send({code: 0, msg: '查询成功', result: {
      list: data,
      count: count,
      pageNo: pageNo,
      allpage: allpage
    }})
  })
  .catch(err => {
    console.log('err-->', err)
    res.send('查询失败')
  })
})


/**
 * @api {post} /food/getFoodByKw 关键字查询
 * @apiName getFoodByKw
 * @apiGroup Food
 *
 * @apiParam {String} kw 关键字.
 *
 * @apiSuccess {String} success 查询成功.
 * @apiSuccess {String} fail 查询失败.
 */
router.post('/getFoodByKw', (req, res) => {
  // $set $gte $or $and $regex
  let {kw} = req.body
  let reg = new RegExp(kw)  // 正则匹配关键字
  // foodModel.find({age: {$gte:16}})
  // foodModel.find({name: {$regex: reg}})
  foodModel.find({$or:[{name: {$regex: reg}}, {dec: {$regex: reg}}]})
  .then(data => {
    res.send({code: 0, msg: '查询成功', result: {
      list: data,
      count: 1,
      pageNo: 1,
      allpage: 1
    }})
  })
  .catch(err => {
    console.log('err-->', err)
    res.send('查询失败')
  })
})

/**
 * @api {post} /food/del 删除商品
 * @apiName del
 * @apiGroup Food
 *
 * @apiParam {String} id 关键字.
 *
 * @apiSuccess {String} success 删除成功.
 * @apiSuccess {String} fail 删除失败.
 */
router.post('/del', (req, res) => {
  // $set $gte $or $and $regex
  let {_id} = req.body
  foodModel.remove({_id})
  .then(data => {
    console.log(data)
    res.send({code: 1, msg: '删除成功'})
  })
  .catch(err => {
    console.log('err-->', err)
    res.send('删除失败')
  })
})

/**
 * @api {post} /food/update 修改商品
 * @apiName update
 * @apiGroup Food
 *
 * @apiParam {String} _id id.
 * @apiParam {String} name 菜名.
 * @apiParam {String} price 价格.
 * @apiParam {String} dec 描述.
 * @apiParam {String} typename 配别.
 * @apiParam {Number} typeid id.
 * @apiParam {String} img 图片地址.
 *
 * @apiSuccess {String} success 修改成功.
 * @apiSuccess {String} fail 修改失败.
 */
router.post('/update', (req, res) => {
  let {_id, name,price,dec,typename,typeid,img} = req.body
  foodModel.update({_id}, {name,price,dec,typename,typeid,img} )
  .then(data => {
    console.log(data)
    res.send({code: 1, msg: '修改成功'})
  })
  .catch(err => {
    console.log('err-->', err)
    res.send('修改失败')
  })
})

/**
 * @api {post} /food/getInfoByPage 页码查询菜品
 * @apiName getInfoByPage
 * @apiGroup Food
 *
 * @apiParam {String} name 菜名.
 * @apiParam {String} typename 配别.
 * @apiParam {Number} typeid id.
 * @apiParam {String} pageSize 一页多少行.
 * @apiParam {String} pageNo 第几页.
 * 
 *
 * @apiSuccess {String} success 查询成功.
 * @apiSuccess {String} fail 查询失败.
 */
router.post('/getInfoByPage', (req, res) => {
  let pageSize = Number(req.body.pageSize) || 3
  let pageNo = Number(req.body.pageNo) || 1
  let count = 0

  foodModel.find()
  .then(list => {
    count = list.length
    return foodModel.find().limit(pageSize).skip((pageNo-1) * pageSize)
  })
  .then(data => {
    console.log(data)
    let allpage = Math.ceil(count/pageSize)
    // res.send({code: 0, msg: '查询成功', list: data})
    res.send({code: 0, msg: '查询成功', result: {
      list: data,
      count: count,
      pageNo: pageNo,
      allpage: allpage
    }})
  })
  .catch(err => {
    console.log('err-->', err)
    res.send('查询失败')
  })
})

module.exports = router
const express = require('express')
const path = require('path')

// 创建路由
const studentManagerRouter = express.Router()

// 引入包
const stuManagerCtrl = require(path.join(__dirname,'../controllers/studentManagerController.js'))
// 首页页面响应
studentManagerRouter.get('/child',stuManagerCtrl.getInfo)



// 暴露出去accountRounter
module.exports = studentManagerRouter
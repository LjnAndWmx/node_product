const express = require('express')
const path = require('path')

// 创建路由
const studentManagerRouter = express.Router()

// 引入包
const stuManagerCtrl = require(path.join(__dirname,'../controllers/studentManagerController.js'))
// 首页页面响应
studentManagerRouter.get('/list',stuManagerCtrl.getStuManagerListPage)

studentManagerRouter.get('/add',stuManagerCtrl.getAddStu)

// 新增学生方法
studentManagerRouter.post('/add',stuManagerCtrl.addStudent)

// 暴露出去accountRounter
module.exports = studentManagerRouter
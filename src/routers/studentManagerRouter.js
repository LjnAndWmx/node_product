const express = require('express')
const path = require('path')

// 创建路由
const studentManagerRouter = express.Router()

// 引入包
const stuManagerCtrl = require(path.join(__dirname,'../controllers/studentManagerController.js'))
// 首页页面响应
studentManagerRouter.get('/list',stuManagerCtrl.getStuManagerListPage)

// 获取页面
studentManagerRouter.get('/add',stuManagerCtrl.getAddStu)

// 新增学生方法
studentManagerRouter.post('/add',stuManagerCtrl.addStudent)


// 编辑学生信息   动态路径参数 ：以冒号开头
studentManagerRouter.get('/edit/:studentId',stuManagerCtrl.editStudent)

// 获取编辑页面
studentManagerRouter.post('/edit/:studentId',stuManagerCtrl.editStudentInfo)

// 删除学生
studentManagerRouter.post('/delete/:studentId',stuManagerCtrl.deleteStudent)

// 暴露出去accountRounter
module.exports = studentManagerRouter
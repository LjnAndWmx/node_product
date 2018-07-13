const express = require('express')
const path = require('path')

// 创建路由
const accountRouter = express.Router()

// 引入包
const accountCtrl = require(path.join(__dirname,'../controllers/accountController.js'))
// 首页页面响应
accountRouter.get('/login',accountCtrl.getlogin)
// 点击登陆功能
accountRouter.post('/login',accountCtrl.login)

// vcode图片验证码
accountRouter.get('/vcode',accountCtrl.getvcode)

// 获取注册页
accountRouter.get('/register',accountCtrl.getRigister)
// 注册页面post请求
accountRouter.post('/register',accountCtrl.rigister)


// 暴露出去accountRounter
module.exports = accountRouter
const express = require('express')
const path = require('path')

// 创建路由
const accountRouter = express.Router()

// 引入包
const accountCtrl = require(path.join(__dirname,'../controllers/accountController.js'))
// 处理浏览器想要的点击登陆页面
accountRouter.get('/login',accountCtrl.getlogin)
// 处理浏览器想要的点击登陆功能
accountRouter.post('/login',accountCtrl.login)

// 处理浏览器想要的图片数字
accountRouter.get('/vcode',accountCtrl.getvcode)

// 处理浏览器想要的点击注册页面
accountRouter.get('/register',accountCtrl.getRigister)

// 处理浏览器想要的点击注册页面post请求
accountRouter.post('/register',accountCtrl.rigister)


// 暴露出去accountRounter
module.exports = accountRouter
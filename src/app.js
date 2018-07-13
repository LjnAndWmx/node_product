// 1.开启express
const express =  require('express')
const path = require('path')
const bodyParser = require('body-parser')
// 引入express-session  第三方包
const session = require('express-session')


// 2.创建app服务器
const app = express()

// 集成中间件
// Use the session middleware
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }}))


// post请求
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

// express 静态资源  解决了静态资源样式css和js请求过来
app.use(express.static(path.join(__dirname,'/statics')))

// 3.集成路由中间键
const accountRouter = require(path.join(__dirname,'./routers/accountRouter.js'))
// 使用路由 登入页面
app.use('/account',accountRouter)
const studentManagerRouter = require(path.join(__dirname,'./routers/studentManagerRouter'))

// 学生列表页面
app.use('/studentManager',studentManagerRouter)

// 4.开启服务
app.listen(3000,'127.0.0.1',err=>{
    if(err){
        console.log(err)
    }
    console.log('start server')
})


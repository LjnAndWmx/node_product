const path = require('path')
const captchapng = require('captchapng')
const databasetool = require(path.join(__dirname,'../tools/databaseTools.js'))

// 0代表成功  1代表验证码有误  2代表用户名或密码错误

// 暴露页面
exports.getlogin = (req, res) => {
    res.sendFile(path.join(__dirname, '../views/login.html'))
}
/**
 * 判断登陆页面是否成功,改动点。登陆成功session保存用户名进行校验是否是管理员
 * @param {*} req 
 * @param {*} res 
 */
exports.login = (req, res) => {
    const result = {
        status: 0,
        message: '登入成功'
    }
       console.log(req.body)
    const {
        username,
        password,
        vcode
    } = req.body
    //    校验验证码
    // console.log(req.session.vcode)
    if (vcode != req.session.vcode) {
        result.status = 1
        result.message = "验证码有误！"
        res.json(result)
        return
    }
    databasetool.findOne('people', {
        username:req.body.username,
        password:req.body.password
    }, (err, doc) => {
        if (doc == null) {
            // 登陆失败
            result.status = 2
            result.message = '用户名或密码有误'
        }else{
            req.session.loginedName = username
            console.log(req.session.loginedName)
        }
        res.json(result)
    })
}
/**
 * 暴露了获取随机验证码
 * @param {*} req 
 * @param {*} res 
 */
exports.getvcode = (req, res) => {
    var code = '0123456789';
    var length = 4;
    var randomcode = '';
    for (var i = 0; i < length; i++) {
        randomcode += code[parseInt(Math.random() * 1000) % code.length];
    }
    // 保存随机生成的图片数字
    req.session.vcode = randomcode
    // 输出图片
    var p = new captchapng(80, 30, parseInt(randomcode)); // width,height,numeric captcha
    p.color(255, 255, 255, 0); // First color: background (red, green, blue, alpha)
    p.color(80, 80, 80, 255); // Second color: paint (red, green, blue, alpha)
    var img = p.getBase64();
    var imgbase64 = new Buffer(img, 'base64');
    res.writeHead(200, {
        'Content-Type': 'image/png'
    });
    res.end(imgbase64);
}
/**
 * 渲染注册页面
 * @param {*} req 
 * @param {*} res 
 */
exports.getRigister = (req, res) => {
    res.sendFile(path.join(__dirname, '../views/register.html'))
}
/**
 * 暴露用户注册的方法
 * @param {*} req 
 * @param {*} res 
 */
exports.rigister = (req, res) => {
    const result = {
        status: 0,
        message: '注册成功'
    }
    // console.log(req.body)
    const {
        username
    } = req.body
    // 链接数据库
    databasetool.findOne(
        username, (err, docs) => {
            if (docs != null) { //表示用户名已存在
                result.status = 1
                result.message = "用户名已存在"
                console.log(err, docs)
                console.log('用户名已存在')
                res.json(result)
            } else {
                databasetool.insertOne('people', req.body, (err, result1) => {
                    // console.log(err, docs)
                    if (result1 == null) {
                        result.status = 2
                        result.message = '注册失败'
                    }
                    res.json(result)
                })
            }
        })
    // })
}
/**
 * 账户推出
 * @param {*} req 
 * @param {*} res 
 */
exports.loginout = (req,res)=>{
    
}
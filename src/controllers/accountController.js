const path = require('path')
const captchapng = require('captchapng')
const MongoClient = require('mongodb').MongoClient

const expressSession = require('express-session')

// 暴露页面
exports.getlogin =(req,res)=>{
   res.sendFile(path.join(__dirname,'../views/login.html'))
}
exports.login = (req,res)=>{
   const result = {status:0,message:'登入成功'}
//    console.log(req.body)
   const {username,password,vcode} = req.body
   res.send(result)
}

exports.getvcode = (req,res)=>{
    var code = '0123456789';
    var length = 4;
    var randomcode = '';
    for (var i = 0; i < length; i++) {
        randomcode += code[parseInt(Math.random() * 1000) % code.length];
    }

     // 输出图片
     var p = new captchapng(80,30,parseInt(randomcode)); // width,height,numeric captcha
    p.color(255, 255, 255, 0);  // First color: background (red, green, blue, alpha)
    p.color(80, 80, 80, 255); // Second color: paint (red, green, blue, alpha)
    var img = p.getBase64();
    var imgbase64 = new Buffer(img,'base64');
    res.writeHead(200, {
        'Content-Type': 'image/png'
    });
    res.end(imgbase64);
}

exports.getRigister = (req,res)=>{
    res.sendFile(path.join(__dirname,'../views/register.html'))
}

exports.rigister=(req,res)=>{
    const result = {status:0,message:'注册成功'}
    console.log(req.body)
    const {username} = req.body
    // 链接数据库

     
// Connection URL
const url = 'mongodb://localhost:27017'
 
// Database Name
const dbName = 'mydatabase'
 
// Use connect method to connect to the server
MongoClient.connect(url, function(err, client) {
  const db = client.db(dbName)
//   链接到那个集合
  const collection = db.collection('persole');

  collection.findOne({username},(err,docs)=>{
    if(docs!=null){//表示用户名已存在
        result.status = 1
        result.message ="用户名已存在"
      console.log(err,docs)
      console.log('用户名已存在')
       client.close()
       res.json(result)
    }else{
        collection.insertOne(req.body,(err,result1)=>{
            console.log(err,docs)
            if(result1==null){
                result1.status = 2
                result1.message = '注册失败'
            }
            client.close()
            res.json(result)
        })
    }
  })
})
}
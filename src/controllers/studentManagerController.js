const path = require('path')
const xtpl = require('xtpl')
const databasetool = require(path.join(__dirname,'../tools/databaseTools.js'))

exports.getStuManagerListPage = (req, res) => {
  // get 请求获取值用 query
  console.log(req.query.keyword)
  const keyword = req.query.keyword||''
  databasetool.findList('studentInfo',{name:{$regex:keyword}},(err, docs) =>{
      // 模板渲染方式
      xtpl.renderFile(path.join(__dirname, '../views/list.html'), {studentList:docs,keyword}, (err, content) => {
        res.send(content)
      })
    })
}
// 获取新增页面
exports.getAddStu=(req,res)=>{
  xtpl.renderFile(path.join(__dirname,'../views/add.html'),{},(err,content)=>{
     res.send(content)
   })
}
// 添加学生
exports.addStudent=(req,res)=>{
   console.log(req.body)
   databasetool.insertOne('studentInfo',req.body,(err,result)=>{
     if(result==null){
       res.send("<script>alert('插入失败')</script>")
     }else{
      res.send("<script>location.href='/studentmanager/list'</script>")
     }
   })
}

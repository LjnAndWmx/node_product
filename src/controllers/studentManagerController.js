const path = require('path')
const xtpl = require('xtpl')
const databasetool = require(path.join(__dirname, '../tools/databaseTools.js'))

exports.getStuManagerListPage = (req, res) => {
  // get 请求获取值用 query   $regex代表模糊查询
  // console.log(req.query.keyword)
  const keyword = req.query.keyword || ''
  databasetool.findList('studentInfo', {
    name: {
      $regex: keyword
    }
  }, (err, docs) => {
    // 模板渲染方式
    xtpl.renderFile(path.join(__dirname, '../views/list.html'), {
      studentList: docs,
      keyword,
      loginedName:req.session.loginedName
    }, (err, content) => {
      res.send(content)
    })
  })
}
// 获取新增页面
exports.getAddStu = (req, res) => {
  xtpl.renderFile(path.join(__dirname, '../views/add.html'), {loginedName:req.session.loginedName}, (err, content) => {
    res.send(content)
  })
}
// 添加学生
exports.addStudent = (req, res) => {
  console.log(req.body)
  databasetool.insertOne('studentInfo', req.body, (err, result) => {
    if (result == null) {
      res.send("<script>alert('插入失败')</script>")
    } else {
      res.send("<script>location.href='/studentmanager/list'</script>")
    }
  })
}

// 获取编辑学生页面
exports.editStudent = (req, res) => {
  const _id = req.params.studentId
  databasetool.findOne('studentInfo', {
    _id
  }, (err, doc) => {
    xtpl.renderFile(path.join(__dirname, '../views/edit.html'), {
      _id: _id,
      loginedName:req.session.loginedName
    }, (err, content) => {
      res.send(content)
    })
  })
}
// 修改学生信息
exports.editStudentInfo = (req, res) => {
  const studentId = databasetool.ObjectId(req.params.studentId)
  console.log(studentId)
}
// 删除学生信息
exports.deleteStudent = (req, res) => {
  const studentId = databasetool.ObjectId(req.params.studentId)
  console.log(studentId)
  databasetool.deleteOne('studentInfo', {
    _id: studentId
  }, (err, content) => {
    if (err) {
      res.send('<script>alert("删除失败")</script>')
    } else {
      res.send('<script>location.href="/studentmanager/list"</script>')
    }
  })

}

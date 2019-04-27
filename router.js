var express = require('express')
var router = express.Router()
var fs = require('fs')
var stu = require('./mongodb')


//渲染学生
router.get('/',function(req, res){
    stu.find(function(err,stus){
        if(err){
            return res.status(500).send('sever err')
        }
        res.render('index.html',{
            students:stus
        })
    })
})

//渲染添加学生页面
router.get('/add',function(req, res){
   res.render('add.html')
})

//添加学生
router.post('/add',function(req, res){
    new stu(req.body).save(function (err) {
        if (err) {
          return res.status(500).send('Server error.')
        }
        res.redirect('/')
      })
})

//渲染修改学生页面
router.get('/update',function(req, res){
    stu.findById(req.query.id.replace(/"/g, ''), function (err, stu) {
        if (err) {
          console.log(err)
          return res.status(500).send('Server error.')
        }
        res.render('updata.html', {
          student: stu
        })
    })
})

//修改学生
router.post('/updata',function(req, res){
    var id = req.body.id.replace(/"/g, '')
    stu.findByIdAndUpdate(id, req.body, function (err) {
      if (err) {
        return res.status(500).send('Server error.')
      }
      res.redirect('/')
    })
})

//删除学生
router.get('/delete',function(req, res){
    var id = req.query.id.replace(/"/g, '')
    stu.findByIdAndRemove(id, function (err) {
      if (err) {
        return res.status(500).send('Server error.')
      }
      res.redirect('/')
    })
})



module.exports = router


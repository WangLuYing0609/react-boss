const express = require('express')
const Router = express.Router()
const untils = require('utility')
const modle = require('./model')
const User = modle.getModel('user')
const Chat = modle.getModel('chat')
const _filter = { pwd: 0, __v: 0 }
Router.get('/list', (req, res) => {
  // User.remove({},()=>{})
  const { type } = req.query
  User.find({ type }, [], function (err, doc) {
    if (err) {
      return console.error(err)
    } else {
      return res.send({ code: 0, data: doc })
    };
  })
})

Router.post('/register', (req, res) => {
  const { user, pwd, type } = req.body
  User.findOne({ user }, (err, doc) => {
    if (doc) {
      return res.json({ code: 1, msg: '用户名重复' })
    }
    const userModel = new User({ user, type, pwd: md5Pwd(pwd) })
    userModel.save((e, d) => {
      if (e) return res.json({ code: 1, msg: '后端报错' })
      res.cookie('userid', d._id)
      return res.json({ code: 0, data: d })
    })
    // User.create({ user, type, pwd: md5Pwd(pwd) }, (e, d) => {

    // })
  })
})


Router.post('/update', (req, res) => {
  const userid = req.cookies.userid
  console.log(req.cookies.userid);
  if (!userid) {
    return res.json({ code: 1 })
  }
  const body = req.body
  User.findByIdAndUpdate(userid, body, (err, doc) => {
    const data = Object.assign({}, {
      user: doc.user,
      type: doc.type
    }, body)
    return res.json({ code: 0, data })
  })
})

Router.get('/getmsgList', (req, res) => {
  const user = req.cookies.userid
  User.find({}, (e, userdoc) => {
    let users = {}
    userdoc.forEach(element => {
      users[element._id] = { name: element.user, avatar: element.avatar }
    });
    Chat.find({ '$or': [{ from: user }, { to: user }] }, (err, doc) => {
      if (!err) {
        return res.json({ code: 0, msgs: doc, users: users })
      }
    })
  })

})

Router.post('/login', (req, res) => {
  const { user, pwd } = req.body
  User.findOne({ user, pwd: md5Pwd(pwd) }, _filter, (err, doc) => {
    if (!doc) {
      return res.json({ code: 1, msg: '用户名或密码错误' })
    }
    res.cookie('userid', doc._id)
    return res.json({ code: 0, data: doc })
  })
})


Router.get('/info', (req, res) => {
  // 判断是否有cooike
  const { userid } = req.cookies
  if (!userid) return res.json({ code: 1 })
  User.findOne({ _id: userid }, _filter, (err, doc) => {
    if (err) return res.json({ code: 1, msg: '后端出错' })
    if (doc) return res.json({ code: 0, data: doc })
  })
})


Router.post('/redmsg', (req, res) => {
  const userid = req.cookies.userid
  const { from } = req.body
  Chat.update(
    { from, to: userid },
    { '$set': { read: true } },
    { multi: true },//多行修改
    (err, doc) => {
      console.log(doc);
      if (!err) {
        return res.json({ code: 0, num: doc.nModified })
      }
      return res.json({ code: 0, text: '修改失败' })
    })

})
function md5Pwd(pwd) {
  const salt = 'imooc-WangLuYing0609~!@'
  return untils.md5(untils.md5(salt + pwd))
}

module.exports = Router
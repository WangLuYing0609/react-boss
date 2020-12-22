const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const modle = require('./model')
const Chat = modle.getModel('chat')

// 新建app
const app = express()

const server = require('http').Server(app)

// const Chat = require('../src/component/chat/chat')

// 解决scoket的跨域问题，添加{ cors: true }
const io = require('socket.io')(server, { cors: true })
io.on('connection', (scoket) => {
  scoket.on('sendmsg', (data) => {
    const { from, to, msg } = data
    const chatid = [from, to].sort().join('_')
    Chat.create({ chatid, from, to, content: msg }, (err, doc) => {
      io.emit('recvmsg', Object.assign({}, doc._doc))
    })
  })
})

const userRouter = require('./user')
app.use(bodyParser.json())
app.use(cookieParser())
app.use('/user', userRouter)
server.listen(9093, function () {
  console.log('Node app start at prot 9093');
})


const mongoose = require('mongoose');
// 链接mongo 使用imooc集合
const DB_URL = 'mongodb://127.0.0.1:27017/imooc-chat'
mongoose.connect(DB_URL)
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.connection.once('open', () => {
  console.log('mongo connect success');
})

const modles = {
  user: {
    'user': { type: String, require: true },
    'pwd': { type: String, require: true },
    'type': { type: String, require: true },
    'avatar': { 'type': String },
    'dec': { 'type': String },
    // 职位名
    'title': { 'type': String },
    //Boss
    'company': { 'type': String },
    'money': { 'type': String }
  },
  chat: {
    'chatid': { 'type': String, require: true },
    'from': { 'type': String, require: true },
    'to': { 'type': String, require: true },
    'read': { 'type': Boolean, default: false },
    'content': { 'type': String, require: true, default: '' },
    'create_time': { 'type': Number, default: new Date().getTime() }
  }
}

for (let m in modles) {
  mongoose.model(m, new mongoose.Schema(modles[m]))
}

module.exports = {
  getModel: function (name) {
    return mongoose.model(name)
  }
}
import React from 'react'
import { List, InputItem, NavBar, Icon } from 'antd-mobile'
import { connect } from 'react-redux'
import { getMsgList, sendMsg, recvMsg } from '../../redux/chat.redux'
import { getChatId } from '../../untils'
@connect(state => state, { getMsgList, sendMsg, recvMsg })

class Chat extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            text: '',
            msg: []
        }
    }
    componentDidMount() {
        if (!this.props.chat.chartmsg.length) {
            this.props.getMsgList()
            this.props.recvMsg()
        }
    }
    handleSubmit() {
        this.setState({ text: '' })
        const from = this.props.user._id
        const to = this.props.match.params.user
        const msg = this.state.text
        this.props.sendMsg(from, to, msg)
    }
    render() {
        const emojiIcon = '😃 🍇 🍉 🍅 🥥 🍉 🍊 🍋 🍌🍍 🥭 🍐 🍑 🍒 🍽️ 🍴 🥄 '
        const userid = this.props.match.params.user
        const users = this.props.chat.users
        const Item = List.Item
        if (!users[userid]) {
            return null
        }
        const chat_id = getChatId(userid, this.props.user._id)
        const chatMsg = this.props.chat.chartmsg.filter(v => v.chatid === chat_id)
        return (
            <div id='chat-page'>
                <NavBar icon={<Icon type="left" />}
                    onLeftClick={() => { this.props.history.goBack() }}
                    mode='dark'>
                    {users[userid].name}
                </NavBar>
                {chatMsg.map(v => {
                    const avatar = require(`../img/${users[v.from].avatar}.jpg`)
                    return v.from === userid ? (
                        <List key={v._id}>
                            <Item thumb={avatar}>{v.content}</Item>
                        </List>
                    ) : (
                            <List className='chat-me' key={v._id}>
                                <Item extra={<img src={avatar} alt='XX' />}>{v.content}</Item>
                            </List>
                        )
                })}
                <div className='stick-fotter'>
                    <List>
                        <InputItem
                            placeholder='请输入'
                            value={this.state.text}
                            onChange={v => { this.setState({ text: v }) }}
                            extra={
                                <div>
                                    <span onClick={() => { console.log(2222); }} style={{ marginRight: 15 }}>😃</span>
                                    <span onClick={() => this.handleSubmit()}>发送</span>
                                </div>
                            }
                        ></InputItem>
                    </List>
                </div>
            </div>
        )
    }
}
export default Chat
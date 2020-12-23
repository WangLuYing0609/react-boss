import React from 'react'
import { connect } from 'react-redux'
import { List, Badge } from 'antd-mobile'
import { withRouter } from 'react-router-dom'
@withRouter
@connect(state => state)
class Msg extends React.Component {
    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this)
    }
    getConentLast(val) {
        return val[val.length - 1]
    }
    handleClick(val) {
        this.props.history.push(`/chat/${val}`)
    }
    render() {
        // 按照chatid分组
        const msgGroup = {}
        this.props.chat.chartmsg.forEach(element => {
            msgGroup[element.chatid] = msgGroup[element.chatid] || []
            msgGroup[element.chatid].push(element)
        });
        const chatList = Object.values(msgGroup).sort((a, b) => {
            const a_last = this.getConentLast(a).create_time
            const b_last = this.getConentLast(b).create_time
            return b_last - a_last
        })
        const Item = List.Item;
        const Brief = Item.Brief;
        return (
            <div id='msgList'>
                {chatList.map(v => {
                    const listLast = this.getConentLast(v)
                    const userTarget = listLast.from === this.props.user._id ? listLast.to : listLast.from
                    const userinfo = this.props.chat.users[userTarget];
                    const unreadNumber = v.filter(val => !val.read && this.props.user._id === val.to).length
                    if (!userinfo) {
                        return null
                    }
                    const avatar = require(`../img/${userinfo.avatar}.jpg`)
                    return (
                        <List key={listLast._id} onClick={() => { this.handleClick(userTarget) }}>
                            <Item arrow="horizontal" thumb={avatar} extra={<Badge text={unreadNumber}></Badge>}>{listLast.content}
                                <Brief>{userinfo['name']}</Brief>
                            </Item>
                        </List>
                    )
                })}

            </div>
        )
    }

}
export default Msg
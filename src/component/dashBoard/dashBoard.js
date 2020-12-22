import React from 'react'
import { NavBar } from 'antd-mobile';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom'
import NavLinkBar from '../navLink/navLink'
import Boss from '../boss/boss'
import Genius from '../genius/genius'
import User from '../user/user'

import { getMsgList, recvMsg } from '../../redux/chat.redux'
function Msg() {
    return <div>Msg</div>
}
@connect(
    state => state, { getMsgList, recvMsg }
)

class DashBoard extends React.Component {
    componentDidMount() {
        if (!this.props.chat.chartmsg.length) {
            this.props.getMsgList()
            this.props.recvMsg()
        }
    }
    render() {
        const user = this.props.user
        const { pathname } = this.props.location
        const navList = [{
            path: '/boss',
            text: '牛人',
            icon: '',
            title: '牛人列表',
            component: Boss,
            hide: user.type === 'genius'
        },
        {
            path: '/genius',
            text: 'Boss',
            icon: '',
            title: 'Boss列表',
            component: Genius,
            hide: user.type === 'boss'
        },
        {
            path: '/msg',
            text: '消息',
            icon: '',
            title: '消息列表',
            component: Msg
        },
        {
            path: '/me',
            text: '我',
            icon: '',
            title: '个人中心',
            component: User
        }]
        const pathName = navList.find(v => v.path === pathname)
        return (
            pathName ? (<div className='dashBoardBox'>
                <NavBar className='top-NavBar' mode="dark">{navList.find(v => v.path === pathname).title || ''}</NavBar>
                {navList.map((v) => (
                    <Route key={v.path} path={v.path} component={v.component}></Route>
                ))}
                <NavLinkBar data={navList}></NavLinkBar>
            </div>) : null
        )
    }
}

export default DashBoard
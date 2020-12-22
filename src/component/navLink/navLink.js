import React from 'react'
import PropsTypes from 'prop-types'
import { TabBar } from 'antd-mobile';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
@withRouter
@connect(state => state.chat)
class NavLinkBar extends React.Component {
    static propsTypes = {
        data: PropsTypes.array.isRequired
    }
    render() {
        const navList = this.props.data.filter(v => !v.hide)
        const { pathname } = this.props.location
        return (
            <TabBar unselectedTintColor="#949494"
                tintColor="#33A3F4"
                barTintColor="white">
                {navList.map(v => (
                    <TabBar.Item
                        badge={v.path === '/msg' ? this.props.unread : 0}
                        key={v.path}
                        title={v.text}
                        icon={
                            <div style={{
                                width: '22px',
                                height: '22px',
                                background: 'url(https://gw.alipayobjects.com/zos/rmsportal/BTSsmHkPsQSPTktcXyTV.svg) center center /  21px 21px no-repeat'
                            }} />
                        }
                        selectedIcon={
                            <div style={{
                                width: '22px',
                                height: '22px',
                                background: 'url(https://gw.alipayobjects.com/zos/rmsportal/ekLecvKBnRazVLXbWOnE.svg) center center /  21px 21px no-repeat'
                            }} />
                        }
                        selected={pathname === v.path}
                        onPress={() => {
                            this.props.history.push(v.path)
                        }}
                    ></TabBar.Item>))}
            </TabBar>
        )
    }
}

export default NavLinkBar
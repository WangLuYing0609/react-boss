import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { List, Button, Modal, Result } from 'antd-mobile';
import browserCookie from 'browser-cookies'
import { logout } from '../../redux/user.redux'


@connect(
    state => state.user,
    { logout }
)

class User extends React.Component {
    constructor(props) {
        super(props)
        this.userLogOut = this.userLogOut.bind(this)
    }
    userLogOut() {
        const alert = Modal.alert;
        alert('Delete', 'Are you sure???', [
            { text: 'Cancel', onPress: () => console.log('cancel') },
            {
                text: 'Ok', onPress: () => {
                    browserCookie.erase('userid')
                    this.props.logout()
                }
            },
        ])
    }
    render() {
        const myImg = imgSrc => (<img src={require(`../img/${imgSrc}.jpg`)} className="spe am-icon am-icon-md imgSrcBox" alt="" />);
        const Item = List.Item;
        const Brief = Item.Brief;
        return this.props.user ? (<div>
            <Result
                img={myImg(this.props.avatar)}
                title={this.props.user}
                message={this.props.type === 'boss' ? this.props.company : this.props.title}
            />
            <List renderHeader={() => '简介'}>
                <Item multipleLine wrap>
                    {this.props.title}
                    {this.props.dec.split('/n').map(v => (
                        <Brief key={v}>{v}</Brief>
                    ))}
                </Item>
            </List>
            <Button style={{ marginTop: '20px' }} type="primary" onClick={this.userLogOut}>注销登陆</Button>
            {/* <List>
                <Item onClick={() => { console.log('hello'); }}>退出登录</Item>
            </List> */}
        </div>) : <Redirect to={this.props.redirectTo}></Redirect>
    }
}


export default User
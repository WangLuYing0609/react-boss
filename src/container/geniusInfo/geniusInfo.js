import React from 'react'
import { TextareaItem, InputItem, NavBar, Button } from 'antd-mobile';
import AvatarSelector from '../../component/avatar-selector/avatar-selector'
import { connect } from 'react-redux'
import { update } from '../../redux/user.redux'
import { Redirect } from 'react-router-dom'

// import Router from '../../../serve/user';

@connect(
    state => state.user,
    { update }
)
class GeniusInfo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            company: '',
            money: '',
            dec: '',
            avatar: ''
        }
        this.onChange = this.onChange.bind(this)
        this.selece = this.selece.bind(this)
    }
    onChange(key, v) {
        this.setState({
            [key]: v
        })
    }
    selece(imgname) {
        this.setState({
            avatar: imgname
        })
    }
    render() {
        const pathname = this.props.location.pathname
        const redirect = this.props.redirect
        return (
            <div>
                {redirect && redirect !== pathname ? <Redirect redirect={redirect}></Redirect> : ''}
                <NavBar>牛人完善信息</NavBar>
                {/* <AvatarSelector selectAvater={(imgname) => {
                    this.setState({
                        avatar: imgname
                    })
                }}></AvatarSelector> */}
                <AvatarSelector selectAvater={(imgname) => this.selece(imgname)}></AvatarSelector>
                <InputItem onChange={(v) => this.onChange('title', v)}>求职岗位</InputItem>
                <TextareaItem rows='3' autoHeight title="个人简介" onChange={(v) => this.onChange('dec', v)}></TextareaItem>
                <Button type='primary' onClick={() => { this.props.update(this.state) }}>保存</Button>
            </div>
        )
    }
}

export default GeniusInfo
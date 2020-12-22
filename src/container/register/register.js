import React from 'react'
import Logo from '../../component/logo/logo'
import { List, InputItem, Radio, WingBlank, WhiteSpace, Button } from 'antd-mobile'
import { connect } from 'react-redux'
import { register } from '../../redux/user.redux'
import { Redirect } from 'react-router-dom'
import formWarp from '../../component/imooc-form/imooc-form'

@connect(
  state => state.user,
  { register }
)
@formWarp
class Register extends React.Component {
  constructor(props) {
    super(props)
    this.handelRegister = this.handelRegister.bind(this)
  }
  componentDidMount() {
    this.props.handelClick('type', 'genius')
  }
  handelRegister() {
    this.props.register(this.props.state)
  }
  render() {
    const RadioItem = Radio.RadioItem;
    return (
      <div>
        <WingBlank>
          {this.props.redirectTo ? <Redirect to={this.props.redirectTo}></Redirect> : null}
          <Logo></Logo>
          <List>
            <InputItem onChange={val => this.props.handelClick('user', val)}>用户</InputItem>
            <InputItem onChange={val => this.props.handelClick('pwd', val)} type='password'>密码</InputItem>
            <InputItem onChange={val => this.props.handelClick('repeatpwd', val)} type='password'>确认密码</InputItem>
            <WhiteSpace></WhiteSpace>
            <RadioItem
              checked={this.props.state.type === 'genius'}
              onChange={() => { this.props.handelClick('type', 'genius') }}
            >牛人</RadioItem>
            <RadioItem
              checked={this.props.state.type === 'boss'}
              onChange={() => { this.props.handelClick('type', 'boss') }}
            >Boss</RadioItem>
            <WhiteSpace></WhiteSpace>
          </List>
          {this.props.msg ? <p style={{ color: 'red' }} >{this.props.msg}</p> : null}
          <Button type='primary' onClick={this.handelRegister}>注册</Button>
        </WingBlank>

      </div >)
  }
}

export default Register
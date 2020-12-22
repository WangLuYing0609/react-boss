import React from 'react'
import Logo from '../../component/logo/logo'
import { WingBlank, WhiteSpace, Button, InputItem } from 'antd-mobile'
import { login } from '../../redux/user.redux'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import imoocFrom from '../../component/imooc-form/imooc-form'


// function Hello(Comp) {
// 属性代理
// class HELLO extends React.Component {
//   render() {
//     return (
//       <div>
//         <p>特有的高阶组件</p>
//         <Comp {...this.props}></Comp>
//       </div>
//     )
//   }
// }


// 反向继承
//   class HELLO extends Comp {
//     componentDidMount() {
//       console.log('反向继承');
//     }
//     render() {
//       return (<Comp></Comp>)
//     }
//   }
//   return HELLO
// }
// @Hello
// class HOC extends React.Component {
//   render() {
//     return (
//       <div >HOC zujian</div>
//     )
//   }
// }



@connect(
  state => state.user, { login }
)
@imoocFrom
class Login extends React.Component {
  constructor(props) {
    super(props)
    this.register = this.register.bind(this)
    this.handelLogin = this.handelLogin.bind(this)
  }
  register() {
    this.props.history.push('/register')
  }

  handelLogin() {
    this.props.login(this.props.state)
  }
  render() {
    return <div>
      {this.props.redirectTo ? <Redirect to={this.props.redirectTo}></Redirect> : null}
      <Logo></Logo>
      <WingBlank>
        <InputItem onChange={val => this.props.handelClick('user', val)}>用户</InputItem>
        <WhiteSpace></WhiteSpace>
        <InputItem type='password' onChange={val => this.props.handelClick('pwd', val)}>密码</InputItem>
        <WhiteSpace></WhiteSpace>
        {this.props.msg ? <p style={{ color: 'red' }} >{this.props.msg}</p> : null}
        <Button type='primary' onClick={this.handelLogin}>登录</Button>
        <WhiteSpace></WhiteSpace>
        <Button onClick={this.register} type='primary'>注册</Button>
      </WingBlank>
    </div>
  }
}


export default Login
import React from 'react'
import axios from 'axios'
import { withRouter, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { LoadData } from '../../redux/user.redux'

@connect(
  state => state.user, { LoadData }
)
class AuthRoute extends React.Component {
  componentWillMount() {
    const pathnameArry = ['/login', '/register']
    const pathname = this.props.history.location.pathname
    if (pathnameArry.indexOf(pathname) !== -1) {
      return false
    }
    axios.get('/user/info').then(res => {
      if (res.data.code === 0) {
        this.props.LoadData(res.data.data)
      } else {
        this.props.history.push('/login')
      }
    })


  }
  render() {
    return <template>
      {this.props.redirectTo ? <Redirect to={this.props.redirectTo}></Redirect> : <Redirect to='/login'></Redirect>}
    </template>
  }
}
export default withRouter(AuthRoute) 
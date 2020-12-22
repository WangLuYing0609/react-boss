import React from 'react'
import { connect } from 'react-redux'
import { getList } from '../../redux/chatuser.redux'
import  UserCard  from '../userCard/userCard'
@connect(
    state => state.chatuser,
    { getList }
)
class Genius extends React.Component {
    
    componentDidMount() {
        this.props.getList('boss')
    }
    render() {
        return <UserCard userList={this.props.userList}></UserCard>
    }
}

export default Genius
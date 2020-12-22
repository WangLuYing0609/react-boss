import React from 'react'
import propsTypes from 'prop-types'
import { Card, WingBlank } from 'antd-mobile';
import { withRouter } from 'react-router-dom'

@withRouter
class UserCard extends React.Component {
    static propsTypes = {
        userList: propsTypes.array.isRequired
    }
    handleClick(v) {
        this.props.history.push(`/chat/${v._id}`)
    }
    render() {
        return (
            <WingBlank>
                {this.props.userList.map(v => (
                    v.avatar ? (
                        <Card key={v._id} onClick={() => this.handleClick(v)}>
                            <Card.Header
                                title={v.user}
                                thumb={require(`../img/${v.avatar}.jpg`)}
                                extra={<span>{v.title}</span>}
                            />
                            <Card.Body>
                                {v.type === 'boss' ? <div>公司名:{v.company}</div> : null}
                                {v.dec.split('/n').map(val => (
                                    <div key={val}>{val}</div>
                                ))}
                                {v.type === 'boss' ? <div>薪资:{v.money}</div> : null}
                            </Card.Body>
                        </Card>
                    ) : null
                ))}
            </WingBlank>
        )
    }
}
export default UserCard
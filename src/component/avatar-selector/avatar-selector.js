import React from 'react'
import { Grid, List } from 'antd-mobile';
import PropsTypes from 'prop-types'


class AvatarSelector extends React.Component {
    static propsTypes = {
        selectAvater: PropsTypes.func.isRequired
    }
    constructor(props) {
        super(props)
        this.state = {}
    }
    render() {
        const avaterList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((_val, i) => ({
            icon: require(`../img/${_val}.jpg`),
            text: `${i + 1}`,
        }))
        const gridHeader = this.state.icon ? (
            <div>
                <span>已选择头像</span>
                <img style={{ width: 20 }} src={this.state.icon} alt='' />
            </div>) : ''
        return (
            <List renderHeader={() => gridHeader}>
                <Grid data={avaterList} columnNum={5} onClick={elm => {
                    this.setState(elm)
                    this.props.selectAvater(elm.text)
                }}></Grid>
            </List>
        )
    }
}

export default AvatarSelector
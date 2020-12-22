import React from 'react'

export default function formWarp(Comp) {
    return class Warp extends React.Component {
        constructor(props) {
            super(props)
            this.state = {}
            this.handelClick = this.handelClick.bind(this)
        }
        handelClick(key, val) {
            this.setState({ [key]: val })
        }
        render() {
            return (<Comp
                state={this.state}
                {...this.props}
                handelClick={this.handelClick}
            ></Comp>)
        }
    }
}
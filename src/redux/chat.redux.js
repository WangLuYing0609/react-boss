import axios from 'axios'

import io from 'socket.io-client'
const scoket = io('ws://10.0.0.51:9093')

const MSG_LIST = 'MSG_LIST'
const MSC_RECV = 'MSC_RECV'
const READ_MSG = 'READ_MSG'

const initState = {
    chartmsg: [],
    users: {},
    unread: 0
}

export function chat(state = initState, action) {
    switch (action.type) {
        case MSG_LIST:
            return { ...state, chartmsg: action.playload.msg, users: action.playload.users, unread: action.playload.msg.filter(v => !v.read && v.to === action.playload.userid).length }
        case MSC_RECV:
            const num = action.playload.to === action.userid ? 1 : 0
            return { ...state, chartmsg: [...state.chartmsg, action.playload], unread: state.unread + num }
        case READ_MSG:
            // 清除对应未读数据
            const { number, from } = action.playload
            return { ...state, chartmsg: state.chartmsg.map(v => ({ ...v, read: from === v.from ? true : v.read })), unread: state.unread - number }
        default:
            return state
    }
}

function msgList(msg, users, userid) {
    return { type: MSG_LIST, playload: { msg, users, userid } }
}
export function sendMsg(from, to, msg) {
    return dispatch => {
        scoket.emit('sendmsg', { from, to, msg })
    }
}

function msgRecv(msg, userid) {
    return { type: MSC_RECV, playload: msg, userid }
}

export function recvMsg() {
    return (dispatch, getState) => {
        // 避免收到两次     
        scoket.off('recvmsg')
        scoket.on('recvmsg', (data) => {
            const userid = getState().user._id
            dispatch(msgRecv(data, userid))
        })
    }
}

export function getMsgList() {
    return (dispatch, getState) => {
        axios.get('/user/getmsgList').then(res => {
            if (res.status === 200 && res.data.code === 0) {
                const userid = getState().user._id
                dispatch(msgList(res.data.msgs, res.data.users, userid))
            }
        })
    }
}

function redmsg(from, userid, num) {
    return { type: READ_MSG, playload: { from, userid, num } }
}
export function redMsg(from) {
    return (dispatch, getState) => {
        axios.post('/user/redmsg', { from }).then(res => {
            const userid = getState().user._id
            if (res.status === 200 && res.data.code === 0) {
                dispatch(redmsg({ userid, from, num: res.data.num }))
            }
        })
    }
}
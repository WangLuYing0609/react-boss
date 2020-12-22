import axios from 'axios'
import { redirectRoute } from '../untils'



const ERRORMSG = 'ERRORMSG'
const LOAD_DATA = 'LOAD_DATA'
const AUTH_SUCCESS = 'AUTH_SUCCESS'
const LOGOUT = 'LOGOUT'
const initState = {
  msg: '',
  user: '',
  type: '',
  avatar: '',
  dec: '',
  redirectTo: ''
}
export function user(state = initState, action) {
  switch (action.type) {
    case AUTH_SUCCESS:
      return { ...state, msg: '', redirectTo: redirectRoute(action.payload), ...action.payload }
    case ERRORMSG:
      return { ...state, msg: action.msg }
    case LOAD_DATA:
      return { ...state, redirectTo: redirectRoute(action.payload), ...action.payload }
    case LOGOUT:
      return { ...initState, redirectTo: '/login' }
    default:
      return state
  }
}

function errorMsg(msg) {
  return { type: ERRORMSG, msg: msg }
  // 或者return {msg,type:ERRORMSG}
}

function authSuccess(obj) {
  const { pwd, ...data } = obj
  return { type: AUTH_SUCCESS, payload: data }
}

export function LoadData(data) {
  return { type: LOAD_DATA, payload: data }
}


export function logout() {
  return { type: LOGOUT }
}
// export function LoadData() {
//   // 获取用户信息 
//   return dispatch => {
//     axios.get('/user/info').then(res => {
//       if (res.data.code === 0) {
//         dispatch(loadInfo(res.data.data))
//       } else {
//         dispatch(errorMsg(res.data.msg))
//         dispatch(push('/login'))
//         // this.props.history.push('/login')
//       }
//     })
//   }

// }

export function register({ user, pwd, repeatpwd, type }) {
  if (!user || !pwd || !repeatpwd || !type) {
    return errorMsg('用户密码必须输入')
  }
  if (pwd !== repeatpwd) {
    return errorMsg('两次密码不同')
  }
  return dispatch => {
    axios.post('/user/register', { user, pwd, type }).then(res => {
      if (res.status === 200 && res.data.code === 0) {
        dispatch(authSuccess({ user, pwd, type }))
      } else {
        dispatch(errorMsg('用户注册失败'))
      }
    })
  }
}


export function login({ user, pwd }) {
  if (!user || !pwd) {
    return errorMsg('用户密码必须输入')
  }
  return dispatch => {
    axios.post('/user/login', { user, pwd }).then(res => {
      if (res.status === 200 && res.data.code === 0) {
        dispatch(authSuccess(res.data.data))
      } else {
        dispatch(errorMsg(res.data.msg))
      }
    })
  }
}

export function update(data) {
  return dispatch => {
    axios.post('/user/update', data).then(res => {
      if (res.status === 200 && res.data.code === 0) {
        dispatch(authSuccess(res.data.data))
      } else {
        dispatch(errorMsg(res.data.msg))
      }
    })
  }

}

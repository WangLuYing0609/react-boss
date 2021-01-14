import { takeEvery, takeLatest, throttle, select, call, put } from 'redux-saga/effects'
import axios from 'axios'
// takeEvery 执行每次的异步任务
// takeLastest 每次触发都会取消上一次的正在执行的异步任务
// throttle 派生一次任务之后，将最新传入的action接收到buffe中，至多保留最近的一个，同时停止派生新的任务，又名节流阀

export function* defSaga() {
    // yield takeEvery('AUTH_SUCCESS', function* () {
    //     console.log('AUTH_SUCCESS');
    // })
    // console.log('"testTakeEvery"');
    yield takeLatest("testTakeEvery", function* () {
        const data = yield select()
        const date = yield call(axios.post, '/user/login', { user: data.user.user, pwd: data.user.pwd })
        if (date.data.code === 0) {
            yield put({ type: 'AUTH_SUCCESS', payload: date.data })
        } else {
            yield put({ type: 'ERRORMSG', msg: date.data.msg })
        }
    })

}



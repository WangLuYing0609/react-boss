import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import combineReducers from './reduce'
import './index.css'


import login from './container/login/login'
import register from './container/register/register'
import AuthRoute from './component/authroute/authroute'
import BossInfo from './container/bossInfo/bossInfo'
import GeniusInfo from './container/geniusInfo/geniusInfo'
import Dashboard from './component/dashBoard/dashBoard'
import Chat from './component/chat/chat'


// applyMiddleware 处理中间件   compose将函数组合
import { createStore, applyMiddleware, compose } from 'redux'



const devtools = window.devToolsExtension ? window.devToolsExtension() : f => f
const store = createStore(combineReducers, compose(applyMiddleware(thunk), devtools))





ReactDOM.render(
  (<Provider store={store}>
    <BrowserRouter>
      <AuthRoute></AuthRoute>
      <Switch>
        <Route path='/login' component={login}></Route>
        <Route path='/register' component={register}></Route>
        <Route path='/bossinfo' component={BossInfo}></Route>
        <Route path='/geniusInfo' component={GeniusInfo}></Route>
        <Route path='/chat/:user' component={Chat}></Route>
        <Route component={Dashboard}></Route>
      </Switch>
    </BrowserRouter>
  </Provider>),
  document.querySelector('#root')
);



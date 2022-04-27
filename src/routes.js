import React, { Component } from 'react'
import AuthRoute from './components/AuthRoute'
import {Route,Switch} from 'react-router-dom'

import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import ResetPwd from './pages/ResetPwd'
import NotFount from './pages/NotFount.jsx'
import Index from './pages/Index.jsx'
import UserInfo from './pages/UserInfo'

class Routes extends Component {
    render(){
        return (
            <div style={{height:"100%",overflow: 'hidden'}}>
                <AuthRoute></AuthRoute>
                <Switch>
                    <Route path='/login' component={Login}></Route>
                    <Route path='/register' component={Register}></Route>
                    <Route path='/reset_pwd' component={ResetPwd}></Route>
                    <Route path='/404' component={NotFount}></Route>
                    <Route path='/user_info' component={UserInfo}></Route>
                    <Route component={Index}></Route>
                </Switch>
            </div>
        )
    }
}

export default Routes
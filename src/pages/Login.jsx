import React, { Component } from 'react'
import {connect} from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
//antd-mobile
// import {List,InputItem,WingBlank,WhiteSpace,Button} from 'antd-mobile'
import { Form, Input, Button } from 'antd-mobile-v5'
import {login} from '@/redux/actions/loginAction'
import Logo from '@/components/Logo'

import { reqLogin } from '@/api'
// import handleChange from '@/components/handleChange'

//css
import '@/assets/styles/login.scss'

class Login extends Component {

    onFinish = async (values) => {
        // 准备数据
        const {userName,password} = values
        let username = userName.trim();
        let pwd = password.trim();
        console.log(username, pwd)
        this.props.login(username,password)
        
    }

    button = () => {
        <div>
            <Button block color='warning' size='large' type='submit'>
                登录
            </Button>
            <br/> <br/>
            <Button className='adm-form-footer'
                    block color='warning' size='middle' 
                    onClick={() => this.props.history.push('/register')}>
                    注册
                </Button>
        </div>
    }

    render(){
        const user = this.props.user
        // debugger
        console.log('----test----',user)
        if(user && user._id){
            // this.props.history.push('/')
            return <Redirect to='/'/>
        }
        return (
            <div className="login-page">
                <Logo></Logo>
                <Form
                    name='form'
                    onFinish={this.onFinish}
                    layout='horizontal'
                    footer={
                        <>
                            <Button block color='warning' size='large' type='submit'>
                                登录
                            </Button>
                            <br/>
                            <Button block color='warning' size='large' 
                                    onClick={() => this.props.history.push('/register')}>
                                    注册
                            </Button>
                        </>
                    }
                >
                    {/* 输入用户名 */}
                    <Form.Item
                        name='userName'
                        label='用户名'
                        rules={[
                            { required: true, message: '用户名不能为空' },
                            { type: 'string', min: 6 },
                        ]}
                    >
                        <Input placeholder='请输入用户名' clearable/>
                    </Form.Item>

                    {/* 输入密码 */}
                    <Form.Item name='password' label='密码' rules={[{ required: true }]}>
                        <Input placeholder='请输入密码' type='password' clearable/>
                    </Form.Item>
                       
                </Form>
                
                <Link to='/reset_pwd'>忘记密码？</Link>
            </div>
        )
    }
}

export default connect(
    state => ({user: state.user}),
    {login}
)(Login)

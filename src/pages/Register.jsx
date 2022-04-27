import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Form, Input, Button, Toast } from 'antd-mobile-v5'

import Logo from '@/components/Logo'
import { reqRegister } from '@/api'
import handleChange from '@/components/handleChange'
import '@/assets/styles/login.scss'

class Register extends Component {

    state = {
        userName: '',
        password: '',
        password2: '',
    }

    handleChange2 = (key, val) => {
        this.setState({
            [key]: val
        })
    }

    onFinish = async (values) => {
        // 准备数据
        const { userName, password, password2, phone } = values
        let username = userName.trim();
        let pwd = password.trim();
        let pwd2 = password2.trim();
        try {
            // TODO验证表单数据
            // const values = await this.form.current.validateFields();
            // console.log('Success:', values);


            // 判断密码是否一致
            if (pwd !== pwd2) {
                alert('密码不一致');
                return
            }


            // 调用接口
            const res = await reqRegister(username, pwd, phone);
            console.log(res)
            if (res.status === 0) {
                Toast.show({
                    content: '注册成功',
                    icon: 'success',
                    afterClose: () => {
                        this.props.history.push('/login')
                    },
                })
            }
            // 处理数据

        } catch (errorInfo) {
            console.log('Failed:', errorInfo);
            Toast.show({
                content: '注册失败',
                icon: 'fail',
            })
        }
    }

    render() {
        return (
            <div className="login-page">
                <Logo></Logo>
                <Form
                    name='form'
                    onFinish={this.onFinish}
                    layout='horizontal'
                    footer={
                        <Button block color='warning' size='large' type='submit'>
                            注册
                        </Button>
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
                        <Input placeholder='请输入用户名' clearable />
                    </Form.Item>

                    {/* phone */}
                    <Form.Item
                        name='phone'
                        label='手机号'
                        rules={[
                            { required: true, message: '手机号不能为空' },
                            { pattern: RegExp('^1(3\\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\\d|9[0-35-9])\\d{8}$'), message: '手机号码格式错误' },
                        ]}
                    >
                        <Input placeholder='请输入手机号' clearable />
                    </Form.Item>

                    {/* 输入密码 */}
                    <Form.Item name='password' label='密码' rules={[{ required: true }]}>
                        <Input placeholder='请输入密码' type='password' clearable />
                    </Form.Item>

                    {/* 确认密码 */}
                    <Form.Item name='password2' label='确认密码' rules={[{ required: true }]}>
                        <Input placeholder='确认密码' type='password' clearable />
                    </Form.Item>

                </Form>
                <Link to='/login'>已有账号？点击登录</Link>
            </div>
        )
    }
}

export default connect()(handleChange(Register))
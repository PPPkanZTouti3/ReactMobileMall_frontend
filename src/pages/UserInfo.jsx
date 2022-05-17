import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, Input, Button, Radio, Space, Toast } from 'antd-mobile-v5'
import { LeftOutline } from 'antd-mobile-icons'
import { reqUpdateUserInfo } from '@/api'

import homeSvg from '../assets/images/index.svg'
import '../assets/styles/userInfo.scss'

class UserInfo extends Component  {

    onFinish = async (values) => {
        let data = values;
        data._id = this.props.user._id;
        console.log(data)
        // 调用接口
        const res = await reqUpdateUserInfo(data);
        
        if (res.status === 0) {
            Toast.show({
                content: '修改成功',
                icon: 'success',
                afterClose: () => {
                    this.props.history.replace('/my')
                },
            })
        }
        else {
            Toast.show({
                content: res.msg,
                icon: 'fail',
            })
        }
        
    }
    

    backButton = () => {
        this.props.history.replace('/my')
    }

    homeButton = () => {
        this.props.history.replace('/')
    }

    render() {

        const { nickName, userName, gender, phone, email } = this.props.user;

        return (
            <div className='user-info-page'>
                {/* header */}
                <div className='user-info-header'>
                    <div className='user-info-back' onClick={this.backButton}>
                    <LeftOutline fontSize={24} />
                    </div>
                    <div className='user-info-title'>个人信息</div>
                    <div className='user-info-home' onClick={this.homeButton}>
                        <img src={homeSvg} />
                    </div>
                </div>

                {/* main */}
                <div className='user-info-main'>
                <Form
                    layout='horizontal'
                    name='form'
                    onFinish={this.onFinish}
                    footer={
                    <Button block type='submit' color='warning' size='large'>
                        提交
                    </Button>
                    }
                >
                    {/* 头像 */}
                    {/* <Form.Item
                        name='profile'
                        label='头像'
                    >
                        TODO
                    </Form.Item> */}

                    {/* 昵称 */}
                    <Form.Item
                        name='nickName'
                        label='昵称'
                        rules={[
                            { required: true, message: '昵称不能为空' },
                            { type: 'string', max: 12 },
                        ]}
                        initialValue={ nickName }
                    >
                        <Input placeholder='请输入用户名' defaultValue={ nickName } clearable />
                    </Form.Item>

                    {/* 用户名 */}
                    <Form.Item
                        name='userName'
                        label='用户名'
                        rules={[
                            { required: true, message: '用户名不能为空' },
                            { type: 'string', min: 5 },
                        ]}
                        initialValue={ userName }
                    >
                        <Input placeholder='请输入用户名' defaultValue={userName} clearable />
                    </Form.Item>

                    {/* email */}
                    <Form.Item
                        name='email'
                        label='邮箱'
                        rules={[
                            { type: 'email' },
                        ]}
                        initialValue={ email || '' }
                    >
                        <Input placeholder='请输入用户名' defaultValue={email || ''} clearable />
                    </Form.Item>

                    {/* phone */}
                    <Form.Item
                        name='phone'
                        label='手机号'
                        rules={[
                            { required: true, message: '手机号不能为空' },
                            { pattern: RegExp('^1(3\\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\\d|9[0-35-9])\\d{8}$'), message: '手机号码格式错误' },
                        ]}
                        initialValue={ phone }
                    >
                        <Input placeholder='请输入手机号' defaultValue={phone} clearable />
                    </Form.Item>

                    <Form.Item
                        name='gender'
                        label='性别'
                        initialValue={gender.toString()}
                    >
                        <Radio.Group 
                            defaultValue={gender.toString()}
                        >
                            <Space>
                                <Radio value='1'>男</Radio>
                                <Radio value='0'>女</Radio>
                            </Space>
                        </Radio.Group>
                    </Form.Item>
                </Form>
                </div>
            </div>
        )
    }
}

export default connect(
    state => ({user: state.user})
)(UserInfo);
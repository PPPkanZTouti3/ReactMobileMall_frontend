import React, { Component } from 'react'
import { connect } from 'react-redux'
import { logout } from '@/redux/actions/loginAction'
import { Form, Input, Button, Radio, Space, Toast } from 'antd-mobile-v5'
import { LeftOutline } from 'antd-mobile-icons'
import { reqResetPwd, reqFindPwd } from '@/api'

import homeSvg from '../assets/images/index.svg'
import '../assets/styles/userInfo.scss'

class RetsetPwd extends Component {

    onUpdate = async (values) => {
        let data = values;
        const { newPwd, newPwd2 } = values;
        if(newPwd2 !== newPwd) {
            Toast.show({
                content: '新密码与确认密码不一致',
                icon: 'fail',
            })
            return;
        }


        data._id = this.props.user._id;

        // 调用接口
        const res = await reqResetPwd(data);

        if (res.status === 0) {
            Toast.show({
                content: '修改成功',
                icon: 'success',
                afterClose: () => {
                    this.props.logout();
                    this.props.history.replace('/')
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

    onFind = async (values) => {
        let data = values;
        const { userName, phone, newPwd, newPwd2 } = values;
        if(newPwd2 !== newPwd) {
            Toast.show({
                content: '新密码与确认密码不一致',
                icon: 'fail',
            })
            return;
        }

        // 调用接口
        const res = await reqFindPwd(data);

        if (res.status === 0) {
            Toast.show({
                content: '修改成功',
                icon: 'success',
                afterClose: () => {
                    this.props.history.replace('/')
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

        const { userName, _id } = this.props.user;

        return (
            <div className='user-info-page'>
                {/* header */}
                <div className='user-info-header'>
                    <div className='user-info-back' onClick={this.backButton}>
                        <LeftOutline fontSize={24} />
                    </div>
                    <div className='user-info-title'>{_id ? '修改密码' : '找回密码'}</div>
                    <div className='user-info-home' onClick={this.homeButton}>
                        <img src={homeSvg} />
                    </div>
                </div>

                {/* main */}
                <div className='user-info-main'>
                    <Form
                        layout='horizontal'
                        name='form'
                        onFinish={_id ? this.onUpdate : this.onFind}
                        footer={
                            <Button block type='submit' color='warning' size='large'>
                                提交
                            </Button>
                        }
                    >

                        {/* 用户名 */}
                        {1 ? (
                            <Form.Item
                                name='userName'
                                label='用户名'
                                rules={[
                                    { required: true, message: '用户名不能为空' },
                                    { type: 'string', min: 5 },
                                ]}
                                initialValue={userName}
                                disabled={_id}
                            >
                                <Input placeholder='请输入用户名' defaultValue={userName} clearable />
                            </Form.Item>
                        ) : null}

                        {/* phone */}
                        {!_id ? (
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
                        ) : null}

                        {/* 输入旧密码 */}
                        {_id ? (
                            <Form.Item name='oldPwd' label='旧密码' rules={[{ required: true }, { type: 'string', min: 6 }]}>
                                <Input placeholder='请输入旧密码' type='password' clearable />
                            </Form.Item>
                        ) : null}

                        {/* 输入新密码 */}
                        {1 ? (
                            <Form.Item name='newPwd' label='新密码' rules={[{ required: true }, { type: 'string', min: 6 }]}>
                                <Input placeholder='请输入新密码' type='password' clearable />
                            </Form.Item>
                        ) : null}

                        {/* 输入确认密码 */}
                        {1 ? (
                            <Form.Item name='newPwd2' label='确认密码' rules={[{ required: true }, { type: 'string', min: 6 }]}>
                                <Input placeholder='确认密码' type='password' clearable />
                            </Form.Item>
                        ) : null}
                    </Form>
                </div>
            </div>
        )
    }
}

export default connect(
    state => ({ user: state.user }),
    {logout}
)(RetsetPwd);
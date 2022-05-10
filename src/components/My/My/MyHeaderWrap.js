import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { reqAliPay } from '@/api'

class MyHeaderWrap extends Component {

    toUserInfo = () => this.props.history.push('/user_info')

    render(){
        const user = this.props.user;
        return (
            <div className="my-header-wrap">
                <div className="my-header">
                    <div className="my-header-main">
                        <div className="my-header-avatar" onClick={this.toUserInfo}>
                            <div className="my-header-avatar-img">
                                {/* <img src={require('@/assets/images/avatar.jpg')} alt="avatar"/> */}
                                <img src={user.profile} alt="avatar"/>
                            </div>
                        </div>
                        <div className="my-header-msg">
                            <div className="name">
                                {user.nickName}
                            </div>
                            <div className="pin">
                            用户名：{user.userName}
                            </div>
                        </div>
                        <a 
                            onClick={()=>{
                                this.props.goto('/my/address');
                                sessionStorage.setItem('__search_prev_path__','/my')
                                sessionStorage.removeItem('__address_prev_path__')
                            }}
                            style={{
                                backgroundImage:'url('+require('@/assets/images/address.png')+')',
                                backgroundRepeat:'no-repeat',
                                backgroundPosition:'center left'
                            }}
                            className="setting">
                            地址管理
                        </a>
                        {/* <a 
                            style={{
                                top:'42px',
                                backgroundImage:'url('+require('@/assets/images/msg.png')+')',
                                backgroundRepeat:'no-repeat',
                                backgroundPosition:'center left'
                            }}
                            className="setting"
                            >
                            消息
                        </a> */}
                    </div>
                    <div className="my-section">
                        {/* <div className="my-assets">
                            <a onClick={()=>{
                                this.props.goto('/my/purse');
                                sessionStorage.setItem('__search_prev_path__','/my')
                            }}>
                                <img src={require('@/assets/images/all@withe.png')} alt=""/>
                                <span>我的钱包</span>
                            </a>
                            <a onClick={()=>{
                                this.props.goto('/my/purse');
                                sessionStorage.setItem('__search_prev_path__','/my')
                            }}>
                                <b>87454.00</b>
                                <span>余额</span>
                            </a>
                            <a onClick={()=>{
                                this.props.goto('/my/integral');
                                sessionStorage.setItem('__search_prev_path__','/my')
                            }}>
                                <b>87454.00</b>
                                <span>积分</span>
                            </a>
                           
                        </div> */}
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(
    state => ({user: state.user})
)(withRouter(MyHeaderWrap))
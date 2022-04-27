import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as routerAction from '@/redux/actions/routerAction'
import {ActionSheet, Toast } from 'antd-mobile';
import MyHeaderWrap from '@/components/My/My/MyHeaderWrap'
import MyOrder from '@/components/My/My/MyOrder'
import Header from '@/components/Header/Header'

import '@/assets/styles/my.scss'

class My extends Component {
    constructor(props) {
        super(props);
        this.state={
            clicked: 'none',
            dataList:[
                { url: 'apay.png', title: '支付宝' },
                { url: 'weibo.png', title: '新浪微博' },
                { url: 'shenghuoquan.png', title: '生活圈' },
                { url: 'weixin.png', title: '微信好友' },
                { url: 'qq.png', title: 'QQ' }
            ].map(obj => ({
                icon: <img src={require(`@/assets/images/${obj.url}`)} alt={obj.title} style={{ width: 36 }} />,
                title: obj.title,
            }))
        }
    }
    goto(path){
        this.props.history.push(path)
        this.props.router.changePath(path)
    }
    showShareActionSheet(){
        var self = this;
        ActionSheet.showShareActionSheetWithOptions({
          options: self.state.dataList,
          message: '我要分享',
        },
        (buttonIndex) => {
            self.setState({ clicked: buttonIndex > -1 ? self.state.dataList[buttonIndex].title : 'cancel' });
            // also support Promise
            return new Promise((resolve) => {
                Toast.info('正在分享');
                setTimeout(resolve, 1000);
            });
        });
    }

    toResetPwd = () => {
        this.props.history.push('/reset_pwd')
    }

    render() {
        return (
            <div className="my-page">
                <Header title="个人中心"></Header>
                <div className="my-main">
                    <MyHeaderWrap goto={this.goto.bind(this)}></MyHeaderWrap>
                    <MyOrder></MyOrder>
                    <div className="my-section">
                        <div className="my-more">
                            <a onClick={()=>{
                                this.goto('/my/browserecord');
                            }}>
                                <img src={require(`@/assets/images/browse.jpg`)} alt=""/>
                                <span>
                                    <div>浏览记录</div>
                                    <p>进入浏览5</p>
                                </span>
                            </a>
                            <a onClick={()=>{
                                this.goto('/my/helpback');
                            }}>
                                <img src={require(`@/assets/images/feedback.jpg`)} alt=""/>
                                <span>
                                    <div>帮助反馈</div>
                                    <p>优化体验</p>
                                </span>
                            </a>
                            <a onClick={this.showShareActionSheet.bind(this)}>
                                <img src={require(`@/assets/images/share.jpg`)} alt=""/>
                                <span>
                                    <div>我要分享</div>
                                    <p>最好的朋友</p>
                                </span>
                            </a>
                            <a onClick={this.toResetPwd}>
                                <img src={require(`@/assets/images/resetPwd.png`)} style={{width: '55px', height: '55px'}}/>
                                <span>
                                    <div>修改密码</div>
                                    <p>提高账户安全性</p>
                                </span>
                            </a>
                            {/* <a>
                                <img src={require(`@/assets/images/community.jpg`)} alt=""/>
                                <span>
                                    <div>榴莲社区</div>
                                    <p>吃货分享</p>
                                </span>
                            </a> */}
                            {/* <a>
                                <img src={require(`@/assets/images/school.jpg`)} alt=""/>
                                <span>
                                    <div>榴莲学堂</div>
                                    <p>玩爆榴莲知识</p>
                                </span>
                            </a> */}
                        </div>
                    </div>
                    {/* <div className="my-section">
                        <a  className="item">账号管理</a>
                    </div>
                    <div className="my-section">
                        <a  className="item">退出</a>
                    </div> */}
                    {/* <div className="my-section">
                        <a className="item_noleft">榴莲社区</a>
                    </div> */}
                    {/* <WingBlank size="lg">
                        <Card>
                            <Card.Header
                                title="This is title"
                                thumb="https://gw.alipayobjects.com/zos/rmsportal/MRhHctKOineMbKAZslML.jpg"
                                extra={<span>this is extra</span>}
                            />
                            <Card.Body>
                                <div>This is content of `Card`</div>
                            </Card.Body>
                            <Card.Footer content="footer content" extra={<div>extra footer content</div>} />
                        </Card>
                        <Space size="lg" />
                    </WingBlank> */}
                </div>
            </div>
        )
    }
}

export default connect(
    null,
    (dispatch)=>{
        return {
            router:bindActionCreators(routerAction,dispatch)
        }
    }
)(My)
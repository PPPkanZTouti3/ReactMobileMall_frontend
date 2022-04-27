import React, { Component } from 'react'
//引入redux
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as routerAction from '@/redux/actions/routerAction'
//引入头部
import TextHeader from '@/components/Header/TextHeader'

import '@/assets/styles/integral.scss'

class Integral extends Component {
  render() {
    return (
      <div className="integral-page">
        <TextHeader returnbtn={true} title="我的积分" pathname="/my">
        <div className="integraldetail" onClick={()=>{
            this.props.history.push('/my/integraldetail')
            this.props.router.changePath('/my/integraldetail')
            sessionStorage.setItem('__search_prev_path__','/my/integraldetail')
          }}>积分详细</div>
        </TextHeader>
        <div className="integral-main">
          <div className="integral-wrap">
            300<span>积分</span>
          </div>
          <div className="integral-body">
            <div className="integral-item">
              <div className="left">
                <div>分享给好友</div>
                <div>3积分</div>
              </div>
              <img src={require(`@/assets/images/test/1.jpg`)} alt=""/>
              <div className="right">
                <div className="title">榴莲猫山王冰皮榴莲月饼礼盒装马来西亚进口糕点顺丰</div>
                <div className="price"><span>￥</span>99.00</div>
              </div>
            </div>
            <div className="integral-item">
              <div className="left">
                <div>分享给好友</div>
                <div>3积分</div>
              </div>
              <img src={require(`@/assets/images/test/1.jpg`)} alt=""/>
              <div className="right">
                <div className="title">榴莲猫山王冰皮榴莲月饼礼盒装马来西亚进口糕点顺丰</div>
                <div className="price"><span>￥</span>99.00</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default connect(
  null,
  //跳转路由
  (dispatch)=>({
    router:bindActionCreators(routerAction,dispatch)
  })
)(Integral)

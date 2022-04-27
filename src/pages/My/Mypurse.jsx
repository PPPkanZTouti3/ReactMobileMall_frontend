import React, { Component } from 'react'
import {connect} from 'react-redux'
import { WingBlank, WhiteSpace,Button } from 'antd-mobile'
import TextHeader from '@/components/Header/TextHeader'

import '@/assets/styles/mypurse.scss'

class Mypurse extends Component {
  render() {
    
    return (
      <div className="purse-page">
        <TextHeader returnbtn={true} title="我的钱包" pathname="/my"></TextHeader>
        <div className="purse-main">
          <WingBlank>
            <WhiteSpace/>
            <WhiteSpace/>
            <div className="mypurse">
              <img src={require(`@/assets/images/purse.png`)} alt=""/>
              <WhiteSpace/>
              <WhiteSpace/>
              <div className="tip">我的零钱</div>
              <WhiteSpace/>
              <div className="price"><span>￥</span>90.00</div>
              <WhiteSpace/>
              <WhiteSpace/>
              <div>
                <WhiteSpace/>
                <Button type="primary">充值</Button>
                <WhiteSpace/>
                <WhiteSpace/>
                <Button>提现</Button>
              </div>
            </div>
          </WingBlank>
        </div>
      </div>
    )
  }
}
export default connect()(Mypurse)

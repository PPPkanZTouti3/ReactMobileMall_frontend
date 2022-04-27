import React, { Component } from 'react'
import {connect} from 'react-redux'
import TextHeader from '@/components/Header/TextHeader'

import '@/assets/styles/integral.scss'

class IntegralDetail extends Component {
  render() {
    
    return (
      <div className="integral-page">
        <TextHeader returnbtn={true} title="积分详细" pathname="/my/integral"></TextHeader>
        <div className="integral-main">
          <div className="integral-detail">
            <div className="integral-item">
                <div className="i-left">
                    <h2>购买商品</h2>
                    <div>2018-07-31 12:53:41</div>
                </div>
                <div className="i-right red">
                    +30
                </div>
            </div>
            <div className="integral-item">
                <div className="i-left">
                    <h2>购买商品</h2>
                    <div>2018-07-31 12:53:41</div>
                </div>
                <div className="i-right red">
                    +30
                </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default connect()(IntegralDetail)

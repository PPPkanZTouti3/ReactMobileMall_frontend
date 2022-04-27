import React, { Component } from 'react'
import {connect} from 'react-redux'
import TextHeader from '@/components/Header/TextHeader'

import '@/assets/styles/browse-record.scss'

class BrowseRecord extends Component {
  render() {
    return (
      <div className="browse-record-page">
        <TextHeader returnbtn={true} title="浏览记录" pathname="/my"></TextHeader>
        <div className="browse-record-main">
            <div className="browse-wrap">
                <div className="browse-time">2018-07-31</div>
                <div className="browse-main">
                    <div className="browse-item">
                        <img width="90" src={require(`@/assets/images/test/1.jpg`)} alt=""/>
                        <div className="browse-right">
                            <div className="title">榴莲猫山王冰皮榴莲月饼礼盒装马来西亚进口糕点顺丰</div>
                            <div className="price"><span>￥</span>99.00</div>
                        </div>
                    </div>
                    <div className="browse-item">
                        <img width="90" src={require(`@/assets/images/test/1.jpg`)} alt=""/>
                        <div className="browse-right">
                            <div className="title">榴莲猫山王冰皮榴莲月饼礼盒装马来西亚进口糕点顺丰</div>
                            <div className="price"><span>￥</span>99.00</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    )
  }
}
export default connect()(BrowseRecord)

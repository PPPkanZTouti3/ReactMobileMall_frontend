import React, { Component } from 'react'
import {connect} from 'react-redux'
import TextHeader from '@/components/Header/TextHeader'

import '@/assets/styles/myfeedback.scss'

class MyFeedback extends Component {
  render() {
    return (
      <div className="myfeedback-page">
        <TextHeader returnbtn={true} title="我的反馈" pathname="/my/helpback">
        </TextHeader>
        <div className="myfeedback-main">
            <div className="myfeedback-item">
                <button>功能异常</button>
                <div className="body">
                    购物时不流畅，出现卡顿，以为是网络问题，看了一下网络很好，原因何在。
                </div>
                <div className="time">2018-07-26</div>
            </div>
        </div>
      </div>
    )
  }
}
export default connect()(MyFeedback)

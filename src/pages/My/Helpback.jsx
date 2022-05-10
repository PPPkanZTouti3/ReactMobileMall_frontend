import React, { Component } from 'react'
//引入redux
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as routerAction from '@/redux/actions/routerAction'
//antd-mobile组件
import { Tabs, Button } from 'antd-mobile'
import { TextArea, Toast } from 'antd-mobile-v5'
//头部组件
import TextHeader from '@/components/Header/TextHeader'
//classnames
import classnames from 'classnames'
//css
import '@/assets/styles/helpback.scss'
//富文本
import wangEditor from 'wangeditor'

class Helpback extends Component {
  constructor(props){
    super(props)
    this.state={
      helpbackIndex:0,
      //tabs
      tabs:[
        { title: '帮助', sub: 0 },
        { title: '反馈', sub: 1 }
      ],
      feedbackBtn:null
    }
  }
  componentDidMount(){
    // this.editor = new wangEditor(this.refs.editor);
    // this.editor.customConfig.showLinkImg = false
    // this.editor.customConfig.uploadImgParams = {
    //     fileType: 'image',
    //     fileModule:'product',
    //     isZoom: 0
    // }
    // this.editor.customConfig.uploadImgServer = ''  // 上传图片到服务器
    // this.editor.customConfig.menus = [
    // 'image',  // 插入图片
    // ]
    // this.editor.customConfig.uploadImgHooks={
    //     customInsert: function (insertImg, result, editor) {
    //         // 图片上传并返回结果，自定义插入图片的事件（而不是编辑器自动插入图片！！！）
    //         // insertImg 是插入图片的函数，editor 是编辑器对象，result 是服务器端返回的结果

    //         // 举例：假如上传图片成功后，服务器端返回的是 {url:'....'} 这种格式，即可这样插入图片：
    //         var url = result.url
    //         insertImg(url)
    //     }
    // }
    // this.editor.create()
  }
  render() {
    return (
      <div className="helpback-page">
        {/* 头部 */}
        <TextHeader returnbtn={true} title="帮助反馈" pathname="/my">
          <div className="myfeedback" onClick={()=>{
            this.props.history.push('/my/feedback')
            this.props.router.changePath('/my/feedback')
            sessionStorage.setItem('__search_prev_path__','/my/feedback')
          }}>我的反馈</div>
        </TextHeader>
         {/* 内容 */}
        <div className="helpback-main">
          <Tabs tabs={this.state.tabs}
              initialPage={this.state.helpbackIndex}
              tabBarPosition="top"
              renderTab={tab => <span>{tab.title}</span>}
              onChange={(tab, index) => {
                
              }}
            >
              {/* 帮助 */}
              <div className="helpback-div">
                <div className="help-img">
                    <img src={require(`@/assets/images/test/info.dpg`)} alt=""/>
                </div>
              </div>
              {/* 反馈 */}
              <div className="helpback-div">
                <div className="feedback">
                  {/* 反馈标题 */}
                  <h4 className="feedback-title">反馈问题类型</h4>
                  {/* 反馈类型 */}
                  <div className="feedback-check">
                      <div className="feedback-btn">
                          <button className={classnames({
                            active:this.state.feedbackBtn===0
                          })} onClick={()=>{
                            this.setState({
                              feedbackBtn:0
                            })
                          }}>功能问题</button>
                      </div>
                      <div className="feedback-btn">
                          <button className={classnames({
                            active:this.state.feedbackBtn===1
                          })} onClick={()=>{
                            this.setState({
                              feedbackBtn:1
                            })
                          }}>体验问题</button>
                      </div>
                      <div className="feedback-btn">
                          <button className={classnames({
                            active:this.state.feedbackBtn===2
                          })} onClick={()=>{
                            this.setState({
                              feedbackBtn:2
                            })
                          }}>其他</button>
                      </div>
                  </div>
                  {/* 反馈详细 */}
                  <div className="feedback-text">
                    <div id="editor" ref="editor">
                    <TextArea
                      showCount
                      maxLength={150}
                    />
                    </div>
                  </div>
                  {/* 反馈提交 */}
                  <div className="feedback-footer">
                    <Button type="primary" onClick={() => {
                      Toast.show({
                        content: '提交成功',
                        icon: 'success'
                      })
                    }}>提交</Button>
                  </div>
                </div>
              </div>
            </Tabs>
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
)(Helpback)

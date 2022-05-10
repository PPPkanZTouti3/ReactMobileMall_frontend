import React, { Component } from 'react'
import {connect} from 'react-redux'
import TextHeader from '@/components/Header/TextHeader'
import Loading from '@/components/Loading'
import { reqBrowseInfo } from '@/api'

import '@/assets/styles/browse-record.scss'

class BrowseRecord extends Component {

  state = {
    data: '',
    isLoading: true
  }

  getBrowseInfo = async () => {
    const userId = this.props.user._id;
    let res = await reqBrowseInfo(userId)
    if(!res.status) {
      this.setState({
        data: res.data,
        isLoading: false
      })
    }
  }

  toProd = (id) => {
    this.props.history.push('/goods/' + id)
  }

  componentDidMount() {
    this.getBrowseInfo()
  }

  render() {
    const {data, isLoading} = this.state
    return (
      <div className="browse-record-page">
        <TextHeader returnbtn={true} title="浏览记录" pathname="/my"></TextHeader>
        {
          isLoading ? <Loading /> :
          (
            <div className="browse-record-main">
              <div className="browse-wrap">
                  {/* <div className="browse-time">2018-07-31</div> */}
                  <div className="browse-main">
                      {
                        data&&data.length ? 
                        data.map(item => {
                          return (
                            <div className="browse-item">
                                <img width="90" src={item.groupId.image[0]} onClick={() => this.toProd(item.groupId.groupId)} />
                                <div className="browse-right">
                                    <div className="title">{item.groupId.name}</div>
                                    <div className="price"><span>￥</span>{item.groupId.defaultPrice}</div>
                                    <div className='time'>{item.updatedAt.split('.')[0]}</div>
                                </div>
                            </div>
                          )
                        })
                        : <p style={{textAlign: 'center'}}>暂无数据</p>
                      }
                      
                  </div>
              </div>
          </div>
          )
        }
      </div>
    )
  }
}
export default connect(
  state => ({user: state.user})
)(BrowseRecord)

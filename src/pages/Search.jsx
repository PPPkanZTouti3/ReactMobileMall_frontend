import React, { Component } from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as routerAction from '@/redux/actions/routerAction'
import SearchHead from '@/components/Header/SearchHead'
import '@/assets/styles/search.scss'
import Tag from '@/components/Tag/index.js'

class Search extends Component {
  constructor(props){
    super(props);
    this.state={
      history:['react','电脑'],
      searchHot:['rec','电脑','照片扫描仪','智能手表','功夫茶杯','广角镜头手机'],
      searchList:['react','react native','react nike','react 跑鞋','react全栈','reactjs']
    }
    console.log(this.props)
  }
  gotoList(v){
    sessionStorage.setItem('__search_prev_path__',this.props.location.pathname)
    this.props.history.push('/searchlist/'+v)
    this.props.router.changePath('/searchlist/'+v)
  }
  render() {
    let querystring=this.props.location.query?this.props.location.query.s:'';
    return (
      <div className="search-page">
        <SearchHead value={querystring} returnbtn={true} goto={this.gotoList.bind(this)}></SearchHead>
        {
          this.props.searchVal.length<1
          ?
          <div className="search-main">
            <div className="search-land search-history">
              <label>
                <span>最近搜索</span>
                <img src={require(`@/assets/images/delete.png`)} alt="delete"/>
              </label>
              <div className="search-tag">
                {
                  this.state.history.length>0?
                  this.state.history.map((v,i)=>{
                    return (<Tag key={i} onClick={()=>{
                     this.gotoList(v)
                    }}>{v}</Tag>)
                  })
                  :<div style={{textAlign:'center',padding:'20px'}}>暂无历史</div>
                }
              </div>
            </div>
            <div className="search-land search-hot">
              <label>
                <span>热门搜索</span>
              </label>
              <div className="search-tag">
                {
                  this.state.searchHot.length>0?
                  this.state.searchHot.map((v,i)=>{
                    return (<Tag key={i} onClick={()=>{
                      this.gotoList(v)
                    }}>{v}</Tag>)
                  })
                  :<div style={{textAlign:'center',padding:'20px'}}>暂无热门</div>
                }
              </div>
            </div>
          </div>
          :
          <div className="search-main searct-lists">
            <ul>
              {
                this.state.searchList.length>0?
                this.state.searchList.map((v,i)=>{
                  return (
                    <li key={i} className="list" onClick={()=>{
                      this.gotoList(v)
                    }}>{v}</li>
                  )
                })
                :
                <li style={{textAlign:'center',padding:'20px'}}>暂时数据</li>
              }
            </ul>
          </div>
        }
      </div>
    )
  }
}
export default connect(
  ({searchReducer})=>{
      return {
          searchVal:searchReducer.val
      }
  },
  (dispatch)=>{
      return {
          router:bindActionCreators(routerAction,dispatch)
      }
  }
)(Search)

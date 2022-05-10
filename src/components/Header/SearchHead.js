import React, {Component} from 'react'
//引入redux
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as searchAction from '@/redux/actions/searchAction'
//引入antd-mobile组件
import {SearchBar,Toast} from 'antd-mobile'
//引入路由跳转装饰器
import {withRouter} from 'react-router-dom'
import storageUtils from '@/utils/storageUtils'

import './search_header.scss'

class SearchHead extends Component {
    //默认参数
    static defaultProps={
        returnbtn:false
    }
    // 构造函数
    constructor(props){
        super(props);
        this.state={
            visible:false,
            selected: '',
            val:this.props.value||''
        }
    }
    // 返回某个页面
    returnPage(){
        // let prevPath=sessionStorage.getItem('__search_prev_path__');
        // if(this.props.location.pathname===prevPath){
        //     this.props.history.push('/index');
        //     sessionStorage.setItem('__search_prev_path__','/');
        // }else{
        //     this.props.history.push(prevPath)
        // }
        this.props.history.go(-1)
    }

    //组件装载完毕
    componentDidMount(){
        this.refs.search.focus();
        this.props.search.changeVal(this.state.val)
    }
    submit(){
        if(this.state.val===""){
            Toast.info("请输入搜索条件",1)
        }else{
            this.props.goto(this.state.val)
        }
    }

    render() {
        return (
            <div className="search-head">
                {
                    this.props.returnbtn
                    ?
                    <div className="left" onClick={()=>{
                        // 返回某个页面
                        this.returnPage()
                    }}>
                        <img src={require("@/assets/images/return.png")} alt="return"/>
                    </div>
                    :null
                }
                <div className="center">
                    <SearchBar
                        value={this.state.val}
                        showCancelButton 
                        cancelText={" "} 
                        ref="search" 
                        focus={true}
                        onSubmit={()=>{
                            this.submit()
                        }}
                        onChange={(val)=>{
                            this.setState({val})
                            this.props.search.changeVal(val)
                        }}
                        placeholder="搜索"></SearchBar>
                </div>
                <div className="right right-btn">
                    <button className="submit-btn" onClick={()=>{
                        let searchList = JSON.parse(storageUtils.getSearchList());
                        this.state.val && searchList.unshift(this.state.val)
                        searchList = Array.from(new Set(searchList))
                        if(searchList.length > 10) {
                            searchList = searchList.slice(0, 10)
                        }
                        storageUtils.saveSearchList(JSON.stringify(searchList))
                        this.submit()
                    }}>搜索</button>
                </div>
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
            search:bindActionCreators(searchAction,dispatch)
        }
    }
)(withRouter(SearchHead))
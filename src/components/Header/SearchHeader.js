import React, {Component} from 'react'
//props验证
import PropTypes from 'proptypes'
//引入antd-mobile组件
import {SearchBar,Icon,Popover,Modal} from 'antd-mobile'
//支持路由跳转
import {withRouter} from 'react-router-dom'
import { logout } from '@/redux/actions/loginAction'
import { connect } from 'react-redux'

import './search_header.scss'

const Item = Popover.Item;

class SearchHeader extends Component {
    //默认参数
    static defaultProps={
        returnbtn:false,
        value:'',
        pathname:'/'
    }
    //props验证
    static propTypes = {
        pathname:PropTypes.string.isRequired
    }
    //构造函数
    constructor(props){
        super(props);
        this.state={
            visible:false,
            selected: '',
        }
    }
    //返回某个页面
    returnPage(){
        this.props.history.go(-1)
        // this.props.history.push(this.props.pathname||'/')
        // sessionStorage.setItem('__search_prev_path__',this.props.pathname||'/')
    }
    //选择下拉菜单
    onSelect(opt){
        this.setState({
            visible: false,
            selected: opt.props.value,
        });
        if(opt.props.value === '退出') {
            Modal.alert('确定要退出吗？','', [
                { text: '取消', onPress: () => console.log('cancel') },
                { text: '确定', onPress: () => this.props.logout() },
              ])
        }
        //跳转到页面
        this.props.history.push(opt.props.path)
        sessionStorage.setItem('__search_prev_path__',opt.props.path)
    }
    //隐藏下拉菜单
    handleVisibleChange(visible){
        this.setState({
            visible,
        });
    }
    //选中搜索框时跳转到搜索页面，并带参数
    gotoSearchPage(){
        sessionStorage.setItem('__search_prev_path__',this.props.location.pathname)
        this.props.history.push({
            pathname:'/search',
            query: {
                s:this.props.value
            }
        })
    }

    render() {
        //下拉菜单列的图片
        const myImg = src => <img key={src} src={require(`@/assets/images/${src}.svg`)} className="am-icon am-icon-xs" alt="" />;
        //下拉菜单组
        let menuArr = [
            (<Item path="/index" value="首页" icon={myImg('index')}>首页</Item>),
            (<Item path="/cate" value="分类" icon={myImg('cate')}>分类</Item>),
            (<Item path="/cart" value="购物车" icon={myImg('cart')}>购物车</Item>),
            (<Item path="/my" value="个人中心" icon={myImg('my')}>个人中心</Item>),
            (<Item onClick={this.logout}  value="退出" icon={myImg('exit')}>退出</Item>)
        ]
        return (
            <div className="search-head">
                {/* 判断是否需要返回按钮 */}
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
                {/* 搜索框 */}
                <div className="center">
                    <SearchBar 
                        value={this.props.value||""} 
                        showCancelButton={false} 
                        placeholder="搜索"
                        cancelText={" "}
                        onFocus={()=>{
                            //选中搜索框时跳转到搜索页面，并带参数
                            this.gotoSearchPage()
                        }}
                    ></SearchBar>
                </div>
                <div className="right">
                    {/* 下拉菜单 */}
                    <Popover mask
                        overlayClassName="fortest"
                        overlayStyle={{ color: 'currentColor' }}
                        visible={this.state.visible}
                        overlay={menuArr}
                        align={{
                            overflow: { adjustY: 0, adjustX: 0 },
                            offset: [-10, 0],
                        }}
                        onVisibleChange={this.handleVisibleChange.bind(this)}
                        onSelect={this.onSelect.bind(this)}
                    >
                        <Icon key="1" onClick={()=>{
                            this.setState({
                                visible:true
                            })
                        }} type="ellipsis" />
                    </Popover>
                </div>
            </div>
        )
    }
}
//路由跳转装饰这个类
export default connect(
    state => ({user: state.user}),
    {logout}
)(withRouter(SearchHeader))
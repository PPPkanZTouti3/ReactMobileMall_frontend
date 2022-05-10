import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'proptypes'
import {NavBar,Icon,Popover,Modal} from 'antd-mobile'
import {withRouter} from 'react-router-dom'
import { logout } from '@/redux/actions/loginAction'

import './header.scss'

const Item = Popover.Item;

class Header extends Component {
    static propTypes = {
        title:PropTypes.string.isRequired
    }
    constructor(props){
        super(props);
        this.state={
            visible:false,
            selected: '',
        }
    }
    onSelect(opt){
        console.log(opt.props);
        this.setState({
            visible: false,
            selected: opt.props.value,
        });
        // logout
        if(opt.props.value === '退出') {
            Modal.alert('确定要退出吗？','', [
                { text: '取消', onPress: () => console.log('cancel') },
                { text: '确定', onPress: () => this.props.logout() },
              ])
        }
        this.props.history.push(opt.props.path)
        sessionStorage.setItem('__search_prev_path__',opt.props.path)
    }
    handleVisibleChange(visible){
        this.setState({
            visible,
        });
    }
    render() {
        const myImg = src => <img key={src} src={require(`@/assets/images/${src}.svg`)} className="am-icon am-icon-xs" alt="" />;
        return (
            <NavBar
            mode="light"
            icon={
                this.props.returnbtn?
                <div className="left" onClick={()=>{
                    this.props.history.go(-1)
                    sessionStorage.setItem('__search_prev_path__',this.props.pathname||'/')
                    }}>
                    <img src={require("@/assets/images/return.png")} alt="return"/>
                </div>
                :null
            }
            onLeftClick={() => console.log('onLeftClick')}
            rightContent={[
                <Popover
                    key="1" 
                    mask
                    overlayClassName="fortest"
                    overlayStyle={{ color: 'currentColor' }}
                    visible={this.state.visible}
                    overlay={[
                        (<Item path="/index" value="首页" icon={myImg('index')}>首页</Item>),
                        (<Item path="/cate" value="分类" icon={myImg('cate')}>分类</Item>),
                        (<Item path="/cart" value="购物车" icon={myImg('cart')}>购物车</Item>),
                        (<Item path="/my" value="个人中心" icon={myImg('my')}>个人中心</Item>),
                        (<Item value="退出" icon={myImg('exit')}>退出</Item>)
                    ]}
                    align={{
                        overflow: { adjustY: 0, adjustX: 0 },
                        offset: [-10, 0],
                    }}
                    onVisibleChange={this.handleVisibleChange.bind(this)}
                    onSelect={this.onSelect.bind(this)}
                >
                    <Icon onClick={()=>{
                        this.setState({
                            visible:true
                        })
                    }} type="ellipsis" />
                </Popover>,
            ]}
            >{this.props.title}</NavBar>
        )
    }
}
export default connect(
    state => ({
        user: state.user
    }),
    {logout}
)(withRouter(Header))
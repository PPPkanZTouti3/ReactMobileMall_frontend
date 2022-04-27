import React, {Component} from 'react'
//props验证
import PropTypes from 'proptypes'
//引入antd-mobile组件
import {NavBar} from 'antd-mobile'
//引入路由装饰器
import {withRouter} from 'react-router-dom'
//引入css
import './header.scss'

class TextHeader extends Component {
    //默认props
    static defaultProps={
        returnbtn:false,
        title:'标题',
        pathname:'/'
    }
    //验证props参数
    static propTypes = {
        title:PropTypes.string.isRequired,
        pathname:PropTypes.string.isRequired,
    }
    //返回到某页
    returnPage(){
        if(this.props.pathname===this.props.location.pathname){
            this.props.history.push('/')
            sessionStorage.setItem('__search_prev_path__','/')
        }else{
            this.props.history.push(this.props.pathname||'/')
            sessionStorage.setItem('__search_prev_path__',this.props.pathname||'/')
        }
    }
    render() {
        return (
            <NavBar
            mode="light"
            icon={
                this.props.returnbtn?
                <div className="left" onClick={()=>{
                    //返回到某页
                    this.returnPage()
                }}>
                    <img src={require("@/assets/images/return.png")} alt="return"/>
                </div>
                :null
            }
            onLeftClick={() => console.log('onLeftClick')}
            rightContent={[
                this.props.children
            ]}
            >{this.props.title}</NavBar>
        )
    }
}
export default withRouter(TextHeader)
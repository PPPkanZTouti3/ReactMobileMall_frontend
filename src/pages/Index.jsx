import React, { Component } from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as routerAction from '@/redux/actions/routerAction'
import {Route,Switch,Redirect} from 'react-router-dom'

//css
import '@/assets/styles/index.scss'
//组件
import NavFooter from '@/components/NavFooter'
import Main from '@/pages/Main'
import Cate from '@/pages/Cate'
import My from '@/pages/My'
import Cart from '@/pages/Cart'
import GoodsDetail from '@/pages/GoodsDetail';
import Order from '@/pages/Order';
import Search from '@/pages/Search';
import Searchlist from '@/pages/Searchlist';
import SuccessPay from './SuccessPay'
import Collection from './Collection'
import Sales from './Sales'
import News from './News'

class Index extends Component {
    // componentDidMount(){
    //     let prev=sessionStorage.getItem('__search_prev_path__')
    //     this.props.history.push(prev||'/')
    // }
    render(){
        // 判断用户常驻
        const user = this.props.user
        console.log('--------------index--------',user)
        if(!user._id || !user){
            return <Redirect to='/login'/>
        }
        
        let pathTF = false;
        this.props.paths.forEach(v=>{
            if(this.props.pathname===null&&(this.props.location.pathname===v)){
                pathTF=true
            }else if(v===this.props.pathname){
                pathTF=true
            }else if(this.props.location.pathname===v){
                pathTF=true
            }
        })
        this.props.router.changePath(this.props.location.pathname)
        return (
            <div className="index-page">
                <div className="main" style={{
                    marginBottom:pathTF?'50px':'0px'
                }}>
                    <Switch>
                        <Route exact path="/" component={Main}></Route>
                        <Route exact path="/index" render={()=><Redirect to="/"/>}></Route>
                        <Route exact path="/cate" component={Cate}></Route>
                        <Route path="/cate" component={Cate}></Route>
                        <Route path="/goods/:id" component={GoodsDetail}></Route>
                        <Route path="/success_pay/:id" component={SuccessPay}></Route>
                        <Route path="/order" component={Order}></Route>
                        <Route path="/collection" component={Collection}></Route>
                        <Route exact path="/search" component={Search}></Route>
                        <Route exact path="/searchlist/:s" component={Searchlist}></Route>
                        <Route exact path="/cart" component={Cart}></Route>
                        <Route exact path="/sales" component={Sales}></Route>
                        <Route exact path="/news" component={News}></Route>
                        <Route component={My}></Route>
                    </Switch>
                </div>
                {
                    pathTF?
                    <div className="footer">
                        <NavFooter></NavFooter>
                    </div>
                    :null
                }
            </div>
        )
    }
}

export default connect(
    // ({routerReducer})=>{
    //     return {
    //         paths:routerReducer.paths,
    //         pathname:routerReducer.path,
    //     }
    // },
    state => ({
        user: state.user,
        paths: state.routerReducer.paths,
        pathname: state.routerReducer.path
    }),
    (dispatch)=>{
        return {
            router:bindActionCreators(routerAction,dispatch)
        }
    }
)(Index)
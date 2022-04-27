import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Route,Switch,Redirect} from 'react-router-dom'

//css
import '@/assets/styles/index.scss'
//组件

import My from '@/pages/My/My'
import Orderlist from '@/pages/My/Orderlist'
import OrderDetail from '@/pages/My/OrderDetail'
import Helpback from '@/pages/My/Helpback'
import MyFeedback from '@/pages/My/MyFeedback'
import BrowseRecord from '@/pages/My/BrowseRecord'
import Mypurse from '@/pages/My/Mypurse'
import Integral from '@/pages/My/Integral'
import IntegralDetail from '@/pages/My/IntegralDetail'
import Address from '@/pages/My/Address'
import AddressAdd from '@/pages/My/AddressAdd'
import AddressUpdate from './AddressUpdate'

class Mypage extends Component {
    render(){
        return (
            <Switch>
                <Route exact path="/my" component={My}></Route>
                <Route exact path='/my/purse' component={Mypurse}></Route>
                <Route exact path='/my/integral' component={Integral}></Route>
                <Route exact path='/my/integraldetail' component={IntegralDetail}></Route>
                <Route exact path='/my/address' component={Address}></Route>
                <Route exact path='/my/addressadd' component={AddressAdd}></Route>
                <Route exact path='/my/address_update' component={AddressUpdate}></Route>
                <Route exact path='/my/orderlist' component={Orderlist}></Route>
                <Route exact path='/my/orderdetail/:orderId' component={OrderDetail}></Route>
                <Route exact path='/my/helpback' component={Helpback}></Route>
                <Route exact path='/my/feedback' component={MyFeedback}></Route>
                <Route exact path='/my/browserecord' component={BrowseRecord}></Route>
                <Route render={() => <Redirect to="/404" />} />
            </Switch>
        )
    }
}

export default connect()(Mypage)
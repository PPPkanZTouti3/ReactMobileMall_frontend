import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { logout } from '@/redux/actions/loginAction'
import { WhiteSpace, Modal } from 'antd-mobile'
import { Form, Input, Button, Radio, Space, Toast } from 'antd-mobile-v5'
import { LeftOutline, CheckCircleFill } from 'antd-mobile-icons'
import { reqBuyProd, reqCancelOrder, reqOrderHasPayed, reqDeleteCartProd, reqHandleSalesAndStock } from '@/api'
import PubSub from 'pubsub-js'
import { buyProd } from '@/config'
import homeSvg from '../assets/images/index.svg'
import '../assets/styles/userInfo.scss'

class SuccessPay extends Component {

    backButton = () => {
        this.props.history.push('/');
    }

    homeButton = () => {
        this.props.history.replace('/');
    }

    toOrderList = () => {

    }

    cancelOrder = () => {
        const orderId = window.location.href.split('/success_pay/')[1]
        Modal.alert('确定取消订单？','', [
            { text: '取消', onPress: () => console.log('cancel') },
            { text: '确定', onPress: async () => {
                let res =  await reqCancelOrder(orderId)
                if(res.status === 0) {
                    Toast.show({
                        content: '取消订单成功',
                        icon: 'success',
                        afterClose: () => {
                            this.props.history.push('/')
                        }
                      })
                  }
                  else {
                    Toast.show({
                      content: '取消订单异常',
                      icon: 'fail',
                    })
                  }
            }},
          ])
    }

    async componentDidMount() {
        let reg = new RegExp(/[0-9]{19}/i)
        let orderId = reg.exec(window.location.href)[0]
        // let orderStatus = await reqAliPayOrder({orderId})
        // console.log(orderStatus)
        
        const hasPayedProd = JSON.parse(localStorage.getItem('hasPayedProd'))
        const productList = JSON.parse(localStorage.getItem('ready_to_buy'))
        const userId = this.props.user._id

        // 删除购物车中已购买的商品
        await reqDeleteCartProd({
            _ids: hasPayedProd
        })

        // 处理已购买的商品的销量和库存
        await reqHandleSalesAndStock({productList})

        await reqBuyProd(userId, productList, buyProd)

        // 修改目标订单状态
        let res = await reqOrderHasPayed(orderId);

        
        // if(res.status === 0) {
        //   this.props.history.push('/success_pay/' + orderCode)
        // }
        if(res.status) {
          Toast.show({
            content: '支付异常',
            icon: 'fail',
            afterClose: () => {this.props.history.push('/')}
          })
        }
    }

    render() {
        let reg = new RegExp(/[0-9]{19}/i)
        let orderId = reg.exec(window.location.href)[0]
        const { userName, _id } = this.props.user;

        return (
            <div className='user-info-page'>
                {/* header */}
                <div className='user-info-header'>
                    <div className='user-info-back' onClick={this.backButton}>
                        <LeftOutline fontSize={24} />
                    </div>
                    <div className='user-info-title'>支付</div>
                    <div className='user-info-home' onClick={this.homeButton}>
                        <img src={homeSvg} />
                    </div>
                </div>

                {/* main */}
                <div className='user-info-main'>
                    <div className='green-circle'>
                        <CheckCircleFill color='#09bb07' fontSize={96}/>
                    </div>
                    <div className='success-pay-text'>支付成功</div>
                    <div className='success-pay-extra'>
                        收到该订单了，将尽快为您发货，可以前往
                        <Link to={'/my/orderdetail/' + orderId}>订单详情</Link>
                        随时查看状态
                    </div>
                    <WhiteSpace />
                    <WhiteSpace />
                    <Button block color='warning' onClick={this.toOrderList}>订单列表</Button>
                    <WhiteSpace />
                    <Button block onClick={this.cancelOrder}>取消订单</Button>
                </div>
            </div>
        )
    }
}

export default connect(
    state => ({ user: state.user }),
)(withRouter(SuccessPay));
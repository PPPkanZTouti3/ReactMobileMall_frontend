import React, { Component } from 'react'
import {connect} from 'react-redux'
import { Button } from 'antd-mobile'
import TextHeader from '@/components/Header/TextHeader'
import { reqOrderDetail } from '@/api'

import '@/assets/styles/orderdetail.scss'

class OrderDetail extends Component {
  constructor(props){
      super(props)
      this.state = {
        orderId:props.match.params.orderId||null,
        orderInfo: {},
        address: {}
      }
  }

  payOrder = () => {
      
  }

  getOrderDetail = () => {
    (async () => {
        const orderId = window.location.href.split('/my/orderdetail/')[1];
        let res = await reqOrderDetail(orderId);
        const data = res.data[0];
        const address = this.props.user.address.filter((item) => {
            return data.addressId === item._id;
        })[0]
        this.setState({
            orderId: data.orderId,
            orderInfo: data,
            address
        })
        console.log('=============',this.state.orderInfo.products,address)
    })()
  }
  

  componentDidMount(){
    this.getOrderDetail()
  }
  render() {
    const { orderInfo, address, orderId } = this.state;

    return (
      <div className="orderDetail-page">
        <TextHeader returnbtn={true} title="订单详情"></TextHeader>
        <div className="orderDetail-main">
            {
                this.state.orderId?
                <div className="orderDetail">
                    {/* <div className="logistics">
                        <img className="wuliu" src={require(`@/assets/images/unrecieve.png`)} alt=""/>
                        <div className="info">
                            <div className="desc">
                            您的订单已签收。感谢您在京东购物，欢迎再次光临。参加评价还能赢取京豆哟。
                            </div>
                            <div>2018-06-17 17:03:13</div>
                        </div>
                        <img className="next" src={require(`@/assets/images/next.png`)} alt=""/>
                    </div> */}
                    <div className="section">
                        <div className="inner-line">
                            <span className="title">订单状态：</span>
                            <div className="content">
                                { 
                                    orderInfo.payStatus === 0 ? '待付款'
                                    : (orderInfo.payStatus === 1 ? '待发货' : (
                                        orderInfo.payStatus === 2 ? '运输中' : '已签收'
                                    ))
                                 }
                            </div>
                        </div>
                        <div className="inner-line">
                            <span className="title">订单编号：</span>
                            <div className="content">{orderId}</div>
                        </div>
                        <div className="inner-line">
                            <span className="title">下单时间：</span>
                            <div className="content">{orderInfo.payStartTime}</div>
                        </div>
                    </div>
                    { orderInfo.payStatus ? null : (
                        <div className="section-btn">
                            <Button type="primary" size="small" onClick={this.payOrder} >支付订单</Button>
                        </div>
                    ) }
                    <div className="section section-top">
                        <div className="inner-line">
                            <span className="title">商品金额：</span>
                            <div className="content">{Number(orderInfo.totalPrice).toFixed(2)}</div>
                        </div>
                        <div className="inner-line">
                            <span className="title">收货地址：</span>
                            <div className="content">{address.province + address.city + address.area + address.address + ''}</div>
                        </div>
                        <div className="inner-line">
                            <span className="title">收货人：</span>
                            <div className="content">{address.recipient}</div>
                        </div>
                        <div className="inner-line">
                            <span className="title">联系电话：</span>
                            <div className="content">{address.phone}</div>
                        </div>
                        <div className="inner-line">
                            <span className="title">快递公司：</span>
                            <div className="content">{
                                orderInfo.payStatus === (2 || 3) ? orderInfo.expressCompany : '暂无'
                            }</div>
                        </div>
                        <div className="inner-line">
                            <span className="title">快递单号：</span>
                            <div className="content">{
                                orderInfo.payStatus === (2 || 3) ? orderInfo.expressNumber : '暂无'
                            }</div>
                        </div>
                        { orderInfo.products ?
                            orderInfo.products.map(prod => (
                                <div className="order-goods">
                                    <div className="goods-item">
                                        <div className="goods-cover">
                                            <img src={prod.productImage} alt="" />
                                        </div>
                                        <div className="goods-cont">
                                            <div className="goods-info">
                                                <div className="info-desc">
                                                    <div className="goods-name">                              
                                                        {prod.productName}
                                                    </div>
                                                    <div className="goods-desc">                              
                                                        {prod.desc}
                                                    </div>
                                                </div>
                                                <div className="info-price">
                                                    <p className="price">{prod.price.toFixed(2)}</p>
                                                    <p className="count">x{prod.count}</p>
                                                </div>
                                            </div>
                                            <div className="goods-btns"></div>
                                        </div>
                                    </div>
                                </div>
                            )) : null 
                        } 
                    </div>
                    <div className="order_total">
                        <ul>
                            <li>商品总额<span className="price">¥ {Number(orderInfo.productPrice).toFixed(2)}</span></li>
                            <li>优惠金额<span className="price">¥ 0.00</span></li>
                            <li>运费<span className="price">+ ¥ 0.00</span></li>
                        </ul> 
                        <p className="total">实付金额：<span>¥ {Number(orderInfo.totalPrice).toFixed(2)}</span></p>
                    </div>
                </div>
                :<div style={{padding:'10px',textAlign:'center'}}>缺少参数</div>
            }
        </div>
      </div>
    )
  }
}
export default connect(
    state => ({user: state.user})
)(OrderDetail)

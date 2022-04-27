import React, { Component } from 'react'
import {connect} from 'react-redux'
import { Button } from 'antd-mobile'
import TextHeader from '@/components/Header/TextHeader'

import '@/assets/styles/orderdetail.scss'

class OrderDetail extends Component {
  constructor(props){
      super(props)
      this.state = {
        orderId:props.match.params.orderId||null
      }
  }
  componentDidMount(){
      console.log(this.props)
  }
  render() {
    return (
      <div className="orderDetail-page">
        <TextHeader returnbtn={true} title="订单详情" pathname="/my/orderlist"></TextHeader>
        <div className="orderDetail-main">
            {
                this.state.orderId?
                <div className="orderDetail">
                    <div className="logistics">
                        <img className="wuliu" src={require(`@/assets/images/unrecieve.png`)} alt=""/>
                        <div className="info">
                            <div className="desc">
                            您的订单已签收。感谢您在京东购物，欢迎再次光临。参加评价还能赢取京豆哟。
                            </div>
                            <div>2018-06-17 17:03:13</div>
                        </div>
                        <img className="next" src={require(`@/assets/images/next.png`)} alt=""/>
                    </div>
                    <div className="section">
                        <div className="inner-line">
                            <span className="title">订单状态：</span>
                            <div className="content">已签收</div>
                        </div>
                        <div className="inner-line">
                            <span className="title">订单编号：</span>
                            <div className="content">180614110324166</div>
                        </div>
                        <div className="inner-line">
                            <span className="title">下单时间：</span>
                            <div className="content">2018-06-17 13:23:21</div>
                        </div>
                    </div>
                    <div className="section-btn">
                        <Button type="primary" size="small">支付订单</Button>
                    </div>
                    <div className="section section-top">
                        <div className="inner-line">
                            <span className="title">商品金额：</span>
                            <div className="content">¥65.90</div>
                        </div>
                        <div className="inner-line">
                            <span className="title">收货地址：</span>
                            <div className="content">广东广州市天河区车陂街道车陂隆兴公大街坑边西一巷9号105</div>
                        </div>
                        <div className="inner-line">
                            <span className="title">收货人：</span>
                            <div className="content">苏文濠 13229710047</div>
                        </div>
                        <div className="inner-line">
                            <span className="title">配送方式：</span>
                            <div className="content">京东快递</div>
                        </div>
                        <div className="order-goods">
                            <div className="goods-item">
                                <div className="goods-cover">
                                    <img src="http://img10.360buyimg.com/n2/jfs/t18046/308/1462286824/185242/64c962d9/5acaf911N16a15a39.jpg.dpg" alt="" />
                                </div>
                                <div className="goods-cont">
                                    <div className="goods-info">
                                        <div className="info-desc">
                                            <div className="goods-name">                              
                                                包邮 跨平台桌面应用开发 基于Electron与NW.js Electron NW.js框架开
                                            </div>
                                        </div>
                                        <div className="info-price">
                                            <p className="price">¥65.90</p>
                                            <p className="count">x1</p>
                                        </div>
                                    </div>
                                    <div className="goods-btns"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="order_total">
                        <ul>
                            <li>商品总额<span className="price">¥ 65.90</span></li>
                            <li>优惠金额<span className="price">¥ 0.00</span></li>
                            <li>运费<span className="price">+ ¥ 0.00</span></li>
                        </ul> 
                        <p className="total">实付金额：<span>¥ 65.90</span></p>
                    </div>
                </div>
                :<div style={{padding:'10px',textAlign:'center'}}>缺少参数</div>
            }
        </div>
      </div>
    )
  }
}
export default connect()(OrderDetail)

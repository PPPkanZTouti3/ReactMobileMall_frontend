import React, { Component } from 'react'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom'
import { Button, Toast, Picker, List, TextareaItem, Modal } from 'antd-mobile'
import { Toast as Toast_v5 } from 'antd-mobile-v5'
import dateUtils from '@/utils/dateUtils'
import orderCodeUtils from '@/utils/orderCodeUtils'
import TextHeader from '@/components/Header/TextHeader'
import _ from 'underscore'
import Loading from '@/components/Loading'
import '@/assets/styles/orderdetail.scss'

import Wuliu from '@/assets/images/address-b.svg'
import { reqAddOrder } from '@/api'
import { reqAliPay, reqAliPayOrder } from '../api'

class Order extends Component {
  constructor(props){
      super(props)
      this.state = {
        token:null,
        loading:true,
        orderInfo:null,
        addressList:[],
        addr:null,
        presetArr:[
          {
            label:'快递',
            value:1
          },{
            label:'送货上门',
            value:2
          },{
            label:'到店自提',
            value:3
          }
        ]
      }
  }
  //获取订单
  getOrderInfo(){
      let order = sessionStorage.getItem('goodDetailData')
      
      if(order===null){
          Toast.info("没有订单", 1);
          // setTimeout(()=>{
          //   let prevPath = sessionStorage.getItem('__search_prev_path__')
          //   this.props.history.push(prevPath||'/')
          // },2000)
          return;
      }
      order=JSON.parse(order);
      let num=0
      let allQuantity=0
      let wArr=[]
      order.items.forEach((ktem,k)=>{
        ktem.productPrice = parseFloat(ktem.productPrice);
        num = num + (ktem.productPrice * ktem.selectQuantity);
        var pickupWayArr = ktem.pickupWay.split(",");
        wArr=wArr.concat(pickupWayArr)
        allQuantity += ktem.selectQuantity
      })
      //合计
      order.totalPrice = num.toFixed(2)
      order.allQuantity = allQuantity
      order.idx = 1;//购买
      let uniqArr = _.uniq(wArr)
      let presetArr = ['快递', '送货上门', '到店自提'];

      let deliveryArr = uniqArr.map((jtem,j)=>{
        return {
          value:jtem,
          label:presetArr[jtem-1]
        }
      })
      order.uniqArr = uniqArr;
      order.pickupWayArr = wArr;
      order.deliveryArr = deliveryArr;
      order.deliveryInfo = deliveryArr[0];
      order.leaveMsg=""
      this.setState({
        orderInfo:order
      })
      console.log('--------订单--------')
      console.log(order)
  }
  //获取我的地址列表
  getAddressList(cb){
    (async ()=>{
      let params = { token: this.state.token}
      let data = this.props.user.address;
      console.log(data, params)
      this.setState({
        addressList:data,
        loading:false
      })
      cb && cb(data);
    })()
  }
  //设置显示的地址
  setAddress(){
    var that=this;
    var addr=this.props.location.query?this.props.location.query.addr:false;
    if (!addr){
        that.getAddressList((data)=>{
            let index = _.findIndex(data,(item)=>{
                return item.isDefault === 1;
            })
            this.setState({
              addr:data[index]
            })
        });
    }else{
        var address = sessionStorage.getItem('address');
        if (address===null){
            that.getAddressList((data)=>{
                var index = _.findIndex(data, (item)=>{
                    return item.isDefault === true;
                })
                this.setState({
                  addr:data[index]
                })
            });
        }else{
            that.getAddressList();
            this.setState({
              addr:JSON.parse(address)
            })
        }
    }
  }

  onlinePay = () => {
    const orderCode = orderCodeUtils();
    // let products = [];
    // this.state.orderInfo.items.forEach(prod => {
    //   products.push(prod.productId)
    // });
    
    let endTime = dateUtils(0,30);
    let data = {
      orderId: orderCode,
      userId: this.props.user._id,
      addressId: this.state.addr._id,
      payStatus: 0, // 0 未支付 1 已支付
      deliveryFee: 0,
      productPrice: Number(this.state.orderInfo.totalPrice),
      totalPrice: Number(this.state.orderInfo.totalPrice),
      payStartTime: dateUtils(),
      payEndTime: endTime,
      products: this.state.orderInfo.items// 存放商品的数组
    }
    localStorage.setItem('ready_to_buy', JSON.stringify(data.products))
    console.log(data)
    Modal.alert((<>
      <div className='online-pay-title'>确认支付
        <span className='online-pay-price'>{this.state.orderInfo&&this.state.orderInfo.totalPrice}</span>元！
      </div>
      <div className='online-pay-time'>截止时间：{endTime}</div>
    </>),'', [
      { text: '取消', onPress: async () => {
        data.payStatus = 0;
        let res = await reqAddOrder(data);
        if(res.status === 0) {
          this.props.history.push('/my/orderlist')
        } else {
          Toast_v5.show({
            content: '操作异常',
            icon: 'fail',
          })
        }
      } },
      { text: '确定', onPress: async () => {
        let res = await reqAddOrder(data);
        if(res.status) {
          Toast_v5.show({
            content: '支付异常',
            icon: 'fail',
          })
        }
        else {
          // 支付功能 有时间研究一下zfb的api
          let url = await reqAliPay(
            orderCode,
            this.state.orderInfo.totalPrice
          );
          // 跳转支付宝支付页面
          window.location.href = url;
        }
      }},
    ])
  }

  componentDidMount(){
    this.getOrderInfo()
    this.setAddress()
    console.log(this.props)
  }
  render() {
    //处理跳转到我的地址页面选择地址返回时，无法返回到商品页的问题
    let orderPrevPath=sessionStorage.getItem('__order_prev_path__');
    if(orderPrevPath){
      sessionStorage.setItem('__search_prev_path__',orderPrevPath)
    }
    let prevPath = sessionStorage.getItem('__search_prev_path__')
    console.log('=========',this.state.orderInfo)
    return (
      <div className="orderDetail-page">
        <TextHeader returnbtn={true} title="确认订单" pathname={prevPath||'/'}></TextHeader>
        {
          this.state.loading?
        <Loading/>
          :
        <div className="orderDetail-main">
            {
                this.state.orderInfo?
                <div className="orderDetail">
                    <div className="logistics" onClick={()=>{
                      this.props.history.push('/my/address')
                      sessionStorage.setItem('__order_prev_path__',prevPath)
                      sessionStorage.setItem('__address_prev_path__','/order')
                      sessionStorage.setItem('__search_prev_path__','/order')
                    }}>
                        <img className="wuliu" src={Wuliu} alt=""/>
                        {
                          this.state.addressList.length>0?
                          <div className="info">
                              <div>{this.state.addr&&this.state.addr.recipient} {this.state.addr&&this.state.addr.phone}</div>
                              <div className="desc">
                                {this.state.addr&&this.state.addr.province}
                                {this.state.addr&&this.state.addr.city}
                                {this.state.addr&&this.state.addr.area}
                                {this.state.addr&&this.state.addr.address}
                              </div>
                          </div>
                          :
                          <div className="info">
                            <div>请选择收货地址</div>
                          </div>
                        }
                        <img className="next" src={require(`@/assets/images/next.png`)} alt=""/>
                    </div>
                    <div className="section section-top">
                        <div className="inner-line">
                            <span className="title">已选商品</span>
                        </div>
                        <div className="order-goods">
                          {
                            this.state.orderInfo&&this.state.orderInfo.items?
                            this.state.orderInfo.items.map((item,i)=>{
                              return (
                                <div key={i} className="goods-item">
                                  <div className="goods-cover">
                                      <img alt="" src={item.productImage} />
                                  </div>
                                  <div className="goods-cont">
                                      <div className="goods-info">
                                          <div className="info-desc">
                                              <div className="goods-name">                              
                                                  {item.productName}
                                              </div>
                                          </div>
                                          <div className="info-price">
                                              <p className="price">{item.productPrice.toFixed(2)}</p>
                                              <p className="count">x{item.selectQuantity}</p>
                                          </div>
                                      </div>
                                      <div className="goods-sku">
                                        {item.skuStr}
                                      </div>
                                      <div className="goods-btns"></div>
                                  </div>
                              </div>
                              )
                            })
                            :null
                          }
                        </div>
                    </div>
                    <div className="section-top">
                      <List>
                        <Picker data={this.state.orderInfo&&this.state.orderInfo.deliveryArr} value={["1"]} cols={1} className="forss">
                          <List.Item><span style={{fontSize:'14px'}}>运送方式</span></List.Item>
                        </Picker>
                        <TextareaItem
                          title="留言"
                          placeholder="输入留言"
                          rows={3}
                          ref={el => this.autoFocusInst = el}
                          autoHeight
                        />
                      </List>
                    </div>
                    <div className="order_total">
                        <ul>
                            <li>商品金额<span className="price">¥ {this.state.orderInfo&&this.state.orderInfo.totalPrice}</span></li>
                            <li>运费<span className="price">+ ¥ 0.00</span></li>
                        </ul> 
                        <p className="total">总价：<span>¥ {this.state.orderInfo&&this.state.orderInfo.totalPrice}</span></p>
                    </div>
                    <div className="section">
                      <Button type="primary" onClick={this.onlinePay}>在线支付</Button>
                    </div>
                </div>
                :<div style={{padding:'10px',textAlign:'center'}}>缺少参数</div>
            }
        </div>
        }
      </div>
    )
  }
}
export default connect(
  state => ({user: state.user})
)(Order)
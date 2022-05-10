import React, { Component } from 'react'
import {connect} from 'react-redux'
import { Tabs, SearchBar, SwipeAction, PullToRefresh } from 'antd-mobile'
import Header from '@/components/Header/Header'
import Loading from '@/components/Loading'
import { reqOrderList } from '@/api'
import Countdown from '@/components/Countdown'
import '@/assets/styles/orderlist.scss'

class Orderlist extends Component {
  constructor(props){
    super(props)
    var orderIndex=sessionStorage.getItem('__session_order__');
    this.state={
      orderIndex:orderIndex !==null ? parseInt(orderIndex,10) : 1,
      tabs:[
        { title: '全部', sub: 0 },
        { title: '待付款', sub: 1 },
        { title: '待发货', sub: 2 },
        { title: '待收货', sub: 3 },
        { title: '待评价', sub: 4 },
      ],
      val:'', // 搜索输入的值
      down:false,
      data: null,
      height: document.documentElement.clientHeight-134,
      list:[],
      status:orderIndex!==null?parseInt(orderIndex,10):0,
      pageNumber:1,
      pageSize:10,
      totalPages:1,
      loading:true,
      orderTip:false,
      refreshing:true
    }
  }
  getOrderList(cb){
    (async ()=>{
      let params = {
        pageNumber:this.state.pageNumber,
        pageSize:this.state.pageSize,
        status:this.state.status
      }
      let res = await reqOrderList(this.props.user._id)
      if(res.status === 0) {
        console.log(res)
        this.setState({
          data:res.data,
          list:res.data,
          loading:false,
          orderTip:res.data.length>0?false:true
        },()=>{
          cb&&cb()
        })
      }
      else {
        this.setState({
          data:[],
          loading:false,
          orderTip:res.data.length>0?false:true
        },()=>{
          cb&&cb()
        })
      }
      
    })()
  }
  changeStatus(index){
    
    const { data } = this.state;
    console.log('index',data)
    let list = [];
    if(index === 0) {
      list = data;
    }
    else if(index === 1) {
      list = data.filter(item => item.payStatus === 0 && item.isOverTime === 0)
    }
    else if(index === 2) {
      list = data.filter(item => item.payStatus === 1)
    }
    else if(index === 3) {
      list = data.filter(item => item.payStatus === 2)
    }
    else {
      list = data.filter(item => item.payStatus === 3)
    }
    this.setState({
      orderIndex:index,
      status:index,
      loading:false,
      orderTip:false,
      list:list,
      pageNumber:1,
      pageSize:1,
      refreshing:false
    })
  }
  onRefresh(){
    
  }

  payOrder = () => {

  }

  componentDidMount(){
    this.getOrderList()
    this.setState({
      list: this.state.data || []
    })
  }
  
  render() {
    return (
      <div className="order-page">
        <Header returnbtn={true} title="我的订单" pathname="/my"></Header>
        <div className="order-main">
          <div className="search-box">
            {
              this.state.val.length>0?
              null
              :
              <span style={{width:'7px',display:'block','height':'34px'}}></span>
            }
            
            <div>
              <SearchBar
              value={this.state.val}
              ref="search" 
              focus={true}
              showCancelButton 
              cancelText={" "}
              onSubmit={()=>{
                
              }}
              onChange={(val)=>{
                this.setState({val})
              }}
              placeholder="商品名称/商品编号/订单号"></SearchBar>
            </div>
            {
              this.state.val.length>0?
              <button>搜索</button>
              :null
            }
          </div>
          
          <Tabs tabs={this.state.tabs}
              initialPage={this.state.orderIndex}
              tabBarPosition="top"
              swipeable={false}
              renderTab={tab => <span>{tab.title}</span>}
              onChange={(tab, index) => {
                sessionStorage.setItem('__session_order__',index)
                this.changeStatus(index)
              }}
            >
              <PullToRefresh
                damping={60}
                ref={el => this.ptr = el}
                style={{
                  height: this.state.height,
                  overflow: 'auto',
                }}
                indicator={this.state.down ? {} : { deactivate: '上拉加载' }}
                direction={this.state.down ? 'down' : 'up'}
                refreshing={this.state.refreshing}
                onRefresh={() => {
                  this.setState({ refreshing: true });
                  setTimeout(() => {
                    this.setState({ refreshing: false });
                  }, 1000);
                }}
              >
                {
                  this.state.loading?
                  <Loading/>
                  :null
                }
                <div className="order-div"  style={{
                  height: this.state.list.length>0?'auto':this.state.height-300
                }}>
                  {
                    this.state.list.length>0?
                    this.state.list.map((item,i)=>{
                      return (
                        <SwipeAction
                          key={i}
                          style={{ backgroundColor: '#f5f5f9',paddingBottom:'10px' }}
                          right={[
                            {
                              text: '删除',
                              onPress: () =>{
                                console.log('delete')
                                return false;
                              },
                              style: { backgroundColor: '#F4333C', color: 'white' },
                            },
                          ]}
                          onOpen={() => console.log('global open')}
                          onClose={() => {
                            console.log('global close')
                            return false;
                          }}
                        >
                        <div className="order-item">
                          <div className="order-id">
                            <span className="label">订单号：</span>
                            {item.orderId}
                          </div>
                          <div className="order-state">
                            <div className="o-left">
                              <div className="state">
                                <span>状&nbsp;&nbsp;&nbsp;&nbsp;态：</span>
                                <span>
                                  {
                                    item.payStatus === 0 ? '待付款' : (
                                      item.payStatus === 1 ? '待发货' : (
                                        item.payStatus === 2 ? '运输中' : '已签收'
                                      )
                                    )
                                  }
                                </span>
                              </div>
                              <div className="price">
                                <span>总&nbsp;&nbsp;&nbsp;&nbsp;价：</span>
                                <span>￥{item.totalPrice.toFixed(2)}</span>
                              </div>
                            </div>
                            {
                              item.isOverTime ? (
                                <div className="o-right">
                                    <p className='over-time'>已超时</p>
                                  </div>
                              ) : (
                                item.payStatus ? null : (
                                  <div className="o-right">
                                    <button onClick={this.payOrder}>支付</button>
                                    <Countdown 
                                      payEndTime={item.payEndTime}
                                      orderId={item.orderId}
                                    />
                                  </div>
                                )
                              )
                            }
                          </div>
                          <div className="order-list" onClick={()=>{
                            this.props.history.push({
                              pathname:'/my/orderdetail/'+item.orderId
                            })
                          }}>
                            {
                                item.products && item.products.map((jtem,j)=>{
                                  return (
                                    <div key={j} className="order-goods">
                                      <img src={jtem.productImage} alt=""/>
                                      <div className="right">
                                        <div className="title">{jtem.productName}</div>
                                        <div className="piece">
                                          <span>￥{jtem.price.toFixed(2)}</span>
                                          <span>{jtem.count}件</span>
                                        </div>
                                        <div className="sku">{jtem.desc}</div>
                                      </div>
                                    </div>
                                  )
                                })
                            }
                          </div>
                        </div>
                        </SwipeAction>
                      )
                    })
                    :
                    this.state.orderTip?
                    <div className="order-tip">暂无订单</div>
                    :null
                  }
                </div>
              </PullToRefresh>
            </Tabs>
        </div>
      </div>
    )
  }
}
export default connect(
  state => ({user: state.user})
)(Orderlist)

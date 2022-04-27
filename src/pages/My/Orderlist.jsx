import React, { Component } from 'react'
import {connect} from 'react-redux'
import { Tabs, SearchBar, SwipeAction, PullToRefresh } from 'antd-mobile'
import Header from '@/components/Header/Header'
import Loading from '@/components/Loading'
import axios from 'axios'

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
        { title: '待评价', sub: 3 },
        { title: '退货售后', sub: 4 },
      ],
      val:'',
      down:false,
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
      let {data} = await axios.post('/api/alliance/order/list',params).then(res=>res)
      this.setState({
        list:data.data,
        loading:false,
        orderTip:data.data.length>0?false:true
      },()=>{
        cb&&cb()
      })
    })()
  }
  changeStatus(index){
    this.setState({
      orderIndex:index,
      status:index,
      loading:true,
      orderTip:false,
      list:[],
      pageNumber:1,
      pageSize:1,
      refreshing:false
    },()=>{
      this.getOrderList()
    })
  }
  onRefresh(){
    
  }
  componentDidMount(){
    this.getOrderList()
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
                                <span>{item.orderStatusTxt}</span>
                              </div>
                              <div className="price">
                                <span>总&nbsp;&nbsp;&nbsp;&nbsp;价：</span>
                                <span>￥{item.orderMoney.toFixed(2)}</span>
                              </div>
                            </div>
                            <div className="o-right">
                              <button>支付</button>
                            </div>
                          </div>
                          <div className="order-list" onClick={()=>{
                            this.props.history.push({
                              pathname:'/my/orderdetail/'+item.orderId
                            })
                          }}>
                            {
                                item.orderItems.map((jtem,j)=>{
                                  return (
                                    <div key={j} className="order-goods">
                                      <img src={require(`@/assets/images/test/1.jpg`)} alt=""/>
                                      <div className="right">
                                        <div className="title">{jtem.name}</div>
                                        <div className="piece">
                                          <span>￥{jtem.price}</span>
                                          <span>{jtem.quantity}件</span>
                                        </div>
                                        <div className="sku">{jtem.sku}</div>
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
export default connect()(Orderlist)

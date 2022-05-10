import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import * as goodsAction from '@/redux/actions/goodsAction'
import SearchHeader from '@/components/Header/SearchHeader'
import '@/assets/styles/searchlist.scss'
import {Icon, List, PullToRefresh} from 'antd-mobile'
import Loading from '@/components/Loading'
import classnames from 'classnames'
import $ from 'jquery'
import { Toast } from 'antd-mobile-v5'
import { reqSearchProd, reqSearchProdFunc } from '@/api'
import { searchProd } from '@/config'
const Item = List.Item;
export class SearchList extends Component {
  constructor(props){
    super(props)
    this.state={
      complexAlert:false,
      priceAlert:false,
      filterAlert:false,
      height: document.documentElement.clientHeight-86,
      pageNumber:1,
      pageSize:10,
      totalPages:1,
      loading:true,
      orderTip:false,
      refreshing:true,
      goods: [],
      tagIndex: 0,
      priceSort: null,
      max: '',
      min: ''
    }
  }
  resize(){
    let self =this;
    $(window).on('resize',()=>{
      self.setState({
        height:document.documentElement.clientHeight-86
      })
    })
  }
  async componentDidMount(){
    const userId = this.props.user._id
    await reqSearchProdFunc(userId, this.props.match.params.s, searchProd)
    let res = await reqSearchProd(this.props.match.params.s);
    if(res.status === 0) {
      this.setState({
        goods: res.data
      })
    }
    // this.props.goodsPatch.getGoodsList(this.props.match.params.s)
    this.resize()
  }
  render() {
    const { goods } = this.state;
    return (
      <div className="searchlist-page">
        <SearchHeader value={this.props.match.params.s} returnbtn={true} pathname={'/search'}></SearchHeader>
        {/* <div className={classnames({
          'complex-alert':true,
          show:this.state.complexAlert
        })}
          onClick={(e)=>{
            this.setState({
              complexAlert:!this.state.complexAlert,
              priceAlert:false
            })
          }}
        >
          <ul className="alert">
            <li className="selected" onClick={(e)=>{e.stopPropagation();}}>综合</li>
            <li onClick={(e)=>{e.stopPropagation();}}>最新上架</li>
            <li onClick={(e)=>{e.stopPropagation();}}>评价最多</li>
          </ul>
        </div> */}
        <div className={classnames({
          'complex-alert':true,
          show:this.state.priceAlert
        })}
          onClick={(e)=>{
            this.setState({
              complexAlert:false,
              priceAlert:!this.state.priceAlert
            })
          }}
        >
          <ul className="alert">
            <li className={this.state.priceSort === 0 ? 'active' : null} onClick={(e)=>{
              e.stopPropagation();
              let goods = this.state.goods.sort((a, b) => a.defaultPrice - b.defaultPrice)
              this.setState({
                priceSort: 0,
                priceAlert: false,
                goods
              })
            }}>价格最低</li>
            <li className={this.state.priceSort ? 'active' : null} onClick={(e)=>{
              e.stopPropagation();
              let goods = this.state.goods.sort((a, b) => b.defaultPrice - a.defaultPrice)
              this.setState({
                priceSort: 1,
                priceAlert: false,
                goods
              })
              }}>价格最高</li>
          </ul>
        </div>
        {/* 筛选抽屉 */}
        <div className="filter-alert">
          <div className={classnames({
            'filter-alert-bg':true,
            show:this.state.filterAlert
          })}
            onClick={()=>{
              this.setState({
                filterAlert:false
              })
            }}
          ></div>
          <div className={classnames({
            'filter-box':true,
            show:this.state.filterAlert
          })}>
            <div className={classnames({
              main:true,
              show:this.state.filterAlert
            })}>
              <div className="mod-list">
                <List className="my-list">
                  {/* <Item extra="全部分类" arrow="horizontal" onClick={() => {}}>分类</Item> */}
                </List>
              </div>
              <ul className="mod-list">
                <li className="left-line">价格</li>
                <li>
                  <div className="filterlayer-price">
                    <input type="text" value={this.state.min} placeholder="最低价" onChange={(e) => {this.setState({min: e.target.value})}} />
                    <span></span>
                    <input type="text" value={this.state.max} placeholder="最高价" onChange={(e) => {this.setState({max: e.target.value})}} />
                  </div>
                </li>
              </ul>
              <div className="filter-clear" onClick={() => {
                this.setState({
                  min: '',
                  max: ''
                })
              }}>
                清除选项
              </div>
            </div>
            <div className={classnames({
              footer:true,
              show:this.state.filterAlert
            })}>
              <button onClick={()=>{
              this.setState({
                  filterAlert:false
                })
              }}>取消</button>
              <button onClick={() => {
                this.setState({
                  tagIndex: 3,
                })
                const {max, min} = this.state;
                console.log(min,max)
                if(Number(max) >= Number(min) && min >= 0 && max >=0) {
                  let goods = this.state.goods.filter(item => {
                    return item.defaultPrice >= (min || 0) && item.defaultPrice <= (max || 0)
                  }) || []
                  this.setState({
                    goods,
                    priceSort: null,
                    filterAlert: false
                  })
                }
                else {
                  Toast.show({
                    content: '输入的价格有误!',
                    icon: 'fail'
                  })
                }
              }}>确认</button>
            </div>
          </div>
        </div>
        {/* 筛选抽屉 */}
        {/* 选择条件 */}
        <div className="searchlist-main">
          <div className="filter">
            {/* 筛选item */}
            <div className={this.state.tagIndex === 0 ? "filter-item-active" : "filter-item" } onClick={()=>{
              let goods = this.state.goods.sort((a, b) => a.groupId - b.groupId)

              this.setState({
                complexAlert:!this.state.complexAlert,
                priceAlert:false,
                filterAlert:false,
                goods,
                tagIndex: 0,
                priceSort: null
              })
              console.log('click',goods)
            }}>
              <span>综合</span>
              {/* <Icon type={this.state.complexAlert?'up':'down'} size="xxs"/> */}
            </div>
            {/* 筛选item */}
            <div className={this.state.tagIndex === 1 ? "filter-item-active" : "filter-item" } onClick={() => {
              let goods = this.state.goods.sort((a,b) => b.sales - a.sales);
              this.setState({goods, tagIndex:1, priceSort: null, priceAlert: false})
            }}>
              <span>销量</span>
            </div>
            {/* 筛选item */}
            <div className={this.state.tagIndex === 2 ? "filter-item-active" : "filter-item" } onClick={()=>{
              this.setState({
                complexAlert:false,
                priceAlert:!this.state.priceAlert,
                filterAlert:false,
                tagIndex: 2,
                // priceSort: null
              })
            }}>
              <span>价格</span>
              <Icon type={this.state.priceAlert?'up':'down'} size="xxs"/>
            </div>
            {/* 筛选item */}
            <div className={this.state.tagIndex === 3 ? "filter-item-active" : "filter-item" } onClick={()=>{
              this.setState({
                complexAlert:false,
                priceAlert:false,
                filterAlert:!this.state.filterAlert,
              })
            }}>
              <span>筛选</span>
              <img className="icon" src={require(`@/assets/images/filter.png`)} alt=""/>
            </div>
          </div>
          {/* 选择条件 */}
          {/* 商品列表 */}
          <PullToRefresh
              damping={60}
              ref={el => this.ptr = el}
              style={{
                height: this.state.height,
                overflow: 'auto',
                backgroundColor:'#fff'
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
          <div className="search-list">
            {
              goods.length>0?
              goods.map((item,i)=>{
                return (
                  <div key={i} className="search-item" onClick={()=>{
                    this.props.history.push('/goods/'+item._id)
                    sessionStorage.setItem('__search_prev_path__',this.props.location.pathname)
                    sessionStorage.setItem('__goods_prev_path__',this.props.location.pathname)
                  }}>
                    <div className="search-inner">
                      <div className="cover">
                        <img src={item.image[0]} alt={item.name}/>
                      </div>
                      <div className="info">
                        <div className="info-title">
                        {item.name}
                        </div>
                        <div className="info-desc">
                        {item.description}
                        </div>
                        <div className="info-price">
                          <span>价格：</span>
                          <span>￥</span>
                          <span>{item.defaultPrice.toFixed(2)}</span>
                        </div>
                        <div className="info-volume">
                          <span>销量：</span>
                          <span>{item.sales}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })
              :
              <Loading></Loading>
            }
          </div>
          </PullToRefresh>
          {/* 商品列表 */}
        </div>
      </div>
    )
  }
}

// const mapStateToProps = (state) => ({
//   goods:state.goodsReducer.goods
// })

// const mapDispatchToProps = (dispatch)=>{
//   return {
//     goodsPatch:bindActionCreators(goodsAction,dispatch)
//   }
// }

export default connect(
  state => ({user: state.user}),
  // mapStateToProps, 
  // mapDispatchToProps
  )(SearchList)

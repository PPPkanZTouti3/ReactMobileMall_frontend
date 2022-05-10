import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Checkbox} from 'antd-mobile'
//组件
import TextHeader from '@/components/Header/TextHeader'
import CartList from '@/components/Cart/CartList'
import Loading from '@/components/Loading'
//css
import '@/assets/styles/cart.scss'
//ajax
import axios from 'axios'
import { reqCartList, reqAddToCart, reqDeleteCartProd } from '@/api'
import classnames from 'classnames'
import PubSub from 'pubsub-js'

class Cart extends Component {
    constructor(props){
        super(props)
        this.state={
            deleteAll:false,
            loading:true,
            checkedNum:0,
            allPrice:0,
            cartNmu:0,
            data:[],
            selectAll: false
        }
    }
    //获取购物车列表
    getCartList(){
        (async ()=>{
            let res = await reqCartList(this.props.user._id);
            console.log('=========购物车=======',res)
            this.setState({
                data:res.data,
                loading:false,
                checkedNum:0,
                allPrice:0,
                cartNmu:0,
            })
        })()
    }
    //全选
    allChange(e){
        let checked = e.target.checked
        let newData=this.state.data.map((item,i)=>{
            return {
                ...item,
                check:checked
            }
        })
        this.setState({
            data:newData
        })
        this.calc(newData)
    }
    //改变库存
    changeStock(id,val){
        let curCnt = 0;
        let newData = this.state.data.map((item,i)=>{
            if(item.productId===id){
                curCnt = item.count
                return {
                    ...item,
                    count:val
                }
            }else{
                return item;
            }
        })
        this.setState({
            data:newData
        }, async () => {
            let params = {
                // token: that.state.token,
                productId: id,
                count: val - curCnt,
                userId: this.props.user._id,
              }
            await reqAddToCart(params)
        })
        this.calc(newData)
    }
    //点击
    checkChange(id,check){
        let newData = this.state.data.map((item,i)=>{
            if(item.id===id){
                return {
                    ...item,
                    check:check
                }
            }else{
                return item;
            }
        })
        this.setState({
            data:newData
        })
        this.calc(newData)
    }
    //计算总价
    calc(newData){
        let allPrice = 0;
        let checkedNum = 0;
        let cartNmu = 0;
        newData.forEach((item,i)=>{
            if(item.check){
                cartNmu+=1;
                checkedNum+=parseFloat(item.count);
                allPrice+=parseFloat(item.count)*parseFloat(item.price)
            }
        })
        this.setState({
            checkedNum,
            allPrice,
            cartNmu
        })
    }
    //购买
    buy(){
        const { data } = this.state;
        console.log(data)
        
        var allData = {};
        allData['items']=[]
        let hasPayedProd = []
        data.map(prod => {
            allData['items'].push({
                productId: prod.groupId,
                selectQuantity: prod.count,
                skuId: prod.productId,
                skuStr: prod.desc,
                productName: prod.productName,
                productPrice: prod.price,
                productImage: prod.productImage,
                pickupWay: '1'
            })
            hasPayedProd.push(prod._id)
        })
        
        allData['pickupWay'] = '1';
        console.log(allData)
        // //保存数据到本地
        sessionStorage.setItem('goodDetailData', JSON.stringify(allData));
        sessionStorage.setItem('__search_prev_path__',this.props.location.pathname)
        
        // 发布支付成功后要删除的购物车物品
        localStorage.setItem('hasPayedProd', JSON.stringify(hasPayedProd))
        console.log(hasPayedProd)
        this.props.history.push('/order')
    }
    delete = async () => {
        const _ids = []
        this.state.data.forEach(v=>{
            if(v.check === true) {
                _ids.push(v._id)
            }
        })
        let res = await reqDeleteCartProd({_ids})
        console.log(res)
        if(res.status === 0) {
            let data = this.state.data
            data.map((item, i) => {
                _ids.map(_id => {
                    if(_id == item._id)
                    this.state.data.splice(i, 1)
                })
            })
            this.setState({data, deleteAll: false, selectAll: false})
            this.calc(data)
        }
    }
    //删除购物车
    //装载组件
    componentDidMount(){
        this.getCartList()
        PubSub.subscribe('deleteCartProd',(msg, data) =>{
            this.setState({
                data: this.state.data.filter((item) => item._id !== data._id)
            })
          })
    }
    render() {
        return (
            <div className="cart-page" style={{overflow:'hidden'}}>
                <TextHeader returnbtn={false} title="购物车" pathname="/">
                    <span className="edit" onClick={(e)=>{
                        e.preventDefault();
                        this.setState({deleteAll:!this.state.deleteAll})
                    }}>
                    {
                        this.state.deleteAll?
                        '返回'
                        :
                        '编辑'
                    }
                    </span>
                </TextHeader>
                <div className="cart-body">
                    {
                        this.state.loading?
                        <Loading/>
                        :
                        <CartList changeStock={this.changeStock.bind(this)} checkChange={this.checkChange.bind(this)} data={this.state.data}></CartList>
                    }
                </div>
                {
                    this.state.deleteAll?
                    <div className="cart-footer">
                        <div>
                            <Checkbox 
                                checked={this.state.selectAll}
                                onChange={(e)=>{
                                    this.allChange(e)
                                    this.setState({
                                        selectAll: !this.state.selectAll
                                    })
                                }}
                            />
                            <div>全选</div>
                        </div>
                        <div></div>
                        <div  className={classnames({
                            'active':this.state.cartNmu>0
                        })} onClick={()=>{
                            if(this.state.cartNmu>0){
                                this.delete()
                            }
                        }}>
                            删除<span>({this.state.cartNmu})</span>
                        </div>
                    </div>
                    :
                    <div className="cart-footer">
                        <div>
                            <Checkbox 
                                checked={this.state.selectAll}
                                onChange={(e)=>{
                                    this.allChange(e)
                                    this.setState({
                                        selectAll: !this.state.selectAll
                                    })
                                }}
                            />
                            <div>全选</div>
                        </div>
                        <div className="all-pirce">
                            <p>
                                <span>总计：</span>
                                <span>￥{this.state.allPrice.toFixed(2)}</span>
                            </p>
                        </div>
                        <div className={classnames({
                            'active':this.state.checkedNum>0
                        })} onClick={()=>{
                            if(this.state.checkedNum>0){
                                this.buy()
                            }
                        }}>
                            去结算<span>({this.state.checkedNum}件)</span>
                        </div>
                    </div>
                }
                
            </div>
        )
    }
}

export default connect(
    state => ({user: state.user})
)(Cart)
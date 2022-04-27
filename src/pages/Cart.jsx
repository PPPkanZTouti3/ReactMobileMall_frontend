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
import { reqCartList } from '@/api'
import classnames from 'classnames'


class Cart extends Component {
    constructor(props){
        super(props)
        this.state={
            deleteAll:false,
            loading:true,
            checkedNum:0,
            allPrice:0,
            cartNmu:0,
            data:[]
        }
    }
    //获取购物车列表
    getCartList(){
        (async ()=>{
            let {data} = await reqCartList();
            console.log('=========购物车=======',data)
            this.setState({
                data:data.data,
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
        let newData = this.state.data.map((item,i)=>{
            if(item.id===id){
                return {
                    ...item,
                    value:val
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
                checkedNum+=parseFloat(item.value);
                allPrice+=parseFloat(item.value)*parseFloat(item.price)
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
        console.log(this.state)
    }
    delete(){
        let deleteData = this.state.data.filter(v=>{
            return v.check === true
        })
        console.log(deleteData)
    }
    //删除购物车
    //装载组件
    componentDidMount(){
        this.getCartList()
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
                            <Checkbox onChange={(e)=>{
                                this.allChange(e)
                            }}/>
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
                            <Checkbox onChange={(e)=>{
                                this.allChange(e)
                            }}/>
                            <div>全选</div>
                        </div>
                        <div className="all-pirce">
                            <p>
                                <span>总计：</span>
                                <span>￥{this.state.allPrice}</span>
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

export default connect()(Cart)
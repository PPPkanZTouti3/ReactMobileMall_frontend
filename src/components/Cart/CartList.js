import React, {Component} from 'react'

import CartItem from '@/components/Cart/CartItem'

class CartList extends Component{
    render(){
        return (
            <div className="cart-main">
            {/* 遍历购物车商品列表 */}
             <div className="cart-c-body">
                {
                    this.props.data.length>0?
                    this.props.data.map((item,i)=>{
                        return (
                            <CartItem index={i} changeStock={(id,val)=>{
                                this.props.changeStock(id,val)
                            }} checkChange={(id,val)=>{
                                this.props.checkChange(id,val)
                            }} key={i} item={item}></CartItem>
                        )
                    })
                    :<div className="cart-tip">暂无商品</div>
                }
             </div> 
            </div>
        )
    }
}
export default CartList
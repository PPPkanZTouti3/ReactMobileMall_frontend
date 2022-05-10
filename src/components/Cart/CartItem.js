import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import {Checkbox, Stepper,SwipeAction, Toast} from 'antd-mobile'
import { reqDeleteCartProd } from '@/api'
import PubSub from 'pubsub-js'

class CartItem extends Component{
    //构造函数
    constructor(props){
        super(props)
        this.state={
            val:props.item.value
        }
    }
    onChange(e,id){
        let checked = e.target.checked;
        // console.log(checked,id)
        this.props.checkChange(id,checked)
    }

    deleteProduct = async (_id) => {
        const _ids = [];
        _ids.push(_id)
        let res = await reqDeleteCartProd({_ids});
        if(res.status === 0) {
            PubSub.publish('deleteCartProd', {_id});
        }
    }

    render(){
        let item = this.props.item
        console.log('======', item)
        return (
            <SwipeAction
            style={{ backgroundColor: '#f5f5f9',paddingBottom:'10px' }}
            right={[
                {
                text: '删除',
                onPress: () =>{
                    this.deleteProduct(item._id)
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
            <div className="cart-c-item" >
                <div className="cart-c-check">
                    <Checkbox checked={item.check} onChange={(e) => {
                        this.onChange(e,item.id)
                    }}/>
                </div>
                {/* 商品图片 */}
                <div className="cart-ci-left" onClick={() => this.props.history.push('/goods/'+item.groupId)}>
                    <img src={item.productImage} alt={item.productName}/>
                </div>
                {/* 商品信息 */}
                <div className="cart-ci-right">
                    <div className="r-title"><span>{item.productName}</span></div>
                    <div className="r-desc"><span>{item.desc}</span></div>
                    <div className="r-step">
                        <span className="r-price"><span>￥</span>{item.price.toFixed(2)}</span>
                        <span className="span-stepper">
                            {/* 加减步进器 */}
                            <Stepper
                                style={{ maxWidth: '100px',height:'30px' }}
                                showNumber
                                max={item.stockNum}
                                min={1}
                                defaultValue={item.count}
                                onChange={(val)=>{
                                    console.log(val)
                                    if(val>item.stockNum){
                                        Toast.info("库存不足",1)
                                        this.props.changeStock(item.productId,item.stockNum)
                                    }else{
                                        this.props.changeStock(item.productId,val)
                                    }
                                }}
                            />
                        </span>
                    </div>
                </div>
            </div>
        </SwipeAction>
        )
    }
}
export default withRouter(CartItem)
import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import { SwipeAction, Toast } from 'antd-mobile-v5'
import { reqDelCollection } from '@/api'
import PubSub from 'pubsub-js'
import './card-item.scss'
import { connect } from 'react-redux'

class CardItem extends Component{
    
    state = {
        item: this.props.item
    }

    cancelCollection = async () => {
        const {user, item} = this.props
        let res = await reqDelCollection(item.groupId._id, user._id,);
        if(res.status === 1) {
            Toast.show({
                content: '取消收藏异常！',
                icon: 'fail'
            })
        } else {
            PubSub.publish('cancelCollection', {_id: item._id});
        }
    }

    render(){
        const {item} = this.state
        const {index} = this.props
        const isSales = window.location.href.indexOf('sales') != -1 ? true : false;
        console.log(index)
        return (
            <SwipeAction
                style={{ backgroundColor: '#fff',marginBottom:'5px', borderRadius: '10px' }}
                rightActions={[
                    {
                        key: 'cancelCollect',
                        text: '取消收藏',
                        color: 'danger',
                        onClick: () =>{
                            this.cancelCollection(item._id)
                        },
                    },
                ]}
            >
                <div className="card-c-item" >
                    
                    {/* 商品图片 */}
                    <div className="card-ci-left" onClick={() => this.props.history.push('/goods/'+item._id)}>
                        <img src={item.image[0]} alt={item.name}/>
                    </div>
                    {/* 商品信息 */}
                    <div className="card-ci-right">
                        <div className="r-title"><span>{item.name}</span></div>
                        <div className="r-desc"><span>{item.description}</span></div>
                        <div className="r-step">
                            <span className="r-price"><span>￥</span>{Number(item.defaultPrice).toFixed(2)}</span>
                        </div>
                        {
                            isSales ? (
                                <div className={index < 3 ? 'left active': 'left'}>
                                    {'No.'+(index+1)}
                                </div>
                            )
                            : null
                        }
                    </div>
                </div>
            </SwipeAction>
        )
    }
}
export default connect(
    state => ({user: state.user}),
)(withRouter(CardItem))
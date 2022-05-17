import React, { Component } from 'react'
import { connect } from 'react-redux'
import { logout } from '@/redux/actions/loginAction'
import { WhiteSpace, WingBlank } from 'antd-mobile'
import { Form, Input, Button, Radio, Space, Toast } from 'antd-mobile-v5'
import { LeftOutline } from 'antd-mobile-icons'
import { reqCollection } from '@/api'
import CardItem from '../components/CardItem'
import Loading from '@/components/Loading'
import PubSub from 'pubsub-js'
import homeSvg from '../assets/images/index.svg'
import '../assets/styles/userInfo.scss'

class Collection extends Component {

    state = {
        collectionList: [],
        isLoading: true
    }

    backButton = () => {
        this.props.history.replace('/my')
    }

    homeButton = () => {
        this.props.history.replace('/')
    }

    getCollection = async () => {
        let res = await reqCollection(this.props.user._id)
        console.log(res)
        if(res.status === 0) {
            console.log(res.data)
            this.setState({
                collectionList: res.data,
                isLoading: false
            },() => {
                console.log('ok')
            })
        }
        else {
            console.log(res.msg)
        }
        // console.log('========',res.data)
        return res
    }

    componentDidMount() {
        console.log('////')
        this.getCollection()
            
        
            
        
        PubSub.subscribe('cancelCollection',(msg, data) =>{
            console.log(data._id)
            this.setState({
                collectionList: this.state.collectionList.filter((item) => item._id !== data._id)
            })
        })
    }

    render() {
        const { collectionList, isLoading } = this.state
        return (
            <div className='user-info-page'>
                {/* header */}
                <div className='user-info-header'>
                    <div className='user-info-back' onClick={this.backButton}>
                        <LeftOutline fontSize={24} />
                    </div>
                    <div className='user-info-title'>收藏</div>
                    <div className='user-info-home' onClick={this.homeButton}>
                        <img src={homeSvg} />
                    </div>
                </div>
                {/* <CardItem item={mock}></CardItem> */}
                {/* main */}
                {
                    isLoading ? <Loading /> : (
                        <div className='user-info-main'>
                            {
                                collectionList && collectionList.length ? 
                                collectionList.map((item, i) =>                               
                                    <CardItem item={item} key={i} index={i}/>
                                    
                                )
                                : <div className='no-data'>暂无数据</div>
                            }
                        </div>
                    )
                }
            </div>
        )
    }
}

export default connect(
    state => ({ user: state.user }),
)(Collection);
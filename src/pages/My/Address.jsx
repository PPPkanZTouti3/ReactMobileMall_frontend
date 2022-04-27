import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Checkbox, Button, SwipeAction } from 'antd-mobile'
import { Tag, Toast } from 'antd-mobile-v5'
import TextHeader from '@/components/Header/TextHeader'
import { reqAddress, reqDeleteAddress } from '@/api'
import Loading from '@/components/Loading'

import '@/assets/styles/address.scss'

class Address extends Component {
    constructor(props) {
        super(props)
        this.state = {
            list: [],
            noneData: false,
            loading: true
        }
    }

    deleteAddress = async (item, e) => {
        e.preventDefault()
        const { _id } = item; // address._id
        const userId = this.props.user._id;
        const addressId = _id;
        let res = await reqDeleteAddress(userId, addressId);
        if(res.status === 0) {
            Toast.show({
              content: '删除成功',
              icon: 'success',
              afterClose: async () => {
                let data = await reqAddress(userId);
                
                this.setState({
                    list: data.data,
                    loading: false,
                    noneData: data.data.length > 0 ? false : true
                })
                
              },
            })
        } else {
            Toast.show({
                content: '删除失败',
                icon: 'fail',
            })
        }
        
    }

    componentDidMount() {
        //初始化获取数据
        (async () => {
            let { _id } = this.props.user
            let data = await reqAddress(_id);
            setTimeout(() => {
                this.setState({
                    list: data.data,
                    loading: false,
                    noneData: !data.data.length ? true : false
                })
            }, 0)
        })()
    }
    render() {
        let addressPrevPath = sessionStorage.getItem('__address_prev_path__')
        if (addressPrevPath) {
            sessionStorage.setItem('__search_prev_path__', addressPrevPath)
        }
        let prevPath = sessionStorage.getItem('__search_prev_path__')
        return (
            <div className="address-page">
                <div className="address-top">
                    <TextHeader returnbtn={true} title="收货地址" pathname={prevPath || '/my'}></TextHeader>
                    <div className="address-main">
                        {this.state.loading ? <Loading /> : null}
                        {
                            this.state.list.length > 0 ?
                                this.state.list.map((item, i) => {
                                    return (
                                        <SwipeAction
                                            key={i}
                                            autoClose
                                            style={{ backgroundColor: '#f5f5f9', paddingBottom: '10px' }}
                                            right={[
                                                {
                                                    text: '删除',
                                                    onPress: (e) => this.deleteAddress(item, e),
                                                    style: { backgroundColor: '#F4333C', color: 'white' },
                                                },
                                            ]}
                                        >
                                            <div className="address-item" onClick={() => {
                                                if (prevPath === '/my') {

                                                } else {
                                                    this.props.history.push({
                                                        pathname: '/order',
                                                        query: {
                                                            addr: true
                                                        }
                                                    })
                                                    sessionStorage.setItem('address', JSON.stringify(item))
                                                }
                                            }}>
                                                <div className="a-left">
                                                    <div className="info">
                                                        <span>{item.recipient}</span>
                                                        <span>{item.phone}</span>
                                                    </div>
                                                    <div className="address">
                                                        {item.province}{item.city}{item.area}{item.address}
                                                    </div>
                                                    <div className="check">
                                                        {/* <span><Checkbox checked={item.isDefault} onClick={(e)=>{
                                                e.stopPropagation()
                                            }}/></span> */}
                                                        <span>{item.isDefault ? <Tag color='#ff5b05'>默认</Tag> : null}</span>
                                                    </div>
                                                </div>
                                                <div className="a-right" onClick={(e) => {
                                                    e.stopPropagation()
                                                    console.log(item)
                                                    this.props.history.push({
                                                        pathname: '/my/address_update',

                                                        state: { addressInfo: item }// A页面的this.state中的所有值
                                                    })
                                                }}>
                                                    <img src={require(`@/assets/images/edit.png`)} alt="edit" />
                                                </div>
                                            </div>
                                        </SwipeAction>
                                    )
                                })
                                :
                                this.state.noneData ?
                                    <div style={{ padding: '20px', textAlign: 'center', color: '#999' }}>暂无数据</div>
                                    : null
                        }
                    </div>
                </div>
                <div className="address-footer">
                    <Button type="primary" onClick={(e) => {
                        e.stopPropagation()
                        this.props.history.push('/my/addressadd')
                    }}>新增收货地址</Button>
                </div>
            </div>
        )
    }
}
export default connect(
    state => ({ user: state.user })
)(Address)

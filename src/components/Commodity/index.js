import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import PropTypes from 'proptypes'
import {connect} from 'react-redux'
import {reqRecommendProd} from '@/api'

class Commodity extends Component {

    state = {
        data: []
    }

    static propTypes = {
        data:PropTypes.array.isRequired
    };

    // 跳转对应商品详情
    toGoodDetail = (id) => {
        this.props.history.push('/goods/' + id)
    }
    
    getRecommend = async () => {
        let data = this.props.data;
        let res = await reqRecommendProd(data);
        console.log(res.data)
        if(res.status === 0) {
            this.setState({
                data: res.data
            })
        }
    }

    async componentDidMount(){
        setTimeout(() => {
            this.getRecommend()
        }, 500)
        console.log('home')
    }
    render() {
        return (
            <div className="good-box">
                {
                    this.state.data.map((item,i)=>{
                        return (
                            <div key={i} className="good-item" onClick={() => this.toGoodDetail(item.groupId)}>
                                <div className="head">
                                    <img className="item-img" src={item.image[0]} alt=""/>
                                </div>
                                <div className="body">
                                    <p>{item.name}</p>
                                    <div>
                                        <span>￥{item.defaultPrice}</span>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

export default connect(
    state => ({user: state.user})
)(withRouter(Commodity))
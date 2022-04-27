import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import PropTypes from 'proptypes'
import {connect} from 'react-redux'

class Commodity extends Component {
    static propTypes = {
        data:PropTypes.array.isRequired
    };

    // 跳转对应商品详情
    toGoodDetail = (id) => {
        this.props.history.push('/goods/' + id)
    }

    componentDidMount(){

    }
    render() {
        return (
            <div className="good-box">
                {
                    this.props.data.map((item,i)=>{
                        return (
                            <div key={i} className="good-item" onClick={() => this.toGoodDetail(item.groupId)}>
                                <div className="head">
                                    <img className="item-img" src={item.img} alt=""/>
                                </div>
                                <div className="body">
                                    <p>{item.title}</p>
                                    <div>
                                        <span>￥{item.price}</span>
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

export default connect()(withRouter(Commodity))
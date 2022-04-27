import React, {Component} from 'react'
import PropTypes from 'proptypes'

class Bdr extends Component {
    static propTypes = {
        data:PropTypes.array.isRequired
    };
    render() {
        return (
            <div className="bdr">
                {
                    this.props.data.map((item,i)=>{
                        return(
                            <div key={i} className="bdr2-item">
                                <a className="item">
                                    <div className="left">
                                        <div className="title">
                                            <span>{item.title}</span>
                                        </div>
                                        <div className="desc">
                                            <span>{item.desc}</span>
                                        </div>
                                    </div>
                                    <div className="right">
                                        <img className="item-img" src={item.img} alt="" />
                                    </div>
                                </a>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}
export default Bdr
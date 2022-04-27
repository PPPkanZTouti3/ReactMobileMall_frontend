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
                            <div key={i} className={this.props.cls}>
                                <a className="item">
                                    <div className="title">
                                        <span>{item.title}</span>
                                    </div>
                                    <div className="desc">
                                        <span>{item.desc}</span>
                                    </div>
                                    <img className="item-img" src={item.img} alt="" />
                                </a>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}
Bdr.defaultProps={
    cls:'bdr-item'
};
export default Bdr
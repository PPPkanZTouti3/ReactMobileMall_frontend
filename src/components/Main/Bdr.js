import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
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
                            <div key={i} className={this.props.cls} onClick={() => this.props.history.push(item.url + '')}>
                                <div className="item">
                                    <div className="desc">
                                        <img className="item-img" src={require(`@/assets/images/${item.img}`)} alt="" />
                                    </div>

                                    <div className="title">
                                        <span>{item.title}</span>
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
Bdr.defaultProps={
    cls:'bdr-item'
};
export default withRouter(Bdr)
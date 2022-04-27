import React, {Component} from 'react'
import PropTypes from 'proptypes'
import {Carousel,List} from 'antd-mobile'
const Item = List.Item;

class Advertising extends Component {
    static propTypes = {
        data:PropTypes.array.isRequired
    };

    render() {
        return (
            <List>
                <Item extra={
                    <Carousel className="my-carousel"
                              vertical
                              dots={false}
                              dragging={false}
                              swiping={false}
                              autoplay
                              infinite
                    >
                        {
                            this.props.data.map((v,i)=>{
                                return (
                                    <div className="v-item" key={i}>{v}</div>
                                )
                            })
                        }
                    </Carousel>
                }>广告</Item>
            </List>
        )
    }
}

export default Advertising
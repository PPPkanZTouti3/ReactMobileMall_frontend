import React, {Component} from 'react'
import PropTypes from 'proptypes'
import {Carousel} from 'antd-mobile'

class Autoplay extends Component {
    static propTypes = {
        data:PropTypes.array.isRequired
    };
    constructor(props) {
        super(props);
        this.state={
            imgHeight:150
        }
    }
    componentDidMount(){
        this.setState({
            imgHeight:'auto'
        })
    }
    render() {
        return (
            <Carousel
                autoplay={true}
                infinite
                beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
                afterChange={index => console.log('slide to', index)}
            >
                {this.props.data.map(val => (
                    <a
                        key={val}
                        style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
                    >
                        <img
                            src={`https://zos.alipayobjects.com/rmsportal/${val}.png`}
                            alt=""
                            style={{touchAction:'none', width: '100%', verticalAlign: 'top' }}
                            onLoad={(e) => {
                                e.preventDefault()
                                window.dispatchEvent(new Event('resize'));
                            }}
                        />
                    </a>
                ))}
            </Carousel>
        )
    }
}

export default Autoplay
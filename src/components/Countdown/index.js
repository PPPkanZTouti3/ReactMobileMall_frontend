import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import './countdown.scss'
import { reqOrderOverTime } from '@/api'
import {Toast} from 'antd-mobile-v5'

const timeContent = (str) => {
    let nowtime = new Date();  //获取当前时间
    let endtime = new Date(str);  //定义结束时间
    let lefttime = endtime.getTime() - nowtime.getTime();  //距离结束时间的毫秒数

    if(lefttime < 0) {
        
        return false
    }
    let leftm = Math.floor(lefttime/(1000*60)%60);  //计算分钟数
    let lefts = Math.floor(lefttime/1000%60);  //计算秒数
    if(leftm < 10) {
        leftm = '0' + leftm;
    }
    if(lefts < 10) {
        lefts = '0' + lefts;
    }
    return leftm + ":" + lefts;  //返回倒计时的字符串
}

class CountDownItem extends React.Component {

    state = {
        currentTime: '',
        timer: null
    }

    componentDidMount() {
        this.state.timer = setInterval(() => {
            let time = timeContent(this.props.payEndTime);
            this.updateTime(time)
        }, 1000)
    }
 
    componentWillUnmount() {
        if(this.state.timer!= null) {

            clearInterval(this.state.timer);
            
        }
    }
 
    updateTime = async (time) => {
        if(!time) {
            const {orderId} = this.state
            let res = await reqOrderOverTime({orderId});
            if(res.status === 0) {
                Toast.show({
                  content: '订单' + orderId + '已超时',
                  icon: 'fail',
                })
            } 
        }
        this.setState({
            currentTime: time
        })
    }
 
    parseDisplayTime = () => {
        const { payEndTime, orderId } = this.props;
        const { currentTime } = this.state;
        let countDownDOM = '';
        if(currentTime){
            countDownDOM = (
                <div className="count-down-content">
                    {currentTime}
                </div>
            );
        }else{
            this.state.timer = null;
        }
 
        return countDownDOM;
    }
 
    render(){
        return(
            <div className="count-down-wrap">{this.parseDisplayTime()}</div>
        );
    }
}

export default withRouter(CountDownItem)
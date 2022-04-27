import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as routerAction from '@/redux/actions/routerAction'
//组件
//轮播图
import Autoplay from '@/components/Main/Autoplay'
//广告
import Advertising from '@/components/Advertising'
//商品
import Bdr from '@/components/Main/Bdr'
import Bdrb from '@/components/Main/Bdrb'
import Commodity from '@/components/Commodity'
import Scroll from '@/components/Scroll'
//UI
import {SearchBar,WingBlank} from 'antd-mobile'

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: ['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'IJOtIlfsYdTyaDTRVrLI'],
            adverArr:['广告1','广告2','广告3'],
            goods:[
                {
                    title:'白条商城',
                    desc:'抢先用分期',
                    img:'https://m.360buyimg.com/n1/s130x130_jfs/t15787/353/109633918/16701/5a8390ef/5a27ae6dNc530b5bb.jpg!q70.jpg.dpg',
                    url:''
                },
                {
                    title:'品牌秒杀',
                    desc:'低价抢大牌',
                    img:'https://m.360buyimg.com/n1/s130x130_jfs/t20845/274/1898979256/38009/6f461017/5b3b2a0cNede9d540.png!q70.jpg.dpg',
                    url:''
                },
                {
                    title:'闪购',
                    desc:'大牌限时特卖',
                    img:'https://m.360buyimg.com/n1/s130x130_jfs/t3967/348/1948861683/146448/9bbe570b/589ec74bN911b1ba4.jpg!q70.jpg.dpg',
                    url:''
                },
                {
                    title:'拍拍二手',
                    desc:'iPhone 5折起',
                    img:'https://m.360buyimg.com/mobilecms/s130x130_jfs/t14251/339/1738489148/26244/792efe55/5a56fd12N458f4fe7.jpg!q70.jpg.dpg',
                    url:''
                },
                {
                    title:'排行榜',
                    desc:'专属购物指南',
                    img:'https://m.360buyimg.com/n1/s130x130_jfs/t21532/360/764701806/223647/83d30500/5b1799cdN37efd6ec.jpg!q70.jpg.dpg',
                    url:''
                },
                {
                    title:'发现好货',
                    desc:'高品质生活',
                    img:'https://m.360buyimg.com/n1/s130x130_jfs/t3586/286/796506379/82930/1eb37a2a/5813767aN76633141.jpg!q70.jpg.dpg',
                    url:''
                },
                {
                    title:'会买专辑',
                    desc:'教你买买买',
                    img:'https://m.360buyimg.com/n1/s130x130_jfs/t4543/125/138304129/244584/7a52b06d/58ca527dN6c192927.jpg!q70.jpg.dpg',
                    url:''
                },
                {
                    title:'新品首发',
                    desc:'Players！',
                    img:'https://m.360buyimg.com/n1/s130x130_jfs/t22795/242/864648261/19041/5506280d/5b45a837N22d7244b.jpg!q70.jpg.dpg',
                    url:''
                }
            ],
            goods1:[
                {
                    groupId: 180423092133883,
                    title:'Wecele U-ONE 发烧级桌面蓝牙音响扬声器 便携无线音箱 手机游戏家用音响 银色',
                    price:'1399.00',
                    img:'http://m.360buyimg.com/mobilecms/s370x370_jfs/t18586/142/1447684320/281393/f0731e53/5aca103dNae9f1605.jpg!q70.jpg.dpg',
                    url:''
                },
                {
                    title:'成人竹炭牙刷软毛成人家用批发价包邮细毛牙刷10支家庭旅行装小头 牙刷10支',
                    price:'29.90',
                    img:'http://m.360buyimg.com/mobilecms/s370x370_jfs/t23413/106/631223504/531987/951d9e90/5b3a1515N41456bf3.jpg!q70.jpg.dpg',
                    url:''
                }
            ]
        }
    }
    componentDidMount() {
        this.fixCarousel()
    }
    //处理九宫格bug
    fixCarousel(){
        setTimeout(()=>{
            window.dispatchEvent(new Event('resize'))
        },0)
    }
    onRef(scroll){
        console.log(scroll)
    }
    render() {
        return (
            <div className="main-box" style={{height:'100%'}}>
                <Scroll onRef={(scroll)=>{
                    this.onRef(scroll)
                }}>
                    <div className="header">
                        <WingBlank>
                            <SearchBar placeholder="搜索" onFocus={()=>{
                                sessionStorage.setItem('__search_prev_path__',this.props.location.pathname)
                                this.props.history.push('/search')
                                this.props.router.changePath('/search')
                            }}/>
                        </WingBlank>
                    </div>
                    <div className="body">
                        {/*轮播图*/}
                        <Autoplay data={this.state.data}/>
                        {/*九宫格*/}
                        {/* <Grid data={data} isCarousel onClick={_el => console.log(_el)} /> */}
                        {/*广告*/}
                        <div className="advertising">
                            <Advertising data={this.state.adverArr}></Advertising>
                        </div>
                        {/*商品*/}
                        <Bdr data={this.state.goods}></Bdr>
                        {/*商品*/}
                        {/* <Bdr cls="bdr1-item" data={this.state.goods}></Bdr> */}
                        {/*商品*/}
                        {/* <Bdrb ></Bdrb> */}
                        {/*商品*/}
                        <Commodity data={this.state.goods1}></Commodity>
                    </div>
                </Scroll>

            </div>
        )
    }
}

export default connect(
    null,
    (dispatch)=>{
        return {
            router:bindActionCreators(routerAction,dispatch)
        }
    }
)(Main)
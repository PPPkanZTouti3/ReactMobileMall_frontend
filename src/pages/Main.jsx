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
import Loading from '@/components/Loading'
//UI
import {SearchBar,WingBlank} from 'antd-mobile'
import {reqRecommend} from '@/api'

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: ['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'IJOtIlfsYdTyaDTRVrLI'],
            adverArr:['广告1','广告2','广告3'],
            goods:[
                {
                    title:'销量排行',
                    desc:'教你买买买',
                    img:'sales.png',
                    url:'/sales'
                },
                {
                    title:'新品首发',
                    desc:'Players！',
                    img:'news.png',
                    url:'/news'
                }
            ],
            goods1:[
                // {
                //     groupId: '625a644fb643000010007f3c',
                //     title:'魅蓝 Note1',
                //     price:'1099.00',
                //     img:require('@/upload/detail/prod_detail0.jpg'),
                //     url:''
                // },
                // {
                //     title:'成人竹炭牙刷软毛成人家用批发价包邮细毛牙刷10支家庭旅行装小头 牙刷10支',
                //     price:'29.90',
                //     img:'http://m.360buyimg.com/mobilecms/s370x370_jfs/t23413/106/631223504/531987/951d9e90/5b3a1515N41456bf3.jpg!q70.jpg.dpg',
                //     url:''
                // }
            ]
        }
    }

    getRecommend = async () => {
        let res = await reqRecommend(this.props.user._id);
        console.log(res.data)
        if(res.status === 0) {
            this.setState({
                goods1: res.data
            })
        }
    }

    async componentDidMount() {
        let res = await reqRecommend(this.props.user._id);
        console.log(res.data)
        if(res.status === 0) {
            this.setState({
                goods1: res.data
            })
        }
        this.fixCarousel()
        console.log('home')
        // this.getRecommend()
        
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
                        <p className='recommend'>
                            <img src={require('@/assets/images/love.png')} alt=""/>
                            猜你喜欢
                        </p>
                        {
                            !this.state.goods1.length ? <Loading /> :
                            <Commodity data={this.state.goods1}></Commodity>
                        }
                        
                    </div>
                </Scroll>

            </div>
        )
    }
}

export default connect(
    state => ({user: state.user}),
    (dispatch)=>{
        return {
            router:bindActionCreators(routerAction,dispatch)
        }
    }
)(Main)
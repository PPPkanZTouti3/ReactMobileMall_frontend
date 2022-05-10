import React, { Component } from 'react'
import {connect} from 'react-redux'
import Header from '@/components/Header/Header'
import {Carousel,Stepper,Toast} from 'antd-mobile'
import { Toast as Toast_v5 } from 'antd-mobile-v5'
import '@/assets/styles/goodsdetail.scss'
import 'react-photoswipe/lib/photoswipe.css'
import {PhotoSwipe} from 'react-photoswipe'
import {unique} from '@/utils/util.js'
import Loading from '@/components/Loading'
import classnames from 'classnames'
import {watchProd, cartProd, buyProd, starProd} from '@/config'
import { reqWatchProd, reqProdByGroupId, reqAddToCart, reqAddToCollection, reqDelCollection, reqCheckCollected } from '@/api'
import $ from 'jquery'
// import goodsDetail from '@/assets/mock/goods_detail'
// import { imgBase } from '@/config'

class GoodsDetail extends Component {
  constructor(props){
    super(props);
    this.state = {
      loading:true,
      data: null,
      val: 1, // 购买数量
      sku:null, // detailProduct
      token:null,
      goodId:props.match.params.id,
      stockNum:null,
      stockId:null,
      popPrice:null,
      standard:null,
      productName:null,
      productImage:null,
      specCount:null,
      specData:null,
      specNameArr:null,
      spcount:null,
      allBtn:true,
      __html: '',
      style:{
        height:'auto',
        width:'auto'
      },
      dotStyle:{
        width:'5px',
        height:'5px'
      },
      isOpen:false,
      options:{
        index: 0,
        escKey: true,
        shareEl: false,
        shareButtons:[]
      },
      isCollected: false
    }
  }

  //计算窗口宽高
  calcWindow(){
    return {
      w:$(window).width(),
      h:$(window).height()
    }
  }
  //窗口大小改变
  resize(){
    let calcw=this.calcWindow()
    let ww=calcw.w>540?'540px':calcw.w+'px';
    this.setState({
      style:{
        width:ww,
        height:ww
      }
    })
  }
  //打开图片浏览
  handleClose(){
    this.setState({
      isOpen: false
    })
  }
  //计算图片宽高
  calcImg(ev,i){
    let picobjs=this.state.data.picobjs.concat()
    let item=picobjs[i];
    item.w=ev.currentTarget.width;
    item.h=ev.currentTarget.height;
    picobjs[i]=item;
    this.setState({
      data:{
        ...this.state.data,
        picobjs
      }
    })
  }
  //获取商品信息
  getGoodsInfo(){
    (async ()=>{
      // 从当前url中获取groupId
      let groupId = window.location.href.split('/goods/')[1]
      let res = await reqProdByGroupId(groupId);
      let data = res.data
      console.log(data)
      // mock数据处理 具体还得写ajax请求
      // data.image[0] = data.image[0].indexOf(imgBase) !== -1 ? imgBase + data.image[0] : data.image[0]; 
      let pictures = []
      //渲染数据
      if (data.image.length) {
          pictures = data.image
          for (var i in pictures) {
              pictures[i] = pictures[i]
          }
          // pictures.unshift(data.productImage)
      }
      // if (pictures.length < 1) {
      //     pictures.push(data.productImage)
      // }
      let picobj=pictures.map(v=>{
        return {
          src: v
        }
      })
      data.picobjs=picobj
      let __html = "<p style='margin:0;padding:0;'>";
      if(data.introduction) {
        data.introduction.forEach(item => {
          __html += "<img src="+item+">"
        })
      }

      this.setState({
        data,
        loading:false,
        productName: data.name,
        __html
      })
      this.filterData(data)
    })()
  }
  //设置初始
  setAllDataStandard(sku){
    //统一处理点击后的规格处理
    let that = this;
    let stockNum = sku.stockNum;
    let popPrice = sku.price.toFixed(2);
    let skuId = sku._id;
    // let productName = sku.productName;
    that.setState({
      stockNum: stockNum,
      stockId: skuId,
      popPrice: popPrice,
      standard: '',
      // productName: productName,
    })
  }
  //过滤规格数据
  filterData(result){
    //刚开始进来的时候先显示一部分内容
    let that = this;
    let skuData = result.detailProduct[0];
    // console.log(skuData)
    that.setState({
      sku: result.detailProduct
    })
    //第一次进来设置数据
    that.setAllDataStandard(skuData);
    //判断有一个规格的时候
    let sku = result.detailProduct;
    let productImage = result.image;
    that.setState({
      productImage: productImage
    })
    let specNameArr=[];//规格组名字
    let specCount=0;//规格组的数量
    let data=[];//对应规格组的规格
    let code = [];
    for (let i = 0; i < sku[0].attri.length;i++){
      specCount++;
      data.push([]);
      code.push([]);
      specNameArr.push(sku[0].attri[i].attriName)
    }
    that.setState({
      specCount: specCount
    })
    let finData = [];
    for (let i = 0; i < sku.length; i++) {
      var specSubArr=[];//规格值
      var skuId = sku[i]._id;  //库存id
      console.log(skuId)
      for (let j = 0; j < sku[i].attri.length;j++){
        specSubArr.push({
          value:sku[i].attri[j].attriValue,
          code: sku[i].attri[j].groupAttriValueId
        });  //值
      }
      finData.push(specSubArr);
    }
    //把对应的规格放进对应的规格组
    for (let k = 0; k < finData.length;k++){
      for (let g = 0; g < specCount;g++){
        data[g].push(finData[k][g]['value']);
        code[g].push(finData[k][g]['code']);
      }
    }
    //去重
    for(let i=0;i<data.length;i++){
      data[i] = unique(data[i]);
      code[i] = unique(code[i]);
      let newData = [];
      for(let j=0;j<data[i].length;j++){
        newData.push({
          key:'0',
          text: data[i][j],
          code: code[i][j],
        })
      }
      data[i]=newData;
    }
    //默认设置选中
    for(let k in data){
      data[k][0].key = '1';
    }
    that.setState({
      specData:data,
      specNameArr:specNameArr
    })
    let standardText='';
    for (let i in data){
      let key = false;
      for(let j in data[i]){
        if (data[i][j].key==='1'){
          key = data[i][j].text;
          break;
        }
      }
      if (key===false){
        standardText += specNameArr[i] + ": ;"
      }else{
        standardText += specNameArr[i] + ':' +key+ ";"
      }
    }
    that.setState({
      standard: standardText
    })
  }
  //选择规格
  selectedSpec(parentIndex,index){
    let that=this;
    that.setState({
      spcount: 0,
      allBtn:false
    })
    let specCount = that.state.specCount;
    let data = that.state.specData;
    let sku = that.state.sku;
    let specNameArr = that.state.specNameArr;
    for (let i in data[parentIndex]){
      data[parentIndex][i].key='0'
    }
    data[parentIndex][index].key='1';
    let standardText = '';
    let spcount=0;
    let codeArr=[];
    for (let i in data) {
      let key = false;
      for (let j in data[i]) {
        if (data[i][j].key === '1') {
          spcount++;
          key = data[i][j].text;
          codeArr.push(data[i][j].code);
          break;
        }
      }
      if (key === false) {
        standardText += specNameArr[i] + ": ;"
      } else {
        standardText += specNameArr[i] + ':' + key + ";"

      }
    }
    that.setState({
      specData:data,
      spcount: spcount,
      standard: standardText
    })
    if (spcount === specCount){
      let stockNum=0;
      let stockId=null;
      let popPrice=null;
      for(let i in sku){
        let key=false;
        for (let j in sku[i]['attri']){
          if (sku[i]['attri'][j].groupAttriValueId===codeArr[j]){
            key=true;
          }else{
            key=false;
            break;
          }
        }
        if(key===true){
          stockNum=sku[i].stockNum;
          stockId = sku[i]._id;
          popPrice = sku[i].price;
          break;
        }
      }
      that.setState({
        stockNum: stockNum,
        val:1,
        stockId: stockId,
        allBtn: true,
        popPrice: popPrice
      })
    }
  }
  //数量改变
  stepperChange(e){
    if(e>this.state.stockNum){
      this.setState({
        val:this.state.stockNum
      })
      Toast.info('库存不足', 1);
      return;
    }
    this.setState({
      val:e
    })
  }
  //加入购物车
  addGoodOrCart = async () => {
    //这样才能加入购物车
    //加入购物车
    console.log(this.state)
    let that = this;
    let stockNum = that.state.stockNum;
    let allBtn = that.state.allBtn;
    const { data, stockId, val, standard, productName, productImage, popPrice } = that.state
    if(this.state.loading){
      Toast.info('等待数据加载完毕',1);
    }else{
      if (allBtn) {
        if (this.state.val > stockNum) {
          Toast.info('库存不足',1);
        } else {
          let params = {
            // token: that.state.token,
            groupId: data._id,
            productId: stockId,
            count: val,
            userId: that.props.user._id,
            desc: standard,
            productName,
            productImage: productImage[0],
            price: popPrice,
            stockNum,
            score: cartProd
          }
          let res = await reqAddToCart(params)
          
          if(res.status === 0) {
            Toast_v5.show({
              content: '添加成功',
              icon: 'success',
            })
          } else {
            Toast_v5.show({
              content: '添加失败',
              icon: 'fail',
            })
          }
        }
      } else {
        Toast.info('请选择规格',1);
      }
    }
  }
  //购买
  buyImmediately(val){
    //点击立刻购买
    var that = this;
    var allBtn = that.state.allBtn;
    var result = that.state.data;

    if(this.state.loading){
      Toast.info('等待数据加载完毕',1);
    }else{
      if (allBtn) {
        if (that.state.val > that.state.stockNum) {
          Toast.info('库存不足',1);
        } else {
          //现在的思路是每次点击规格的时候就把规格参数记录起来，然后再点击立即购买的时候拿出数据，转跳界面的时候需要清除数据
          var allData = {};
          allData['items']=[]
          allData['items'].push({
              productId: that.state.goodId,
              selectQuantity: that.state.val,
              skuId: that.state.stockId,
              skuStr: that.state.standard,
              productName: that.state.productName,
              productPrice: that.state.popPrice,
              productImage: that.state.productImage[0],
              pickupWay: result.pickupWay || '1'
          })
          allData['pickupWay'] = result.pickupWay || '1';
          //保存数据到本地
          sessionStorage.setItem('goodDetailData', JSON.stringify(allData));
          sessionStorage.setItem('__search_prev_path__',this.props.location.pathname)
          this.props.history.push('/order')
        }
      } else {
        Toast.info('请选择规格',1);
      }
    }
  }

  addToCollection = async () => {
    let res = await reqAddToCollection(this.state.goodId, this.props.user._id, starProd)
    if(res.status) {
      Toast_v5.show({
        content: '收藏异常',
        icon: 'fail'
      })
    }
  }

  checkCollected = async () => {
    let res = await reqCheckCollected(this.state.goodId, this.props.user._id);
    if(res.status === 0 && res.data === 1) {
      this.setState({
        isCollected: true
      })
    }
  }

  delCollection = async () => {
    let res = await reqDelCollection(this.state.goodId, this.props.user._id, starProd)
    if(res.status) {
      Toast_v5.show({
        content: '收藏取消异常',
        icon: 'fail'
      })
    }
  }

  // 推荐模块 浏览商品
  watchProdFunc = async () => {
    // 添加浏览记录 推荐模块 该商品加分
    const userId = this.props.user._id;
    const groupId = this.state.goodId;
    await reqWatchProd(userId, groupId, watchProd);
  }

  //组件装载完毕
  componentDidMount(){
    let self = this
    this.resize()
    $(window).on('resize',()=>{
      self.resize()
    })
    this.getGoodsInfo()
    this.checkCollected()
    this.watchProdFunc()
  }
  render() {
    let prevPath = sessionStorage.getItem('__search_prev_path__')
    let goodsPrevPath = sessionStorage.getItem('__goods_prev_path__')
    console.log(prevPath)
    return (
      <div className="goods-page">
        {
          this.state.isOpen?
          <PhotoSwipe isOpen={this.state.isOpen} items={this.state.data?this.state.data.picobjs:[]} options={this.state.options} onClose={this.handleClose.bind(this)}/>
          :null
        }
        {/* <-头部 */}
        <Header returnbtn={true} title="商品详情" pathname={goodsPrevPath||'/'}></Header>
        {/* 头部-> */}
        {/* <-body */}
        {
        this.state.loading?
        <Loading/>
        :
        <div className="goods-main">
          {/* <--商品图片 */}
          {this.state.data?
          <Carousel
            autoplay={false}
            className="carousel"
            infinite={false}
            style={this.state.style}
            dotStyle={this.state.dotStyle}
            dotActiveStyle={this.state.dotStyle}
            beforeChange={(from, to) => {}}
            afterChange={index => {}}
          >
             {  
              this.state.data.picobjs.map((val,i) => (
                  <a
                    className="carousel-item"
                    key={i}
                    style={this.state.style}
                  >
                    <img
                      src={val['src']}
                      alt={val['src']}
                      onLoad={(ev) => {
                        // 图片加载完毕
                        window.dispatchEvent(new Event('resize'));
                        //计算图片宽高
                        this.calcImg(ev,i)
                      }}
                      onClick={()=>{
                        this.setState({
                          isOpen: true,
                          options:{
                            ...this.state.options,
                            index:i
                          }
                        })
                      }}
                    />
                  </a>
                ))
              }
          </Carousel>
          :null
          }
          {/* 商品图片--> */}
          {/* <--商品详情 */}
          <div className="buy-wrap">
              <div className="goods-name">
                <div className="goods-title">
                {this.state.data&&this.state.data.name}
                </div>
                <div className={this.state.isCollected ? "goods-favour-active" : "goods-favour"} onClick={ () => {
                  if(this.state.isCollected) {
                    this.delCollection()
                  }
                  else {
                    this.addToCollection()
                  }
                  this.setState({
                    isCollected: !this.state.isCollected
                  })
                } }>
                  收藏
                </div>
              </div>
              <div className="goods-desc">
              {this.state.data&&this.state.data.description}
              </div>
          </div>
          {/* 商品详情--> */}
          {/* <--价格 */}
          <div className="price-wrap">
              <div className="price">
                <span><i>￥</i>{this.state.data&&this.state.popPrice}</span>
                {/* <span>￥{this.state.data&&this.state.data.originaPrice}</span> */}
              </div>
              <div className="scoket">
                库存 <span>{this.state.data&&this.state.stockNum}</span>
              </div>
          </div>
           {/* 价格--> */}
           {
             this.state.specData&&this.state.specData.length>0? (
              <div className="item-list">
                <h3>选择</h3>
                <div className="item-content">
                  {this.state.standard}
                </div>
              </div>
             ) : null
           }
           
           {/* <--规格 */}
          <div className="sku-wrap">
            <div className="property-div">
              {/* 规格组 */}
              {
                this.state.specData&&this.state.specData.length>0?
                this.state.specData.map((item,i)=>{
                  return (
                    <div className="sku" key={i}>
                      <h3>{this.state.specNameArr&&this.state.specNameArr[i]}</h3>
                      <div className="sku-list">
                          {
                            item.map((jtem,j)=>{
                              return (
                                <div key={j} className={classnames({
                                  'option':true,
                                  'option-selected':jtem.key==="1"?true:false
                                })} onClick={()=>{
                                  //规格点击事件
                                  this.selectedSpec(i,j)
                                }}>{jtem.text}</div>
                              )
                            })
                          }
                      </div>
                    </div>
                  )
                })
                :null
              }
            </div>
            {/* 商品数量 */}
            <div className="sku-num">
              <div className="sku">
                    <h3>数量</h3>
                    <div className="sku-list">
                      <Stepper
                        className="stepper"
                        showNumber
                        min={1}
                        value={this.state.val}
                        onChange={(e)=>{
                          this.stepperChange(e)
                        }}
                      />
                    </div>
              </div>
            </div>
            {/* 商品数量 */}
          </div>
          {/* 规格--> */}
          <div className="info-wrap">
            <div className="info-header">商品详情</div>
            <div className="info-body" dangerouslySetInnerHTML = {{ __html:this.state.__html }}>
            </div>
          </div>
        </div>
        }
        {/* body-> */}
        <div className="fixed-btns">
          <div className="icon">
            <img src={require(`@/assets/images/msg@default.png`)} alt="客服"/>
            <span>客服</span>
          </div>
          <button className="btn-orange" onClick={this.addGoodOrCart}>加入购物车</button>
          <button onClick={()=>{
            this.buyImmediately()
          }}>购买</button>
        </div>
      </div>
    )
  }
}
export default connect(
  state => ({user: state.user})
)(GoodsDetail)

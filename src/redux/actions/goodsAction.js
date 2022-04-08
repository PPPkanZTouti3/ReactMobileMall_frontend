import {GETGOODSLIST} from '../types/goodsType'
import axios from 'axios'

export const getGoodsList = (search) => async(dispatch)=>{
    let params={
        search
    }
    let {data} = await axios.get('/api/goods/list',{params}).then(res=>res)
    // console.log(data)
    setTimeout(()=>{
        dispatch({type:GETGOODSLIST,goods:data.goodslist})
    },1000)
}
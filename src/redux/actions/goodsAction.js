import {GETGOODSLIST} from '@/redux/action-types'
import axios from 'axios'
import { reqSearchProd } from '@/api'

export const getGoodsList = (search) => async(dispatch)=>{
    let res = await reqSearchProd(search)
    setTimeout(()=>{
        dispatch({type:GETGOODSLIST,goods:res.data})
    },0)
}
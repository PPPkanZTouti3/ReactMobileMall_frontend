import {LOADCATE} from '../action-types'
import axios from 'axios'
import { reqCate } from '@/api'

export const loadCate = () => async (dispatch) => {
    let {data} = await reqCate()
    dispatch({type:LOADCATE,cates:data.data})
}
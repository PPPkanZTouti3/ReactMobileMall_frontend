import {LOADCATE} from '@types/loadType'
import axios from 'axios'

export const loadCate = () => async (dispatch) => {
    let {data} = await axios.get('/api/cate').then(res=>res)
    dispatch({type:LOADCATE,cates:data.data})
}
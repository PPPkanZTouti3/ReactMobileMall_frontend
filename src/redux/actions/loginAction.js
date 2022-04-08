import {
    RECEIVE_USER,
    SHOW_ERROR_MSG,
    RESET_USER
} from './action-types'
import { reqLogin } from '@/api'
import storageUtils from '@/utils/storageUtils'

// 接收用户的同步action
export const receiveUser = (user) => ({type: RECEIVE_USER, user})

// 显示错误信息同步action
export const showErrorMsg = (errorMsg) => ({type: SHOW_ERROR_MSG, errorMsg})

// 登录的异步acton
export const login = (username,password) => {
    return async dispatch => {
        const res = await reqLogin(username,password)
        // 登录成功 保存用户信息
        if(res.status === 0){
            const user = res.data;
            // 保存在local中
            storageUtils.saveUser(user);
            dispatch(receiveUser(user))
        }
        // 登录失败 显示错误信息
        else{
            const msg = res.msg;
            dispatch(showErrorMsg(msg))
        }
        
    }
}

// 用户退出登录同步action
export const logout = () => {
    storageUtils.removeUser();
    return {type: RESET_USER}
}

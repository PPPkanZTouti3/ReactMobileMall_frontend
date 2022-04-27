import storageUtils from '@/utils/storageUtils'
import {
    RECEIVE_USER,
    SHOW_ERROR_MSG,
    RESET_USER
} from '../action-types'

const initUser = storageUtils.getUser() 
export default (state = initUser, action) => {
    switch(action.type){
        case RECEIVE_USER:
            return action.user
        case SHOW_ERROR_MSG:
            const errorMsg = action.errorMsg
        // state.errorMsg = errorMsg  // 不要直接修改原本状态数据
            return {...state, errorMsg}
        case RESET_USER:
            return {}
        default: 
            return state
    }
}

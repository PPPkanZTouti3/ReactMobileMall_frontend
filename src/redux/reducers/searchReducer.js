import {CHANGEVAL} from '@types/searchType'
const initState = {
    val:''
}
export default (state=initState,action) => {
    switch(action.type){
        case CHANGEVAL:
            return {
                ...state,
                val:action.val
            }
        default:
            return state;
    }
}
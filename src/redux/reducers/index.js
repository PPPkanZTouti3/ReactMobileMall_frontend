import {combineReducers} from 'redux'

import loadReducer from './loadReducer'
import user from './userReducer'
import routerReducer from './routerReducer'
import searchReducer from './searchReducer'
import goodsReducer from './goodsReducer'

export default combineReducers({
    loadReducer,
    user,
    routerReducer,
    searchReducer,
    goodsReducer
})
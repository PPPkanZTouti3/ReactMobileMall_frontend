import {combineReducers} from 'redux'

import loadReducer from './loadReducer'
import loginReducer from './loginReducer'
import routerReducer from './routerReducer'
import searchReducer from './searchReducer'
import goodsReducer from './goodsReducer'

export default combineReducers({
    loadReducer,
    loginReducer,
    routerReducer,
    searchReducer,
    goodsReducer
})
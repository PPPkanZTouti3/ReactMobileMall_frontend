import {createStore,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import reducer from './reducers'
import {composeWithDevTools} from 'redux-devtools-extension'

// var devTools=window.devToolsExtension?window.devToolsExtension():null
// // var store = createStore(reducer,compose(
// //     applyMiddleware(thunk,logger),
// //     devTools
// // ))
// var store;
// if(window.devToolsExtension){
//     store = createStore(reducer,compose(
//         applyMiddleware(thunk,logger),
//         devTools
//     ))
// }else{
//     store = createStore(reducer,compose(
//         applyMiddleware(thunk,logger)
//     ))
// }


export default createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))
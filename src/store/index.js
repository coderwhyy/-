
import {createStore,applyMiddleware} from 'redux'
import Reducer from './CreateReducer.js'
import ThunkMiddleware from "redux-thunk"


//applyMiddleware：支持中间件，（填中间件名称），引入中间件:ThunkMiddleware
const StoreEnhancer=applyMiddleware(ThunkMiddleware)

//传入两个参数1.reducer  2.enhance的store
const store=createStore(Reducer,StoreEnhancer)

export default store
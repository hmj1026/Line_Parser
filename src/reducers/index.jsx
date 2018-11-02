import { combineReducers } from 'redux'
import todoLists from './todos'

const reducer  = combineReducers({ todoLists })

export default reducer
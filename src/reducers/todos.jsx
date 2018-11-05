import { ADD_TODO, DELETE_TODO } from '../actions'


const initialData = [
    { text: 'start' }
]

const todos = (state = initialData, action) => {
    switch(action.type) {
        case ADD_TODO:
            return [
                ...state,
                {
                    text: action.text
                }
            ]
        case DELETE_TODO:
            return [
                ...state.slice(0, action.index),
                ...state.slice(parseInt(action.index) + 1)
            ]
        default:
            return state
    }
}

export default todos
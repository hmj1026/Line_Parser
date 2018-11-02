/**
 * action type
 */

export const ADD_TODO = 'Add_Todo'
export const DELETE_TODO = 'Delete_Todo'

/** 
 * action creator
 */
export const addTodo = (text) => {
    return {
        type: ADD_TODO,
        text
    }
}

export const deleteTodo = (index) => {
    return  {
        type: DELETE_TODO,
        index
    }
}
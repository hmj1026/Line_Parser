import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addTodo, deleteTodo } from '../actions';
import TodoList from '../components/TodoList'

/**
 * @class TodoRoute
 */
class TodoRoute extends Component {
    render() {
        
        const { dispatch, todolist } = this.props

        return (
            <TodoList 
                todolist={ todolist }
                onAdd={ text => dispatch(addTodo(text)) }
                onDel={ index => dispatch(deleteTodo(index)) } />
        )
    }
}

const mapStateToProps = (state) => {
    
    return { todolist: state.todoLists }
}

export default connect(mapStateToProps)(TodoRoute)
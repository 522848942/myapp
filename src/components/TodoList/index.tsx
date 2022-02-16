import React, { FC, ReactElement, useCallback, useEffect, useReducer } from "react";

import TdList from "./List";
import TdInput from "./Input";
import { ACTION_TYPE, IState, ITodo } from "./typings";
import { todoreducer } from "./reducer";

function init (initTodoList: ITodo[]):IState {
    return {
        todoList: initTodoList
    }
}

const TodoList: FC = (): ReactElement => {

    const [state, dispatch] = useReducer(todoreducer,[] ,init)
    //链接localStorage
    useEffect(()=>{
        const todoList = JSON.parse(localStorage.getItem('todolist')||'[]')
        dispatch({
            type: ACTION_TYPE.INIT_TODOLIST,
            payload: todoList
        })
    },[])

    useEffect(()=>{
        localStorage.setItem('todolist', JSON.stringify(state.todoList))
    },[state.todoList])

    const addTodo = useCallback((todo: ITodo):void=>{
        dispatch({
            type: ACTION_TYPE.ADD_TODO,
            payload: todo
        })
    },[])

    const removeTodo = useCallback((id: number):void=>{
        dispatch({
            type: ACTION_TYPE.REMOVE_TODO,
            payload: id
        })
    },[])

    const toggleTodo = useCallback((id: number):void=>{
        dispatch({
            type: ACTION_TYPE.TOGGLE_TODO,
            payload: id
        })
    },[])

    return (
        <div className="TodoList">
            <TdInput 
                addTodo={ addTodo }
                todoList={ state.todoList }
            />
            <TdList 
                todoList={ state.todoList }
                removeTodo={ removeTodo }
                toggleTodo={ toggleTodo }
            />
        </div>
    )
}

export default TodoList
import React, { FC, ReactElement, useCallback, useReducer } from "react";

import TdList from "./List";
import TdInput from "./Input";
import { ACTION_TYPE, IState, ITodo } from "./typings";
import { todoreducer } from "./reducer";

const initialState:IState = {
    todoList: []
}


const TodoList: FC = (): ReactElement => {

    const [state, dispatch] = useReducer(todoreducer, initialState)

    const addTodo = useCallback((todo: ITodo)=>{
        dispatch({
            type: ACTION_TYPE.ADD_TODO,
            payload: todo
        })
    },[])

    return (
        <div className="TodoList">
            <TdInput 
                addTodo={ addTodo }
                todoList={ state.todoList }
            />
            <TdList />
        </div>
    )
}

export default TodoList
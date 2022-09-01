import React, {useCallback} from 'react';
import './App.css';
import {TodoList, TaskType} from "./TodoList";
import {AddItemForm} from "./components/AddItemForm";
import {
    AddTodoListAC,
    ChangeTitleTodoListAC,
    ChangeTodoListFilterAC,
    RemoveTodoListAC
} from "./state/todo-lists-reducer";
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC
} from "./state/tasks-reducer";

import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/state";


export type FilterValueType = 'all' | 'active' | 'completed'
export type TodoListType = {
    id: string
    title: string,
    filter: FilterValueType
}

export type TaskStateType = {
    [todoListID: string]: Array<TaskType>
}


const AppWithRedux = () => {

    const todoLists = useSelector<AppRootStateType, Array<TodoListType>>(state => state.todoLists)
    const tasks = useSelector<AppRootStateType, TaskStateType>(state => state.tasks)
    const dispatch = useDispatch()

// function:
// tasks
//добавляем новую таску. Жестко ее создаем и сетаем. Потом накидываем эту функцию на кнопку +
    const addTask = useCallback((title: string, todoListID: string) => {
        dispatch(addTaskAC(title, todoListID))
    }, [dispatch])
//Удаление таски
    const removeTask = useCallback((taskID: string, todolistId: string) => {
        dispatch(removeTaskAC(taskID, todolistId))
    },[dispatch])
//Изменение статуса isDone
    const changeTaskStatus = useCallback((taskId: string, isDone: boolean, todolistId: string) => {
        dispatch(changeTaskStatusAC(taskId, isDone, todolistId))
    }, [dispatch])
// Изменение названия Task
    const changeTaskTile = useCallback((taskId: string, title: string, todolistId: string) => {
        dispatch(changeTaskTitleAC(taskId, title, todolistId))
    }, [dispatch])

// TodoList
//Фильтруем таски по All, active, completed
    const changeFilter = useCallback((id: string, filter: FilterValueType) => {
        dispatch(ChangeTodoListFilterAC(id, filter))
    }, [dispatch])
//удаление TodoList
    const removeTodoList = useCallback((id: string) => {
        dispatch(RemoveTodoListAC(id))
    }, [dispatch])
// изменение тазвания TodoList
    const changeTitleTL = useCallback((id: string, title: string) => {
        dispatch(ChangeTitleTodoListAC(id, title))
    }, [dispatch])
// добавление TodoList
    const addTodoList = useCallback((title: string) => {
        const action = AddTodoListAC(title)
        // dispatch(action)
        dispatch(action)
    }, [dispatch])

//UI:
    const TodoListsComponents = todoLists.map(tl => {


        return (
            <TodoList
                key={tl.id}
                idTL={tl.id}
                title={tl.title}
                filter={tl.filter}
                tasks={tasks[tl.id]}

                addTask={addTask}
                removeTask={removeTask}
                changeFilter={changeFilter}
                changeTaskTile={changeTaskTile}
                changeTitleTL={changeTitleTL}
                removeTodoList={removeTodoList}
                changeTaskStatus={changeTaskStatus}/>
        )
    })

    return (
        <div className="App">
            <AddItemForm addItem={addTodoList}/>
            {TodoListsComponents}
        </div>
    );
}

export default AppWithRedux;

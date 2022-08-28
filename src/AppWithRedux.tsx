import React from 'react';
import './App.css';
import {TodoList, TaskType} from "./TodoList";
import {AddItemForm} from "./components/AddItemForm";
import {
    AddTodoListAC,
    ChangeTitleTodoListAC,
    ChangeTodoListFilterAC,
    RemoveTodoListAC,
    todoListsReducer
} from "./reducers/todo-lists-reducer";
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    tasksReducer
} from "./reducers/tasks-reducer";
import {combineReducers, createStore} from "redux";
import {useDispatch, useSelector} from "react-redux";


export type FilterValueType = 'all' | 'active' | 'completed'
export type TodoListType = {
    id: string
    title: string,
    filter: FilterValueType
}

export type TaskStateType = {
    [todoListID: string]: Array<TaskType>
}

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todoListsReducer
})

export const store = createStore(rootReducer)
export type AppRootStateType = ReturnType<typeof rootReducer>
// @ts-ignore
window.store = store

const AppWithRedux = () => {

    const todoLists = useSelector<AppRootStateType, Array<TodoListType>>(state => state.todoLists)
    const tasks = useSelector<AppRootStateType, TaskStateType>(state => state.tasks)
    const dispatch = useDispatch()

// function:
// tasks
//добавляем новую таску. Жестко ее создаем и сетаем. Потом накидываем эту функцию на кнопку +
    const addTask = (title: string, todoListID: string) => {
        dispatch(addTaskAC(title, todoListID))
    }
//Удаление таски
    const removeTask = (taskID: string, todolistId: string) => {
        dispatch(removeTaskAC(taskID, todolistId))
    }
//Изменение статуса isDone
    const changeTaskStatus = (taskId: string, isDone: boolean, todolistId: string) => {
        dispatch(changeTaskStatusAC(taskId, isDone, todolistId))
    }
// Изменение названия Task
    const changeTaskTile = (taskId: string, title: string, todolistId: string) => {
        dispatch(changeTaskTitleAC(taskId, title, todolistId))
    }

// TodoList
//Фильтруем таски по All, active, completed
    const changeFilter = (id: string, filter: FilterValueType) => {
        dispatch(ChangeTodoListFilterAC(id, filter))
    }
//удаление TodoList
    const removeTodoList = (id: string) => {
        dispatch(RemoveTodoListAC(id))
    }
// изменение тазвания TodoList
    const changeTitleTL = (id: string, title: string) => {
        dispatch(ChangeTitleTodoListAC(id, title))
    }
// добавление TodoList
    const addTodoList = (title: string) => {
        const action = AddTodoListAC(title)
        // dispatch(action)
        dispatch(action)
    }

//UI:
    const TodoListsComponents = todoLists.map(tl => {

        let tasksForRender;
        switch (tl.filter) {
            case 'completed':
                tasksForRender = tasks[tl.id].filter(t => t.isDone)
                break;
            case 'active':
                tasksForRender = tasks[tl.id].filter(t => !t.isDone)
                break;
            default:
                tasksForRender = tasks[tl.id]
                break;
        }
        return (
            <TodoList
                key={tl.id}
                idTL={tl.id}
                title={tl.title}
                filter={tl.filter}
                tasks={tasksForRender}

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

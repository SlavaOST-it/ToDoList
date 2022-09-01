import React, {memo, useCallback, useMemo} from 'react';
import './App.css';
import {FilterValueType} from "./App";
import {Button} from "./components/Button";
import {AddItemForm} from "./components/AddItemForm";
import s from "./components/Button.module.css"
import {EditableSpan} from "./components/EditableSpan";
import {Task} from "./components/Task";
import {TaskWithRedux} from "./components/TaskWithRedux";


type TodoListPropsType = {
    idTL: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValueType
    removeTask: (taskID: string, idTL: string) => void
    removeTodoList: (todoListID: string) => void
    changeTaskTile: (taskID: string, title: string, todoListID: string) => void
    changeFilter: (idTL: string, filter: FilterValueType) => void
    addTask: (title: string, idTL: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean, idTL: string) => void
    changeTitleTL: (title: string, todoListID: string) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export const TodoList = memo((props: TodoListPropsType) => {
    console.log("TodoList")

    // const removeTask = useCallback((taskId: string) => props.removeTask(taskId, props.idTL),
    //     [props.removeTask, props.idTL])
    // const changeTaskStatus = useCallback((taskId: string, newTaskStatus: boolean) => {
    //     props.changeTaskStatus(taskId, newTaskStatus, props.idTL)
    // }, [props.changeTaskStatus, props.idTL])
    //
    // // ф-ия для изменения названия таски
    // const changeTaskTitle = useCallback((taskId: string, title: string) => {
    //     props.changeTaskTile(taskId, title, props.idTL)
    // }, [props.changeTaskTile, props.idTL])


// вынесенная ф-я для удаления ТудуЛиста
    const removeTodoList = () => {
        props.removeTodoList(props.idTL)
    }

    const changeTitleTL = useCallback((title: string) => {
        props.changeTitleTL(title, props.idTL)
    }, [props.changeTitleTL, props.idTL])

    const addTask = useCallback((title: string) => {
        props.addTask(title, props.idTL)
    }, [props.addTask, props.idTL])

    const tsarClickHandler = (filterValue: FilterValueType) => {
        props.changeFilter(props.idTL, filterValue)
    }


    let tasks = props.tasks;
    switch (props.filter) {
        case 'completed':
            tasks = tasks.filter(t => t.isDone)
            break;
        case 'active':
            tasks = tasks.filter(t => !t.isDone)
            break;
        default:
            tasks = tasks
            break;
    }

    const tasksListItems = props.tasks.length
        ? tasks.map(t => {
            return (
                <TaskWithRedux key={t.id} task={t} todolistId={props.idTL}/>
            )
        })
        : <span>Введите задачу</span>


    return (
        <div>
            <h3>
                <EditableSpan title={props.title} changeTitle={changeTitleTL}/>
                <Button name={'x'} callBack={removeTodoList} className={''}/>
            </h3>

            <AddItemForm addItem={addTask}/>

            <ul>
                {tasksListItems}
            </ul>
            <div>

                <Button name={'All'} className={props.filter === 'all' ? `${s.button} + " " + ${s.active}` : ''}
                        callBack={() => tsarClickHandler('all')}/>
                <Button name={'Active'} className={props.filter === 'active' ? `${s.button} + " " + ${s.active}` : ''}
                        callBack={() => tsarClickHandler('active')}/>
                <Button name={'Completed'}
                        className={props.filter === 'completed' ? `${s.button} + " " + ${s.active}` : ''}
                        callBack={() => tsarClickHandler('completed')}/>
            </div>
        </div>

    );
})


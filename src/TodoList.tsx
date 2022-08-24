import React, {ChangeEvent} from 'react';
import './App.css';
import {FilterValueType} from "./App";
import {Button} from "./components/Button";
import {AddItemForm} from "./components/AddItemForm";
import s from "./components/Button.module.css"
import {EditableSpan} from "./components/EditableSpan";


type TodoListPropsType = {
    idTL: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValueType
    removeTask: (taskID: string, idTL: string) => void
    removeTodoList: (todoListID: string) => void
    changeTaskTile: (taskID: string, title: string, todoListID: string) => void
    changeFilter: (filter: FilterValueType, idTL: string) => void
    addTask: (title: string, idTL: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean, idTL: string) => void
    changeTitleTL: (title: string, todoListID: string) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export const TodoList = (props: TodoListPropsType) => {

    const tasksListItems = props.tasks.length
        ? props.tasks.map(task => {
            const removeTask = () => props.removeTask(task.id, props.idTL)
            const changeTaskStatus = (event: ChangeEvent<HTMLInputElement>) =>
                props.changeTaskStatus(task.id, event.currentTarget.checked, props.idTL)

            // ф-ия для изменения названия таски
            const changeTaskTitle = (title: string) => props.changeTaskTile(task.id, title, props.idTL)

            return (
                <li className={task.isDone ? 'isDone' : ''} key={task.id}>
                    <input
                        onChange={changeTaskStatus}
                        type="checkbox"
                        checked={task.isDone}
                    />
                    <EditableSpan title={task.title} changeTitle={changeTaskTitle}/>

                    <Button name={'x'} callBack={removeTask} className={''}/>
                </li>
            )

        })
        : <span>Введите задачу</span>

// вынесенная ф-я для удаления ТудуЛиста
    const removeTodoList = () => {
        props.removeTodoList(props.idTL)
    }

    const changeTitleTL = (title: string) => props.changeTitleTL(title, props.idTL)

    const addTask = (title: string) => {
        props.addTask(title, props.idTL)
    }

    const tsarClickHandler = (filterValue: FilterValueType) => {
        props.changeFilter(filterValue, props.idTL)
    }

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
}


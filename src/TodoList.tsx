import React, {ChangeEvent, useState} from 'react';
import './App.css';
import {FilterValueType} from "./App";
import {Button} from "./components/Button";
import {Input} from "./components/Input";


type TodoListPropsType = {
    idTL: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValueType
    removeTask: (taskID: string, idTL: string) => void
    removeTodoList: (todoListID: string) => void
    changeFilter: (filter: FilterValueType, idTL: string) => void
    addTask: (title: string, idTL: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean, idTL: string) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export const TodoList = (props: TodoListPropsType) => {
    const [title, setTitle] = useState(' ') //для временного хранения новых тасок затем передаем параметр в функцию addTask
    const [error, setError] = useState<boolean>(false)

    const tasksListItems = props.tasks.length
        ? props.tasks.map(task => {
            const removeTask = () => props.removeTask(task.id, props.idTL)
            const changeTaskStatus = (event: ChangeEvent<HTMLInputElement>) =>
                props.changeTaskStatus(task.id, event.currentTarget.checked, props.idTL)

            return (
                <li key={task.id}>
                    <input
                        onChange={changeTaskStatus}
                        type="checkbox"
                        checked={task.isDone}
                    />
                    <span className={task.isDone ? 'isDone' : ''}>{task.title}</span>
                    <Button name={'x'} callBack={removeTask} className={''}/>
                </li>
            )

        })
        : <span>Введите задачу</span>

// вынесенная функция для баттон по добавлению таск
    const addTaskHandler = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addTask(trimmedTitle, props.idTL)
        } else {
            setError(true)
        }
        setTitle('')
    }

// вынесенная ф-я для удаления ТудуЛиста
    const removeTodoList = () => {
        props.removeTodoList(props.idTL)
    }

    const tsarClickHandler = (filterValue: FilterValueType) => {
        props.changeFilter(filterValue, props.idTL)
    }

    return (
        <div>
            {props.title}
            <Button name={'x'} callBack={removeTodoList} className={''}/>
            <div>
                <Input
                    title={title}
                    setTitle={setTitle}
                    error={error}
                    setError={setError}
                    callBack={addTaskHandler}/>

                <Button name={'+'} className={''} callBack={addTaskHandler}/>
                {error && <div style={{color: "red"}}>Title is required!</div>}

            </div>
            <ul>
                {tasksListItems}
            </ul>
            <div>
                <Button name={'All'} className={props.filter === 'all' ? 'active' : ''}
                        callBack={() => tsarClickHandler('all')}/>
                <Button name={'Active'} className={props.filter === 'active' ? 'active' : ''}
                        callBack={() => tsarClickHandler('active')}/>
                <Button name={'Completed'} className={props.filter === 'completed' ? 'active' : ''}
                        callBack={() => tsarClickHandler('completed')}/>
            </div>
        </div>

    );
}


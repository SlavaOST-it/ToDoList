import React, {ChangeEvent, useState} from 'react';
import './App.css';
import {FilterValueType} from "./App";
import {Button} from "./components/Button";
import {Input} from "./components/Input";


type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    filter: FilterValueType
    removeTask: (taskID: string) => void
    changeFilter: (filter: FilterValueType) => void
    addTask: (title: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}


const TodoList = (props: TodoListPropsType) => {
    const [title, setTitle] = useState(' ') //для временного хранения новых тасок затем передаем параметр в функцию addTask
    const [error, setError] = useState<boolean>(false)

    const tasksListItems = props.tasks.length
        ? props.tasks.map(task => {
            const removeTask = () => props.removeTask(task.id)
            const changeTaskStatus = (event: ChangeEvent<HTMLInputElement>) =>
                props.changeTaskStatus(task.id, event.currentTarget.checked)

            return (
                <li>
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
            props.addTask(trimmedTitle)
        } else {
            setError(true)
        }
        setTitle('')
    }

    const tsarClickHandler = (filterValue: FilterValueType) => {
        props.changeFilter(filterValue)
    }

    return (
        <div>
            <h3>{props.title}</h3>
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
                <Button name={'All'} className={'active'} callBack={() => tsarClickHandler('all')}/>
                <Button name={'Active'} className={'active'} callBack={() => tsarClickHandler('active')}/>
                <Button name={'Completed'} className={'active'} callBack={() => tsarClickHandler('completed')}/>
            </div>
        </div>

    );
}

export default TodoList;
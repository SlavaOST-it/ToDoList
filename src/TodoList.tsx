import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValueType} from "./App";


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


    const tasksListItems = props.tasks.map(task => {
        const removeTask = () => props.removeTask
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
                <button onClick={removeTask}>x</button>
            </li>
        )

    })

    const onClickAddTaskHandler = () => {        // вынесенная функция для баттон по добавлению таск
        props.addTask(title)
        setTitle('')
    }

    const onKeyDownAddTask = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && event.ctrlKey) {
            onClickAddTaskHandler()
        }
    }

    const onChangeSetTitle = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }

    const onAllClickHandler = () => {
        props.changeFilter('All')
    }

    const onActiveClickHandler = () => {
        props.changeFilter('Active')
    }

    const onCompletedClickHandler = () => {
        props.changeFilter('Completed')
    }

    /*   const tsarClickHandler = (filterValue: FilterValueType) => {
           props.changeFilter(filterValue)*/


    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    value={title}
                    onChange={onChangeSetTitle}     //функция для ввода данных
                    onKeyDown={onKeyDownAddTask}   //функция по вводу данных по клавише ctrl+enter
                />

                <button onClick={onClickAddTaskHandler}>+</button>
            </div>
            <ul>
                {tasksListItems}
            </ul>
            <div>
                <button className={props.filter === 'All' ? 'active' : ''}
                        onClick={onAllClickHandler}>All
                </button>
                <button className={props.filter === 'Active' ? 'active' : ''}
                        onClick={onActiveClickHandler}>Active
                </button>
                <button className={props.filter === 'Completed' ? 'active' : ''}
                        onClick={onCompletedClickHandler}>Completed
                </button>

            </div>
        </div>

    );
}


export default TodoList;
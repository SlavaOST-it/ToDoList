import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValueType} from "./App";

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskID: string) => void
    changeFilter: (filter: FilterValueType) => void
    addTask: (title: string) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}


const TodoList = (props: TodoListPropsType) => {

    const [title, setTitle] = useState(' ') //для временного хранения новых тасок
    // затем передаем параметр в функцию addTask

    const tasksListItems = props.tasks.map(task => {
        return (
            <li>
                <input type="checkbox" checked={task.isDone}/>
                <span>{task.title}</span>
                <button onClick={() => props.removeTask(task.id)}>x</button>
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

    const onAllClickHandler =()=>{
        props.changeFilter('All')
    }

    const onActiveClickHandler =()=>{
        props.changeFilter('Active')
    }

    const onCompletedClickHandler =()=>{
        props.changeFilter('Completed')
    }

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
                <button onClick={onAllClickHandler}>All</button>
                <button onClick={onActiveClickHandler}>Active</button>
                <button onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>

    );
};

export default TodoList;
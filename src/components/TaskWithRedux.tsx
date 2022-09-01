import React, {ChangeEvent, memo} from 'react';
import {TaskType} from "../TodoList";
import {EditableSpan} from "./EditableSpan";
import {Button} from "./Button";
import {useDispatch} from "react-redux";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../state/tasks-reducer";

type TaskPropsType = {
    task: TaskType,
    todolistId: string
}

export const TaskWithRedux: React.FC<TaskPropsType> = memo(({
                                                                task,
                                                                todolistId
                                                            }) => {
    const dispatch = useDispatch()

// удаление таски
    const removeTask = () => {
        dispatch(removeTaskAC(task.id, todolistId))
    }

// изменение статуса таски
    const changeTaskStatus = (event: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeTaskStatusAC(task.id, event.currentTarget.checked, todolistId))
    }

// ф-ия для изменения названия таски
    const changeTaskTitle = (title: string) => {
        dispatch(changeTaskTitleAC(task.id, title, todolistId))
    }

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
    );
});


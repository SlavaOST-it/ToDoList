import React, {ChangeEvent, memo} from 'react';
import {TaskType} from "../TodoList";
import {EditableSpan} from "./EditableSpan";
import {Button} from "./Button";

type TaskPropsType = {
    task: TaskType,
    changeTaskStatus: (taskID: string, isDone: boolean) => void,
    changeTaskTitle: (taskID: string, title: string) => void,
    removeTask: (taskID: string) => void
}

export const Task: React.FC<TaskPropsType> = memo(({
                                                       task,
                                                       changeTaskStatus,
                                                       changeTaskTitle,
                                                       removeTask
                                                   }) => {
    console.log("Task")

    const removeTask1 = () => removeTask(task.id)

    const changeTaskStatus1 = (event: ChangeEvent<HTMLInputElement>) =>
        changeTaskStatus(task.id, event.currentTarget.checked)

    // ф-ия для изменения названия таски
    const changeTaskTitle1 = (title: string) => changeTaskTitle(task.id, title)

    return (
        <li className={task.isDone ? 'isDone' : ''} key={task.id}>
            <input
                onChange={changeTaskStatus1}
                type="checkbox"
                checked={task.isDone}
            />
            <EditableSpan title={task.title} changeTitle={changeTaskTitle1}/>

            <Button name={'x'} callBack={removeTask1} className={''}/>
        </li>
    );
});


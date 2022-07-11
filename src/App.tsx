import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";
import {v1} from 'uuid';

export type FilterValueType = 'All' | 'Active' | 'Completed'

const App = () => {
    const title: string = "What to learn"
    const [tasks, setTasks] = useState<TaskType[]>([
        {id: v1(), title: "HTML", isDone: true},
        {id: v1(), title: "CSS", isDone: true},
        {id: v1(), title: "JS/ES6", isDone: false},
        {id: v1(), title: "React", isDone: false},
    ])

    const [filter, setFilter] = useState<FilterValueType>('All')
    //добавляем новую таску. Жестко ее создаем и сетаем. Потом накидываем эту функцию на кнопку +
    const addTask = (title: string) => {
        const newTask: TaskType = {id: v1(), title: title, isDone: false}
        setTasks([newTask, ...tasks])
    }

    const removeTask = (taskID: string) => {
        const updatedTasks = tasks.filter(task => task.id !== taskID)
        setTasks(updatedTasks)
    }

    let tasksForRender;
    switch (filter) {
        case 'Completed':
            tasksForRender = tasks.filter(t => t.isDone)
            break
        case 'Active':
            tasksForRender = tasks.filter(t => !t.isDone)
            break
        default:
            tasksForRender = tasks
    }

    const changeFilter = (value: FilterValueType) => { // вместо value можно дать любое имя
        setFilter(value)
    }

    const changeTaskStatus = (taskID: string, isDone: boolean) => {
        setTasks(tasks.map(t => t.id === taskID ? {...t, isDone: isDone} : t))
    }

    return (
        <div className="App">
            <TodoList title={title}
                      tasks={tasksForRender}
                      filter={filter}
                      addTask={addTask}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      changeTaskStatus={changeTaskStatus}/>

        </div>
    );
}

export default App;

import React from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";

const App = () => {
    const title_1: string = "What to learn"
    const title_2: string = "What to buy?"

    const tasks_1: Array<TaskType> = [
        {id: 1, title: "HTML", isDone: true},
        {id: 2, title: "CSS", isDone: true},
        {id: 3, title: "JS/ES6", isDone: false},
    ]

    const tasks_2: Array<TaskType> = [
        {id: 1, title: "Car", isDone: true},
        {id: 2, title: "Bread", isDone: true},
        {id: 3, title: "Sugar", isDone: false},
    ]

    return (
        <div className="App">
            <TodoList title={title_1} tasks={tasks_1}/>
            <TodoList title={title_2} tasks={tasks_2}/>
        </div>
    );
}

export default App;

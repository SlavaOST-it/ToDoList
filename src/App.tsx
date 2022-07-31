import React, {useState} from 'react';
import './App.css';
import {TodoList, TaskType} from "./TodoList";
import {v1} from 'uuid';
import {AddItemForm} from "./components/AddItemForm";

export type FilterValueType = 'all' | 'active' | 'completed'
type TodoListType = {
    id: string
    title: string,
    filter: FilterValueType
}

type TaskStateType = {
    [todoListID: string]: Array<TaskType>
}

const App = () => {
    //BLL:
    //State todoLists:
    const todoListID_1 = v1()
    const todoListID_2 = v1()
    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListID_1, title: "What to learn", filter: 'all'},
        {id: todoListID_2, title: "What to buy", filter: 'all'},
    ])

    const [tasks, setTasks] = useState<TaskStateType>({
        [todoListID_1]: [
            {id: v1(), title: "HTML", isDone: true},
            {id: v1(), title: "CSS", isDone: true},
            {id: v1(), title: "JS/ES6", isDone: false},
            {id: v1(), title: "React", isDone: false},
        ],
        [todoListID_2]: [
            {id: v1(), title: "Bread", isDone: false},
            {id: v1(), title: "Beer", isDone: true},
            {id: v1(), title: "Meat", isDone: true},
            {id: v1(), title: "Milk", isDone: false},
        ]
    })

// function:
//добавляем новую таску. Жестко ее создаем и сетаем. Потом накидываем эту функцию на кнопку +
    const addTask = (title: string, todoListID: string) => {
        setTasks({...tasks, [todoListID]: [{id: v1(), title: title, isDone: false}, ...tasks[todoListID]]})
    }
//Удаление таски
    const removeTask = (taskID: string, todoListID: string) => {
        setTasks({...tasks, [todoListID]: tasks[todoListID].filter(task => task.id !== taskID)})
    }
//Фильтруем таски по All, active, completed
    const changeFilter = (filter: FilterValueType, todoListID: string) => {
        setTodoLists(todoLists.map(tl => tl.id === todoListID ? {...tl, filter: filter} : tl))
    }
//Изменение статуса isDone
    const changeTaskStatus = (taskID: string, isDone: boolean, todoListID: string) => {
        //(t => t.id === taskID ? {...t, isDone: isDone} : t))
        setTasks({...tasks, [todoListID]: tasks[todoListID].map(t => t.id === taskID ? {...t, isDone: isDone} : t)})
    }
//удаление TodoList
    const removeTodoList = (todoListID: string) => {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListID))
        delete tasks[todoListID]
    }
// добавление TodoList
    const addTodoList = (title: string) => {
        const newTodoListID = v1();
        const newTodoList: TodoListType = {
            id: newTodoListID,
            title: title,
            filter: "all"
        }
        setTodoLists([...todoLists, newTodoList])
        setTasks({...tasks, [newTodoListID]: []})
    }

//UI:
    const TodoListsComponents = todoLists.map(tl => {

        let tasksForRender;
        switch (tl.filter) {
            case 'completed':
                tasksForRender = tasks[tl.id].filter(t => t.isDone)
                break;
            case 'active':
                tasksForRender = tasks[tl.id].filter(t => !t.isDone)
                break;
            default:
                tasksForRender = tasks[tl.id]
                break;
        }
        return (
            <TodoList
                key={tl.id}
                idTL={tl.id}
                title={tl.title}
                filter={tl.filter}
                tasks={tasksForRender}

                addTask={addTask}
                removeTask={removeTask}
                changeFilter={changeFilter}
                removeTodoList={removeTodoList}
                changeTaskStatus={changeTaskStatus}/>
        )
    })

    return (
        <div className="App">
            <AddItemForm addItem={addTodoList}/>
            {TodoListsComponents}
        </div>
    );
}

export default App;

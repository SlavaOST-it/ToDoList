import React, {useReducer} from 'react';
import './App.css';
import {TodoList, TaskType} from "./TodoList";
import {v1} from 'uuid';
import {AddItemForm} from "./components/AddItemForm";
import {
    AddTodoListAC,
    ChangeTitleTodoListAC,
    ChangeTodoListFilterAC,
    RemoveTodoListAC,
    todoListsReducer
} from "./reducers/todo-lists-reducer";
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    tasksReducer
} from "./reducers/tasks-reducer";

export type FilterValueType = 'all' | 'active' | 'completed'
export type TodoListType = {
    id: string
    title: string,
    filter: FilterValueType
}

export type TaskStateType = {
    [todoListID: string]: Array<TaskType>
}

const AppWithReducer = () => {
    //BLL:
    //State todoLists:
    const todoListID_1 = v1()
    const todoListID_2 = v1()
    const [todoLists, dispatchTodoLists] = useReducer(todoListsReducer,[
        {id: todoListID_1, title: "What to learn", filter: 'all'},
        {id: todoListID_2, title: "What to buy", filter: 'all'},
    ])

    const [tasks, dispatchTasks] = useReducer(tasksReducer,{
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
// tasks
//добавляем новую таску. Жестко ее создаем и сетаем. Потом накидываем эту функцию на кнопку +
    const addTask = (title: string, todoListID: string) => {
        dispatchTasks(addTaskAC(title, todoListID))
    }
//Удаление таски
    const removeTask = (taskID: string, todolistId: string) => {
        dispatchTasks(removeTaskAC(taskID, todolistId))
    }
//Изменение статуса isDone
    const changeTaskStatus = (taskId: string, isDone: boolean, todolistId: string) => {
        dispatchTasks(changeTaskStatusAC(taskId, isDone , todolistId))
    }
// Изменение названия Task
    const changeTaskTile = (taskId: string, title: string, todolistId: string) => {
        dispatchTasks(changeTaskTitleAC(taskId, title, todolistId))
    }

// TodoList
//Фильтруем таски по All, active, completed
    const changeFilter = (id: string, filter: FilterValueType ) => {
        dispatchTodoLists(ChangeTodoListFilterAC(id, filter))
    }
//удаление TodoList
    const removeTodoList = (id: string) => {
        dispatchTodoLists(RemoveTodoListAC(id))
    }
// изменение тазвания TodoList
    const changeTitleTL = (id: string, title: string) =>{
        dispatchTodoLists(ChangeTitleTodoListAC(id, title))
    }
// добавление TodoList
    const addTodoList = (title: string) => {
        const action = AddTodoListAC(title)
        dispatchTodoLists(action)
        dispatchTasks(action)
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
                changeTaskTile={changeTaskTile}
                changeTitleTL={changeTitleTL}
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

export default AppWithReducer;

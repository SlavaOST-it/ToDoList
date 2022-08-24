import {TaskStateType} from "../App";
import {v1} from "uuid";
import {AddTodoListAT, RemoveTodoListAT} from "./todolists-reducer";


export type RemoveTaskAT = {
    type: "REMOVE-TASK",
    taskId: string,
    todolistId: string

}
export type AddTaskAT = {
    type: "ADD-TASK",
    todolistId: string
    title: string
}
export type ChangeTaskStatusAT = {
    type: "CHANGE-TASK-STATUS",
    taskId: string,
    isDone: boolean,
    todolistId: string
}

export type ChangeTaskTitleAT = {
    type: "CHANGE-TITLE-TASK",
    taskId: string,
    title: string,
    todolistId: string
}

export type ActionCreatorType =
    RemoveTaskAT
    | AddTaskAT
    | ChangeTaskStatusAT
    | ChangeTaskTitleAT
    | AddTodoListAT
    | RemoveTodoListAT

export const tasksReducer = (state: TaskStateType, action: ActionCreatorType): TaskStateType => {
    switch (action.type) {
        case "REMOVE-TASK":
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].filter(tasks => tasks.id !== action.taskId)
            }

        case "ADD-TASK":
            return {
                ...state,
                [action.todolistId]: [{id: v1(), title: action.title, isDone: false}, ...state[action.todolistId]]
            }

        case "CHANGE-TASK-STATUS":
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ? {
                    ...t,
                    isDone: action.isDone
                } : t)
            }

        case "CHANGE-TITLE-TASK":
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ? {
                    ...t,
                    title: action.title
                } : t)
            }
        case "ADD-TODOLIST":
            return {
                ...state,
                [action.todolistId]: []
            }

        case "REMOVE-TODOLIST": {
            let copyState = {...state}
            delete copyState[action.id]
            return copyState
        }


        default:
            return state
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskAT => {
    return {type: "REMOVE-TASK", taskId, todolistId} as const
}
export const addTaskAC = (title: string, todolistId: string): AddTaskAT => {
    return {type: "ADD-TASK", title, todolistId} as const
}
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string): ChangeTaskStatusAT => {
    return {type: "CHANGE-TASK-STATUS", taskId, isDone, todolistId} as const
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): ChangeTaskTitleAT => {
    return {type: "CHANGE-TITLE-TASK", taskId, title, todolistId} as const
}

import {FilterValueType, TodoListType} from "../AppWithRedux";
import {v1} from "uuid";


export type RemoveTodoListAT = ReturnType<typeof RemoveTodoListAC>
export type AddTodoListAT = ReturnType<typeof AddTodoListAC>
export type ChangeTitleTodoListAT = ReturnType<typeof ChangeTitleTodoListAC>
export type ChangeTodoListFilterAT = ReturnType<typeof ChangeTodoListFilterAC>
export type ActionCreatorType = RemoveTodoListAT | AddTodoListAT | ChangeTitleTodoListAT | ChangeTodoListFilterAT

export const initialState: Array<TodoListType> = []

export const todoListsReducer = (state = initialState, action: ActionCreatorType): Array<TodoListType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return state.filter(tl => tl.id !== action.payload.todolistId)

        case "ADD-TODOLIST":
            const newTodoList: TodoListType = {id: action.payload.todolistId, title: action.payload.newTodolistTitle, filter: "all"}
            return [...state, newTodoList]

        case "CHANGE-TITLE-TODOLIST":
            return state.map(tl => tl.id === action.payload.todolistId ? {...tl, title: action.payload.title} : tl)

        case "CHANGE-FILTER-TODOLIST":
            return state.map(tl => tl.id === action.payload.todolistId ? {...tl, filter: action.payload.filter} : tl)

        default:
            return state
    }
}

export const RemoveTodoListAC = (todolistId: string) => {
    return {
        type: "REMOVE-TODOLIST",
        payload: {todolistId}
    } as const
}

export const AddTodoListAC = (newTodolistTitle: string) => {
    return {
        type: "ADD-TODOLIST",
        payload: {newTodolistTitle, todolistId: v1()}
    } as const
}

export const ChangeTitleTodoListAC = (todolistId: string, title: string,) => {
    return {
        type: "CHANGE-TITLE-TODOLIST",
        payload: {todolistId, title}
    } as const

}

export const ChangeTodoListFilterAC = (todolistId: string, filter: FilterValueType) => {
    return {
        type: "CHANGE-FILTER-TODOLIST",
        payload: {todolistId, filter}
    } as const

}
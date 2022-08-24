import {FilterValueType, TodoListType} from "../App";



export type RemoveTodoListAT = {
    type: "REMOVE-TODOLIST"
    id: string
}
export type AddTodoListAT = {
    type: "ADD-TODOLIST"
    title: string,
    todolistId: string
}
export type ChangeTitleTodoListAT = {
    type: "CHANGE-TITLE-TODOLIST"
    title: string,
    id: string
}
export type ChangeTodoListFilterAT = {
    type: "CHANGE-FILTER-TODOLIST"
    filter: FilterValueType
    id: string
}
export type ActionCreatorType = RemoveTodoListAT | AddTodoListAT | ChangeTitleTodoListAT | ChangeTodoListFilterAT

export const todolistsReducer = (todolists: Array<TodoListType>, action: ActionCreatorType): Array<TodoListType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return todolists.filter(tl => tl.id !== action.id)

        case "ADD-TODOLIST":
            const newTodoListID = action.todolistId;
            const newTodoList: TodoListType = {
                id: newTodoListID,
                title: action.title,
                filter: "all"
            }
            return [...todolists, newTodoList]

        case "CHANGE-TITLE-TODOLIST":
            return todolists.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)

        case "CHANGE-FILTER-TODOLIST":
            return todolists.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)

        default:
            return todolists
    }
}

export const RemoveTodoListAC = (id: string): RemoveTodoListAT => ({type: "REMOVE-TODOLIST", id})
export const AddTodoListAC = (title: string, todolistId: string): AddTodoListAT => ({
    type: "ADD-TODOLIST",
    title,
    todolistId
})
export const ChangeTitleTodoListAC = (id: string, title: string,): ChangeTitleTodoListAT => ({
    type: "CHANGE-TITLE-TODOLIST",
    id,
    title
})
export const ChangeTodoListFilterAC = (filter: FilterValueType, id: string): ChangeTodoListFilterAT => ({
    type: "CHANGE-FILTER-TODOLIST",
    id,
    filter
})
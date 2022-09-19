import axios from 'axios'
import {CreateTodolist, DeleteTodolist, GetTodolists} from "../stories/todolists-api.stories";

export type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: D
}

type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
}


const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    withCredentials: true,
    headers: {
        "API-KEY": "dd070108-da2d-47ec-bd5a-e22f291be6bf"
    }
})


export const todolistAPI = {
    getTodolists() {
        const promise = instance.get<TodolistType[]>('/todo-lists')
        return promise
    },
    updateTodolist(todolistId: string, title: string) {
        const promise = instance.put<ResponseType>(
            `/todo-lists/${todolistId}`,
            {title}
        )
        return promise
    },
    createTodolist(title: string) {
        const promise = instance.post<ResponseType<{ item: TodolistType }>>('/todo-lists',
            {title}
        )
        return promise
    },
    deleteTodolist(todolistId: string) {
        const promise = instance.delete<ResponseType>(`/todo-lists/${todolistId}`)
        return promise
    }
}

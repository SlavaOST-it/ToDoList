import React, {useEffect, useState} from 'react'
import axios from "axios";
import {todolistAPI} from "../api/todolist-api";


export default {
    title: 'API'
}
const settings = {
    withCredentials: true,
    headers: {
        "API-KEY": "dd070108-da2d-47ec-bd5a-e22f291be6bf"
    }
}
export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.getTodolists()
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const title = "API"
        todolistAPI.createTodolist(title)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = "922d34d7-d01a-4c80-a745-5df2653e5b01"

        todolistAPI.deleteTodolist(todolistId)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = "78092114-ea36-42ce-802c-e90394550994"
        const title = "Test"
        todolistAPI.updateTodolist(todolistId, title)
            .then((res)=>{
                setState(res.data)
            })

    }, [])

    return <div>{JSON.stringify(state)}</div>
}

import {TaskStateType, TodoListType} from "../App";
import {tasksReducer} from "./tasks-reducer";
import {AddTodoListAC, todolistsReducer} from "./todolists-reducer";

test('ids should be equals', () => {
    const startTasksState: TaskStateType = {}
    const startTodoListsState: Array<TodoListType> = []

    const action = AddTodoListAC('new todolist', 'todolistId')

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodoListsState = todolistsReducer(startTodoListsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodoLists = endTodoListsState[0].id

    expect(idFromTasks).toBe(action.todolistId)
    expect(idFromTodoLists).toBe(action.todolistId)
})
import {TaskStateType, TodoListType} from "../App";
import {tasksReducer} from "./tasks-reducer";
import {AddTodoListAC, todoListsReducer} from "./todo-lists-reducer";

test('ids should be equals', () => {
    const startTasksState: TaskStateType = {}
    const startTodoListsState: Array<TodoListType> = []

    const action = AddTodoListAC('new todolist')

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodoListsState = todoListsReducer(startTodoListsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodoLists = endTodoListsState[0].id

    expect(idFromTasks).toBe(action.payload.todolistId)
    expect(idFromTodoLists).toBe(action.payload.todolistId)
})
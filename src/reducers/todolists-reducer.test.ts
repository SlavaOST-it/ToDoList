import {v1} from "uuid";
import {FilterValueType, TodoListType} from "../App";
import {
    AddTodoListAC,
    ChangeTitleTodoListAC,
    ChangeTodoListFilterAC,
    RemoveTodoListAC,
    todolistsReducer
} from "./todolists-reducer";


let todolistId1: string
let todolistId2: string
let startState: Array<TodoListType>

beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();

    startState = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]
})
// =======================================================================//
test('correct todolist should be removed', () => {

    // 2. Вызов тестируемой функции:
    const endState = todolistsReducer(startState, RemoveTodoListAC(todolistId2))
    // 3. Сверка результата c ожиданием:
    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId1);
});


// =======================================================================//
test('correct todolist should be added', () => {

    let newTodolistTitle = "New Todolist";


    const endState = todolistsReducer(startState, AddTodoListAC(newTodolistTitle, 'todolistId2'))

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTodolistTitle);
});


// =======================================================================//
test('correct todolist should change its name', () => {

    let newTodolistTitle = "New Todolist";

    const endState = todolistsReducer(startState, ChangeTitleTodoListAC(todolistId2, newTodolistTitle));

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});


// =======================================================================//
test('correct filter of todolist should be changed', () => {

    let newFilter: FilterValueType = "completed";

    const endState = todolistsReducer(startState, ChangeTodoListFilterAC(newFilter, todolistId2));

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});

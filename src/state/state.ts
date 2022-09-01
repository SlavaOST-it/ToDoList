
import {combineReducers, compose, legacy_createStore} from "redux";
import {tasksReducer} from "./tasks-reducer";
import {todoListsReducer} from "./todo-lists-reducer";




const rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todoListsReducer
})

// export const store = createStore(rootReducer)
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = legacy_createStore(rootReducer, composeEnhancers());
export type AppRootStateType = ReturnType<typeof rootReducer>
// @ts-ignore
window.store = store

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}


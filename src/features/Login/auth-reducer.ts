import {Dispatch} from 'redux'
import {setAppStatusAC} from '../../app/app-reducer'
import {authAPI, LoginParamsType, StatusCode} from "../../api/todolists-api";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


const initialState = {
    isLoggedIn: false
}

const slice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setIsLoggedIn(state, action: PayloadAction<{ value: boolean }>) {
            state.isLoggedIn = action.payload.value
        }
    }
})

export const authReducer = slice.reducer
export const {setIsLoggedIn} = slice.actions


// thunks
export const loginTC = (data: LoginParamsType) => async (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status:'loading'}))
    const res = await authAPI.login(data)
    try {
        if (res.data.resultCode === StatusCode.OK) {
            dispatch(setIsLoggedIn({value: true}))
        } else {
            handleServerAppError(res.data, dispatch);
        }
    } catch (error) {
        handleServerNetworkError(error, dispatch)
    } finally {
        dispatch(setAppStatusAC({status: 'succeeded'}))
    }
}

export const logOutTC = () => async (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    const res = await authAPI.logOut()
    try {
        if (res.data.resultCode === StatusCode.OK) {
            dispatch(setAppStatusAC({status: 'succeeded'}))
            dispatch(setIsLoggedIn({value: false}))
        } else {
            handleServerAppError(res.data, dispatch);
        }
    } catch (error) {
        handleServerNetworkError(error, dispatch)
    }
}

// types
type ActionsType = ReturnType<typeof setIsLoggedIn>
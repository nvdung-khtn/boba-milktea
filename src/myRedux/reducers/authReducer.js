import { createReducer } from '@reduxjs/toolkit'
import { SET_USER, CLEAR_USER } from '../actionType/authActionType'

const initState = {
    userRole: undefined,
    username: undefined,
}

const authReducer = createReducer(initState, {
    SET_USER: (state, action) => ({
        ...state,
        username: action.username,
        userRole: action.userRole
    }),
    CLEAR_USER: (state) => ({
        username: undefined,
        userRole: undefined
    }),
})

export default authReducer;
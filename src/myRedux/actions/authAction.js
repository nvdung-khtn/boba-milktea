import { SET_USER, CLEAR_USER } from '../actionType/authActionType'
export const setUser = (username, userRole) => ({ type: SET_USER, username, userRole });
export const clearUser = () => ({ type: CLEAR_USER });
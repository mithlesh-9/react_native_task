import {UserActionTypes} from './user.types'


const INITIAL_STATE = {
    isAuthenticated: false,
    username: '',
    isCheckingUsername: false,
    usernameErrors: null,
    userData: null,
    isLoggingIn:false,
    currentUser:'',
    loginErros: null
}
export function UserReducer(state = INITIAL_STATE,action) {
    switch (action.type) {
        case UserActionTypes.CHECK_USERNAME_START:
            return {
                ...state,
                isCheckingUsername: true,
                usernameErrors: null,
                userData: null,
                username: '',
            }
        case UserActionTypes.GET_AUTH:
            return {
                ...state,
                ...action.payload
            }
        case UserActionTypes.CHECK_USERNAME_SUCCESS:
            return {
                ...state,
                isCheckingUsername: false,
                usernameErrors: null,
                userData: action.payload.user,
                username: action.payload.username
            }
        case UserActionTypes.CHECK_USERNAME_FAILURE:
            return {
                ...state,
                isCheckingUsername: false,
                usernameErrors: action.payload,
                userData: null,
                username: '',
            }

        case UserActionTypes.LOGIN_START:
            return {
                ...state,
                isLoggingIn: true,
                currentUser: null,
                loginErros: null,
                isAuthenticated: false,

            }
        case UserActionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                isLoggingIn: false,
                loginErros: null,
                currentUseruserData: action.payload,
                isAuthenticated: true,
            }
        case UserActionTypes.LOGIN_FAILURE:
            return {
                ...state,
                isLoggingIn: false,
                loginErros: action.payload,
                currentUser: null,
                isAuthenticated: false,
            }
        case UserActionTypes.LOGOUT:
            return {
                ...state,
                currentUser: '',
                isAuthenticated: false,
            }     
        default:
            return state;
    }
}
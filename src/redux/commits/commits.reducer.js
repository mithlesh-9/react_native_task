import {CommitsActionTypes} from './commits.types'

const INITIAL_STATE = {
    isLoading: false,
    data: null,
    errors: null,
    usernameRepo:''
}
export function CommitsReducer(state = INITIAL_STATE,action) {
    switch (action.type) {
        case CommitsActionTypes.FETCH_COMMITS_START:
            return {
                ...state,
                isLoading: true,
                data: null,
                errors: null,
                usernameRepo:''
            }
        case CommitsActionTypes.FETCH_COMMITS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.payload.data,
                errors: null,
                usernameRepo:action.payload.usernameRepo
            }
        case CommitsActionTypes.FETCH_COMMITS_FAILURE:
            return {
                ...state,
                isLoading: false,
                data: null,
                errors: action.payload,
                usernameRepo:''
            }
        case CommitsActionTypes.CLEAR_DATA:
            return {
                ...state,
                isLoading: false,
                data: null,
                errors: null,
                usernameRepo:''
            }        

    
        default:
            return state;
    }
}
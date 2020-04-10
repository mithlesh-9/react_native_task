import axios from 'axios'
import {CommitsActionTypes} from './commits.types'


export const fetchCommits = (usernameRepo,page = 1) => {
    return dispatch => {
        dispatch({type:CommitsActionTypes.FETCH_COMMITS_START})
        return axios.get(`https://api.github.com/repos/${usernameRepo}/commits?page=${page}`)
                    .then(res => res.data)
                    .then(res => {
                          return dispatch({type:CommitsActionTypes.FETCH_COMMITS_SUCCESS,payload:{data:res,usernameRepo}})
                    })
                    .catch(err => dispatch({type:CommitsActionTypes.FETCH_COMMITS_FAILURE,payload:err.message}))
    }
}

export const clearCommits = () => dispatch => dispatch({type:CommitsActionTypes.CLEAR_DATA})



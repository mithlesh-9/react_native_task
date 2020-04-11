import axios from 'axios'
import {CommitsActionTypes} from './commits.types'
import { BASE_URL } from '../../constants/Contants'


export const fetchCommits = (usernameRepo,page = 1) => {
    return dispatch => {
        dispatch({type:CommitsActionTypes.FETCH_COMMITS_START})
        return axios.get(`${BASE_URL}/repos/${usernameRepo}/commits?page=${page}`)
                    .then(res => res.data)
                    .then(res => {
                          return dispatch({type:CommitsActionTypes.FETCH_COMMITS_SUCCESS,payload:{data:res,usernameRepo}})
                    })
                    .catch(err => {
                        let message =  err.message
                        if(message.includes('404')) {
                            message = `Invalid Repository.`
                        } else if(message.includes('50')) {
                            message = `An error ocured in server. Please try later`
                        }
                        return dispatch({type:CommitsActionTypes.FETCH_COMMITS_FAILURE,payload:message})
                    })
    }
}

export const clearCommits = () => dispatch => dispatch({type:CommitsActionTypes.CLEAR_DATA})



import axios from 'axios'
import {UserActionTypes} from './user.types'
import { BASE_URL } from '../../constants/Contants'
import { UserAuth } from '../../database/database'
const userDb = new UserAuth()


export const checkUsername = (username) => {
    return dispatch => {
        dispatch({type:UserActionTypes.CHECK_USERNAME_START})
        return axios.get(`${BASE_URL}/users/${username}`)
                    .then(res => res.data)
                    .then(res => {
                          return dispatch({type:UserActionTypes.CHECK_USERNAME_SUCCESS,payload:{user:res,username:username}})
                    })
                    .catch(err => {
                        let message =  err.message
                        if(message.includes('404')) {
                            message = `Username doesnot exists.`
                        } else if(message.includes('50')) {
                            message = `An error ocured in server. Please try later`
                        }
                       return dispatch({type:UserActionTypes.CHECK_USERNAME_FAILURE,payload:message})
                    })
    }
}


export const Login = ({username,password}) => {
    return dispatch => {
        dispatch({type:UserActionTypes.LOGIN_START})
        return axios.get(`${BASE_URL}/user`, {
                auth: { username: username, password: password }
                }).then(res => res.data)
                .then((res) => {
                userDb.addAuth(res.login)
                      .then(()=> dispatch({type:UserActionTypes.LOGIN_SUCCESS,payload:res.login}))
                })
              .catch(err => {
                    let message =  err.message
                    if(message.includes('401')) {
                        message = `Bad credentials.`
                    } else if(message.includes('50')) {
                        message = `An error ocured in server. Please try later`
                    }
                  return dispatch({type:UserActionTypes.LOGIN_FAILURE,payload:message})})
    }
}


export const Logout = () => {
    return dispatch => userDb.clearAuth()
                            .then(() => dispatch({type:UserActionTypes.LOGOUT}))
                            .catch(err => console.warn(err))
}

export const getAuthData = () => {
    return dispatch => {
       return userDb.getAuth()
                    .then(data => {
                        if(data) {
                            return dispatch({type:UserActionTypes.GET_AUTH,payload:data})
                        } else {
                            return dispatch({type:UserActionTypes.GET_AUTH,payload:{isAuthenticated:false,currentUser:''}})
                        }
                    })
    }
}
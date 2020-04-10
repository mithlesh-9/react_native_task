import axios from 'axios'
import {UserActionTypes} from './user.types'


export const checkUsername = (username) => {
    return dispatch => {
        dispatch({type:UserActionTypes.CHECK_USERNAME_START})
        return axios.get(`https://api.github.com/users/${username}`)
                    .then(res => res.data)
                    .then(res => {
                          return dispatch({type:UserActionTypes.CHECK_USERNAME_SUCCESS,payload:{user:res,username:username}})
                    })
                    .catch(err => dispatch({type:UserActionTypes.CHECK_USERNAME_FAILURE,payload:'Invalid Username.'}))
    }
}


export const Login = ({username,password}) => {
    return dispatch => {
        return dispatch({type:UserActionTypes.LOGIN_SUCCESS,payload:{login:'mithleshfreak'}})
        return axios.get('https://api.github.com/user',{}, {
                auth: { username: username, password: password }
                },{
                    headers: {
                        Authorization : 'Basic bWl0aGxlc2hmcmVhazpyb2NraXQxNDY2'
                    }
                }).then(res => res.data)
                .then(res => {
                    return dispatch({type:UserActionTypes.LOGIN_SUCCESS,payload:res})
                })
              .catch(err => {
                  console.log(err.data);
                  return dispatch({type:UserActionTypes.LOGIN_FAILURE,payload:err.message})})
    }
}


export const Logout = () => {
    return dispatch => dispatch({type:UserActionTypes.LOGOUT})
}
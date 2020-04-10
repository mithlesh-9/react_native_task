import { combineReducers } from 'redux'
import { UserReducer } from './user/user.reducer.js'
import { CommitsReducer } from './commits/commits.reducer'

const rootReducers = combineReducers({
    user: UserReducer,
    commits: CommitsReducer
});

export default rootReducers
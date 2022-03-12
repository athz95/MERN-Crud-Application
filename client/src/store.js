import {createStore, combineReducers, applyMiddleware} from "redux"
import thunk from "redux-thunk"
import {composeWithDevTools} from "redux-devtools-extension"
import { userRegisterReducer, userDetailsReducer, userListReducer, userDeleteReducer, userUpdateReducer } from "./reducers/userReducer"

//setting reducers 
const reducer = combineReducers({
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer
})

//setting initial states
const initialState = {}

//initializing redux-thunk(redux middleware)
const middleware = [thunk]

//initializing the
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
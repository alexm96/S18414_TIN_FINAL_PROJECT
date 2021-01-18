import {createStore,combineReducers,applyMiddleware,compose} from "redux";
import thunk from "redux-thunk"
import auth from "../reducers/auth"
const someComposer=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose ;
export default ()=>{
    const store=createStore(combineReducers({auth}),someComposer(applyMiddleware(thunk)))
    return store;
}
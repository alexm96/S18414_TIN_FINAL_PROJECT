import {createStore,combineReducers,applyMiddleware,compose} from "redux";
import thunk from "redux-thunk"
import auth from "../reducers/auth"
import search from "../reducers/search"
const someComposer=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose ;

export default ()=>{
    const store=createStore(combineReducers({auth,search}),someComposer(applyMiddleware(thunk)))
    store.subscribe( () => {
        console.log('state\n', store.getState());
    });
    return store;
}
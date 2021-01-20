export default (state={},action)=>{
    switch(action.type){
        case "LOGIN":
            return {...state,jwt:action.jwt_token,loggedIn:!!action.jwt_token}
        case "LOGOUT":
            return {...state,jwt:undefined,loggedIn: false}
        default:
            return state
    }
}
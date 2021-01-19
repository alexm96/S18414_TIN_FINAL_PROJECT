export default (state={},action)=>{
    switch(action.type){
        case "LOGIN":
            return {...state,jwt:action.jwt_token}
        case "LOGOUT":
            return {}
        default:
            return state
    }
}
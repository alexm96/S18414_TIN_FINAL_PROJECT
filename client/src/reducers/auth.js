export default (state={},action)=>{
    switch(action.type){
        case "LOGIN":

            return {jwt:action.jwt_token}
            break;
        case "LOGOUT":
            return {}
            break;
        default:
            return state
    }
}
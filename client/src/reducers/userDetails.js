export default (state={},action)=>{
    switch(action.type){
        case "UPDATE":
            return {...state,...action.userDetails}
        case "SET":

            return {...action.userDetails}
        default:
            return state
    }
}
export default (state={},action)=>{
    switch(action.type){
        case "UPDATE":
            return {...state,...action.userDetails}
        case "SET":

            return {...action.userDetails};
        case "SETADS":
            return {...state,...{"myAds":action.userAds}}
        default:
            return state
    }
}
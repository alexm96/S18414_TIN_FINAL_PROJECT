export default (state=[],action)=>{
    switch(action.type){
        case "SEARCH":
            return action.searchResult


        default:
            return state
    }
}
export default (array=[],action)=>{
    switch(action.type){
        case "SEARCH":
            let newArray=array.slice()
            newArray.splice(action.index,1)
            return newArray
        default:
            return array
    }
}
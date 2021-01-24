import axios from "axios";

export const update =  (searchResult) =>({
    type: 'UPDATE',
    userDetails:searchResult
});
export const set =  (getResult) =>({
    type: 'SET',
    userDetails:getResult
});
export const updateDetails=async (updateFields)=>{

    const result=await  axios.patch("/user",{params:updateFields})
        .then(res => {
            return res;
        }).catch((error)=>{
            return error.response
        })
    return result
}
import axios from "axios";

export const search =  (searchResult) =>({
    type: 'SEARCH',
    searchResult
});
export const getSearchItems=async (searchFields)=>{
    console.log(searchFields)
    const result=await  axios.get("/post/",{params:searchFields})
        .then(res => {
            return res;
        }).catch((error)=>{
            return error.response
        })
    return result
}
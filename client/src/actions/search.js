import axios from "axios";

export const search =  (searchResult) =>({
    type: 'SEARCH',
    searchResult
});
export const getSearchItems=async (searchFields,pageNumber,pageSize)=>{
    console.log(searchFields)
    const result=await  axios.get(`/post/?pNum=${pageNumber}&pSize=${pageSize}`,{params:searchFields})
        .then(res => {
            return res;
        }).catch((error)=>{
            return error.response
        })
    return result
}
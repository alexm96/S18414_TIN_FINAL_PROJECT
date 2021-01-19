import axios from "axios";

export const login =  (jwt_token) =>({
    type: 'LOGIN',
    jwt_token
});
export const logout = () =>({
    type: 'LOGOUT',
        undefined
});
export const  startLogin= async(loginFields)=>{
    console.log(loginFields)
    const result=await  axios.post("/login",loginFields)
        .then(res => {
            return res;
        })
    return result
}
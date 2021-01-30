import axios from "axios";

export const login = (jwt_token,is_admin) => ({
  type: "LOGIN",
  jwt_token,
    admin:is_admin
});
export const logout = () =>({
    type: 'LOGOUT',
        undefined,
    admin:false
});
export const  startLogin= async(loginFields)=>{
    console.log(loginFields)
    const result=await  axios.post("/login",loginFields)
        .then(res => {
            return res;
        }).catch((error)=>{
            return error.response
        })
    console.log(result)
    return result
}
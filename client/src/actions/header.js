import axios from "axios";
export const checkLoginStatus = () =>{
    return(dispatch, getState) =>{
        return  getState().auth.loggedIn;
}
};
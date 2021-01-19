import React, { useState } from "react";
import {connect} from "react-redux";

const Home=({getJwt,history})=>{
    return(
        <div>
            Am I logged in ? {(getJwt!==undefined).toString()}
        <button onClick={()=>{
            history.push("login")
        }}>Login!</button>
        </div>

    )

};
const mapStateToProps=(state)=>({
    getJwt:state.auth.jwt
})
export default connect(mapStateToProps)(Home);
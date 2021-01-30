import {Router, Route, Switch, Redirect} from "react-router-dom"
import {connect} from "react-redux";
import React, {Component} from "react";


const AdminRoute=({getAdmin,getLoggedIn,component:Component,rest})=>(
    <Route {...rest} component={(props)=>(
        getAdmin && getLoggedIn ? <div> <Component {...props} /></div> : <Redirect to={"/home"}/>
    )} />
)
const mapStateToProps=(state)=>({
    getLoggedIn:state.auth.loggedIn,
    getAdmin:state.auth.admin
})
export default connect(mapStateToProps)(AdminRoute)
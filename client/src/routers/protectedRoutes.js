import {Router, Route, Switch, Redirect} from "react-router-dom"
import {connect} from "react-redux";
import React, {Component} from "react";

const ProtectedRoute=({getLoggedIn,component:Component,rest})=>(
        <Route {...rest} component={(props)=>(
            getLoggedIn ? <div> <Component {...props} /></div> : <Redirect to={"/login"}/>
        )} />
)
const AdminRoute=({getAdmin,component:Component,rest})=>(
    <Route {...rest} component={(props)=>(
        getAdmin ? <div> <Component {...props} /></div> : <Redirect to={"/login"}/>
    )} />
)
const mapStateToProps=(state)=>({
    getLoggedIn:state.auth.loggedIn,
    getAdmin:state.auth.admin
})
export default connect(mapStateToProps)(ProtectedRoute)
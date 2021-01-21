import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import EuroSymbolIcon from '@material-ui/icons/EuroSymbol';
import {connect} from "react-redux";
import { logout} from "../actions/auth";
import {checkLoginStatus} from "../actions/header";
import {withRouter} from 'react-router'
import {Container} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    boldText:{
        fontWeight:"bold",
        color:"black"
    },
    pointer:{
    cursor:"pointer"
    },
    "should-be-hidden":{
        display:"none"
    }
}));
const Header=({getLoggedIn,history,logoutDispatch})=>{
    const [isLoggedIn,setLoggedIn]=useState(getLoggedIn)
    const sendMeHome=(event)=>{
        event.preventDefault()
        history.push("/")
    }
    useEffect(() => {
        // sometimes login/logout works, this forces the component to re-render if it changes
        setLoggedIn(getLoggedIn)
    },[getLoggedIn]);
    const classes = useStyles();
    return(
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title} >
                        <span onClick={sendMeHome} className={classes.pointer}><a className={classes.boldText} >Faux</a>lx</span>
                    </Typography>
                    <Button color="inherit" className={getLoggedIn ? classes["should-be-hidden"] : ""} onClick={(event)=>{
                        event.preventDefault()
                        history.push("/register")
                    }}>Register</Button>
                    <Button color="inherit" className={!getLoggedIn ? classes["should-be-hidden"] : ""} onClick={(event)=>{
                        event.preventDefault()
                        history.push("/createAd")
                    }}>Create new ad</Button>
                    <Button color="inherit" onClick={(event)=>{
                        event.preventDefault()
                        if(!getLoggedIn){
                            history.push("/login")
                        }else{
                            logoutDispatch()
                        }
                    }}>{!getLoggedIn ? "Login" : "Logout"  }</Button>
                </Toolbar>
            </AppBar>
        </div>
    )
}
const mapStateToProps=(state)=>({
    getLoggedIn:state.auth.loggedIn
})
const mapDispatchToProps=(dispatch)=>({
    logoutDispatch:()=>dispatch(logout()),
    checkLoginStatus:()=>dispatch(checkLoginStatus())
})
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Header));
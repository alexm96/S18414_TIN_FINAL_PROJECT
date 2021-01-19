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
    }
}));
const Header=({checkLoginStatus,history,logoutDispatch})=>{
    const [isLoggedIn,setLoggedIn]=useState(checkLoginStatus())
    const sendMeHome=(event)=>{
        event.preventDefault()
        history.push("/")
    }
    useEffect(() => {
        // sometimes login/logout works, this forces the component to re-render if it changes
        setLoggedIn(isLoggedIn)
    },[checkLoginStatus()]);
    const classes = useStyles();
    return(
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>

                    <Typography variant="h6" className={classes.title} >
                        <a onClick={sendMeHome} className={classes.pointer}><a className={classes.boldText} >Faux</a>lx</a>
                    </Typography>
                    <Button color="inherit" hidden={true} onClick={(event)=>{
                        event.preventDefault()
                        history.push("/register")
                    }}>Register</Button>
                    <Button color="inherit" onClick={(event)=>{
                        event.preventDefault()
                        if(!checkLoginStatus()){
                            history.push("/login")
                        }else{
                            logoutDispatch()
                        }
                    }}>{!checkLoginStatus() ? "Login" : "Logout"  }</Button>
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
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
import {withRouter} from 'react-router'

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
}));
const Header=({getLoggedIn,history,logoutDispatch})=>{
    const [isLoggedIn,setLoggedIn]=useState(getLoggedIn)
    useEffect(() => {
        // sometimes login/logout works, this forces the component to re-render if it changes
        setLoggedIn(getLoggedIn)
    },[getLoggedIn]);
    const classes = useStyles();
    return(
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={()=>{
                        history.push("/")
                    }}>
                        <EuroSymbolIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Fauxlx
                    </Typography>
                    <Button color="inherit" hidden={true} onClick={(event)=>{
                        event.preventDefault()
                        history.push("/register")
                    }}>Register</Button>
                    <Button color="inherit" onClick={(event)=>{
                        event.preventDefault()
                        if(!getLoggedIn){
                            history.push("/login")
                        }else{
                            logoutDispatch()
                        }
                    }}>{!isLoggedIn ? "Login" : "Logout"  }</Button>
                </Toolbar>
            </AppBar>
        </div>
    )
}
const mapStateToProps=(state)=>({
    getLoggedIn:state.auth.loggedIn
})
const mapDispatchToProps=(dispatch)=>({
    logoutDispatch:()=>dispatch(logout())
})
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Header));
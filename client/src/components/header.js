import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { logout } from "../actions/auth";
import { checkLoginStatus } from "../actions/header";
import { withRouter } from "react-router";
import { search } from "../actions/search";
import ProfileMenu from "./profileMenu";
import "../../src/i18n/i18n"
import { useTranslation } from 'react-i18next';
import ReactCountryFlag from "react-country-flag"
import i18n from "../../src/i18n/i18n";
import methods from "emoji-flags"
import Switch from "@material-ui/core/Switch";
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
  boldText: {
    fontWeight: "bold",
    color: "black",
  },
  pointer: {
    cursor: "pointer",
  },
  "should-be-hidden": {
    display: "none",
  },
}));
const Header = ({ getLoggedIn, history, logoutDispatch, searchDispatch }) => {

  const { t } = useTranslation();
  const [isLoggedIn, setLoggedIn] = useState(getLoggedIn);
  const sendMeHome = (event) => {
    event.preventDefault();
    searchDispatch([]);
    history.push("/");
  };
  useEffect(() => {
    // sometimes login/logout works, this forces the component to re-render if it changes
    setLoggedIn(getLoggedIn);
  }, [getLoggedIn]);
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>

          <Typography variant="h6" className={classes.title}>
            <span onClick={sendMeHome} className={classes.pointer}>
              <a className={classes.boldText}>Fau</a>lx
            </span>
          </Typography>
          <ReactCountryFlag countryCode={"SE"}
                            svg
                            cdnUrl="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/1x1/"
                            cdnSuffix="svg"
                            title="SE"/>
          <Switch
              defaultChecked
              color="default"
              inputProps={{ 'aria-label': 'checkbox with default color' }}
              onChange={(e)=>{
                if(e.target.checked){
                  //english
                  i18n.changeLanguage("en").then(()=>{
                    console.log("ok")
                  })
                }
                else{
                  //se
                  i18n.changeLanguage("se").then(()=>{
                    console.log("ok")
                  })
                }
              }}
          />
          <ReactCountryFlag countryCode={"CA"}
              svg
                            cdnUrl="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/1x1/"
                            cdnSuffix="svg"
                            title="CA"/>
          <Button
            color="inherit"
            className={getLoggedIn ? classes["should-be-hidden"] : ""}
            onClick={(event) => {
              event.preventDefault();
              history.push("/register");
            }}
          >
            {t("signUp")}
          </Button>
          <Button
            color="inherit"
            className={!getLoggedIn ? classes["should-be-hidden"] : ""}
            onClick={(event) => {
              event.preventDefault();
              history.push("/createAd");
            }}
          >
            {t("header.createAd")}
          </Button>
          <div className={!getLoggedIn ? classes["should-be-hidden"] : ""}>
            <ProfileMenu />
          </div>
          <Button
            color="inherit"
            className={getLoggedIn ? classes["should-be-hidden"] : ""}
            onClick={(event) => {
              event.preventDefault();
              history.push("/login");
            }}
          >
            {t("login")}
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};
const mapStateToProps = (state) => ({
  getLoggedIn: state.auth.loggedIn,
});
const mapDispatchToProps = (dispatch) => ({
  logoutDispatch: () => dispatch(logout()),
  checkLoginStatus: () => dispatch(checkLoginStatus()),
  searchDispatch: (fakeData) => dispatch(search(fakeData)),
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
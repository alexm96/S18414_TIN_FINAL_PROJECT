import { GeneralInput, useStyles } from "./registrationPage";
import React, { useState } from "react";
import {validateEmail} from "../utils"
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import axios from "axios"
const LoginPage = () => {
  const classes = useStyles();
  const generateEmptyFields = () => {
    return {
      email: "",
      password: "",
    };
  };

  const [loginFields, setLoginFields] = useState(generateEmptyFields());
  const [canSubmit, setCanSubmit] = useState(false);

  const [loading,setLoading]=useState()
  const [loginResponse,setLoginResponse]=useState("")
  const onUpdate = (event) => {
    const keyItem = event.target.name;
    const value = event.target.value;
    const newFormData = { ...loginFields, [keyItem]: value };
    setCanSubmit (newFormData["password"] && validateEmail(newFormData["email"]) && event.target.reportValidity());
    setLoginFields(newFormData);
  };
  const checkValidityAllFields=(event)=>{
    event.target.reportValidity()
  }
  const  onClick = async (event) => {
    //post to endpoint here
      event.preventDefault()
      setLoading(true)
      await  axios.post("/login",loginFields)
      .then(res => {
        setLoginResponse(res["data"])
        setLoading(false) 
      })  
    } 
  
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <form className={classes.form} noValidate onChange={checkValidityAllFields}>
          <Grid container spacing={2}>
            <GeneralInput
              name="email"
              placeholder="Your email"
              type="email"
              updateFunction={onUpdate}
            ></GeneralInput>
            <GeneralInput
              name="password"
              placeholder="password"
              updateFunction={onUpdate}
              type="password"
            ></GeneralInput>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={!canSubmit}
              className={classes.submit}
              onClick={onClick}
            >
              Login
            </Button>
          </Grid>
        </form>
        <p id="loading-bar" hidden={!loading}>Logging you in</p>
        <p hidden={!loginResponse}>{loginResponse}</p>
      </div>
    </Container>
  );
};
export { LoginPage };

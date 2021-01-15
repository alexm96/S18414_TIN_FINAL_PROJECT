import { GeneralInput, useStyles } from "./registrationPage";
import React, { useState } from "react";

import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";

import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
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
  const onUpdate = (event) => {
    const keyItem = event.target.name;
    const value = event.target.value;
    const newFormData = { ...loginFields, [keyItem]: value };
    setCanSubmit(event.target.reportValidity() && newFormData["password"]);
    setLoginFields(newFormData);
  };
  const onClick = (event) => {
    //post to endpoint here
    event.preventDefault();
    console.log(loginFields);
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <form className={classes.form} noValidate>
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
      </div>
    </Container>
  );
};
export { LoginPage };

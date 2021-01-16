// registration page needs email, name , lastname, location details, password
import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import axios from "axios"
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
const GeneralInput = (props) => {
  return (
    <Grid item xs={12} sm={6}>
      <TextField
        className="input-field"
        type={props.type ? props.type : "text"}
        name={props.name}
        placeholder={props.placeholder}
        variant="outlined"
        required
        fullWidth
        onChange={props.updateFunction}
      ></TextField>
    </Grid>
  );
};
const RegistrationPage = () => {
  const classes = useStyles();
  const generateEmptyFields = () => {
    return {
      first_name: "",
      last_name: "",
      email: "",
      address_line1: "",
      address_line2: "",
      country: "",
      postal_code: "",
      confirmPassword: "",
      password: "",
    };
  };
  const verifyData = (someFormData, target) => {
    return (
      someFormData["password"] &&
      someFormData["password"] === someFormData["confirmPassword"] &&
      target.reportValidity()
    );
  };
  const [registrationFields, setRegistrationFields] = useState(
    generateEmptyFields()
  );
  const [canSubmit, setCanSubmit] = useState(false);
  const [isLoading,setLoading]=useState(false)
  const [creationResponse,setCreationResponse]=useState("")
  const onUpdate = (event) => {
    const target = event.target;
    const keyItem = event.target.name;
    const value = event.target.value;
    const newFormData = { ...registrationFields, [keyItem]: value };
    console.log(event.target.reportValidity());
    setCanSubmit(verifyData(newFormData, target));
    setRegistrationFields(newFormData);

  };
  const verifyFormValidity = () => {
    // check if form is filled  
for (const [key, value] of Object.entries(registrationFields)){
    if(value===""){
      return false
    }
}   
    return true;

  };
  const login = async (event) => {
    event.preventDefault();
    const fieldsToSend={...registrationFields,...{"confirmPassword":undefined}} // no reason to send the password twice 
    if (verifyFormValidity()) {
      setLoading(true)
      await axios.post("/register",fieldsToSend)
      .then(res => {
        console.log(res["data"])
        setLoading(false)
        setCreationResponse(res.data)
        
      })
    } else {
      alert("Please check that all form fields are filled in ");
    }
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <GeneralInput
              name="first_name"
              placeholder="Your first name"
              updateFunction={onUpdate}
            ></GeneralInput>
            <GeneralInput
              name="last_name"
              placeholder="Your last name"
              updateFunction={onUpdate}
            ></GeneralInput>
            <GeneralInput
              name="email"
              placeholder="Your email"
              type="email"
              updateFunction={onUpdate}
            ></GeneralInput>
            <GeneralInput
              name="address_line1"
              placeholder="Address line 1"
              updateFunction={onUpdate}
            ></GeneralInput>
            <GeneralInput
              name="address_line2"
              placeholder="Address line 2"
              updateFunction={onUpdate}
            ></GeneralInput>
            <GeneralInput
              name="country"
              placeholder="Country"
              updateFunction={onUpdate}
            ></GeneralInput>
            <GeneralInput
              name="postal_code"
              placeholder="postal code"
              updateFunction={onUpdate}
            ></GeneralInput>
            <GeneralInput
              name="city"
              placeholder="city"
              updateFunction={onUpdate}
            ></GeneralInput>
            <GeneralInput
              name="password"
              placeholder="password"
              updateFunction={onUpdate}
            ></GeneralInput>
            <GeneralInput
              name="confirmPassword"
              placeholder="confirm password"
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
              onClick={login}
            >
              Sign Up
            </Button>
            
          </Grid>
        </form>
        <p hidden={!isLoading}> Loading </p>
        <p>{creationResponse} </p>
      </div>
    </Container>
  );
};
export { RegistrationPage, GeneralInput, useStyles };

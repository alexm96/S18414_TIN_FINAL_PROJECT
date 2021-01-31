// registration page needs email, name , lastname, location details, password
import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import axios from "axios"
import {GeneralInput} from "./generalInput";
import {connect} from "react-redux";
import useStyles from "./generalStyles"
import "../../src/i18n/i18n"
import { useTranslation } from 'react-i18next';
const phRegex= "\+[0-9]+"

const RegistrationPage = ({getJwt}) => {
  const {t}=useTranslation()
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
      password: ""
    };
  }; // TODO add a useeffect here maybe , with dep of registrationfields(so then it can check validity everytime, rather than me calling it )
  const verifyData = (someFormData, target) => {
    return (
      someFormData["password"] &&
      someFormData["password"] === someFormData["confirmPassword"] &&
      verifyFormValidity()
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
  const register = async (event) => {
    event.preventDefault();
    const fieldsToSend={...registrationFields,...{"confirmPassword":undefined}} // no reason to send the password twice 
    if (verifyFormValidity()) {
      setLoading(true)
      await axios.post("/register",fieldsToSend)
      .then(res => {
        console.log(res["data"])
        setLoading(false)
        setCreationResponse(res["data"])
        
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
          {t("signUp")}
        </Typography>
        <form className={classes.form} noValidate >
          <Grid container spacing={2}>
            <GeneralInput
              name="first_name"
              placeholder={t("firstName")}
              updateFunction={onUpdate}
            ></GeneralInput>
            <GeneralInput
              name="last_name"
              placeholder={t("lastName")}
              updateFunction={onUpdate}
            ></GeneralInput>
            <GeneralInput
              name="email"
              placeholder={t("email")}
              type="email"
              updateFunction={onUpdate}
            ></GeneralInput>
            <GeneralInput name="phonenumber" type ="tel" placeholder={"Phone number"} updateFunction={onUpdate} pattern={phRegex}></GeneralInput>
            <GeneralInput
              name="address_line1"
              placeholder={t("addressLine1")}
              updateFunction={onUpdate}
            ></GeneralInput>
            <GeneralInput
              name="address_line2"
              placeholder={t("addressLine2")}
              updateFunction={onUpdate}
            ></GeneralInput>
            <GeneralInput
              name="country"
              placeholder={t("country")}
              updateFunction={onUpdate}
            ></GeneralInput>
            <GeneralInput
              name="postal_code"
              placeholder={t("postalCode")}
              updateFunction={onUpdate}
            ></GeneralInput>
            <GeneralInput
              name="city"
              placeholder={t("city")}
              updateFunction={onUpdate}
            ></GeneralInput>
            <Grid item xs={12} sm={6}>
            </Grid>
            <GeneralInput
              name="password"
              placeholder={t("password")}
              updateFunction={onUpdate}
              type="password"
            ></GeneralInput>
            <GeneralInput
              name="confirmPassword"
              placeholder={t("confirmPassword")}
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
              onClick={register}
            >
              {t("signUp")}
            </Button>

          </Grid>
        </form>
        <p hidden={!isLoading}> Loading </p>
        <p>{creationResponse} </p>
      </div>
    </Container>
  );
};
const mapStateToProps=(state)=>({
  getJwt:state.auth.jwt
})

export default connect(mapStateToProps)(RegistrationPage);



import React, { useEffect, useState } from "react";

import TextField from "@material-ui/core/TextField";

import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import useStyles from "./generalStyles";
import "../../src/i18n/i18n"
import {useTranslation} from "react-i18next";
import { connect } from "react-redux";
import { set, update, updateDetails } from "../actions/userDetails";
import axios from "axios";

const UserProfile = ({  getJwt, set,  }) => {
  const {t}=useTranslation()
  const classes = useStyles();
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    addressLine1: "",
    addressLine2: "",
    country: "",
    postalCode: "",
    city: "",
    phoneNumber: "",
  });
  const [creationText, setCreationText] = useState("");
  const updateValues = (event) => {
    setUserData({ ...userData, [event.target.name]: event.target.value });
  };
  useEffect(() => {
    // setting values to current stuff here
    axios
      .get("users/", { headers: { Accept: "application/json", jwt: getJwt } })
      .then((res) => {
        setUserData(res.data);
      });
  }, []);
  const tryUpdate = async (event) => {
    event.preventDefault();
    setCreationText("");
    axios
      .put("/users", userData, { headers: { jwt: getJwt } })
      .then((result) => {
        set(userData); // setting the global user data in the axios store
        setCreationText(result.data.message);
      })
      .catch((err) => {
        setCreationText(err.response.data.message);
      });
  };

  return (
    <div>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            {t("personalInfo.title")}
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  className="input-field"
                  type="text"
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  onChange={updateValues}
                  helperText={t("personalInfo.firstName")}
                  value={userData.firstName}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  className="input-field"
                  type="text"
                  name="lastName"
                  variant="outlined"
                  required
                  fullWidth
                  onChange={updateValues}
                  helperText={t("personalInfo.lastName")}
                  value={userData.lastName}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  className="input-field"
                  type="text"
                  name="email"
                  variant="outlined"
                  required
                  fullWidth
                  onChange={updateValues}
                  helperText={t("personalInfo.email")}
                  value={userData.email}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  className="input-field"
                  type="tel"
                  name="phoneNumber"
                  variant="outlined"
                  required
                  fullWidth
                  onChange={updateValues}
                  helperText={t("personalInfo.phoneNumber")}
                  value={userData.phoneNumber}
                />
              </Grid>

              <Grid item xs={12} sm={12}>
                <TextField
                  className="input-field"
                  name="addressLine1"
                  variant="outlined"
                  required
                  fullWidth
                  onChange={updateValues}
                  helperText={t("personalInfo.addressLine1")}
                  value={userData.addressLine1}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  className="input-field"
                  name="addressLine2"
                  variant="outlined"
                  required
                  fullWidth
                  onChange={updateValues}
                  helperText={t("personalInfo.addressLine2")}
                  value={userData.addressLine2}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  className="input-field"
                  name="country"
                  variant="outlined"
                  required
                  fullWidth
                  onChange={updateValues}
                  helperText={t("personalInfo.country")}
                  value={userData.country}
                />
              </Grid>

              <Grid item xs={4}>
                <TextField
                  className="input-field"
                  name="city"
                  variant="outlined"
                  required
                  fullWidth
                  onChange={updateValues}
                  helperText={t("personalInfo.city")}
                  value={userData.city}
                />
              </Grid>

              <Grid item xs={4}>
                <TextField
                  className="input-field"
                  name="postalCode"
                  variant="outlined"
                  required
                  fullWidth
                  onChange={updateValues}
                  helperText={t("personalInfo.postalCode")}
                  value={userData.postalCode}
                />
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={tryUpdate}
              >
                {t("personalInfo.changeInfoText")}
              </Button>
            </Grid>
          </form>
          <p>{creationText}</p>
        </div>
      </Container>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  update: (updatedFields) => dispatch(update(updatedFields)),
  set: (receivedFields) => dispatch(set(receivedFields)),
});
const mapStateToProps = (state) => ({
    getJwt: state.auth.jwt,
    getUserDetails: state.userDetails,
});
export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);

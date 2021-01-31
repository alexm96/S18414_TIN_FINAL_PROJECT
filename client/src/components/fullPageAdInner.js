import React from "react";
import Grid from "@material-ui/core/Grid";
import useStyles from "./generalStyles";
import { Typography } from "@material-ui/core";
import "../../src/i18n/i18n"
import {useTranslation} from "react-i18next";
const FullPageAdInner = (props) => {
    const {t}=useTranslation()
  const classes = useStyles();
  return (
    <div className={classes.paper}>

        <div className={classes.formBackground}>
            <div className={classes.innerForm} >
          <img
            src={`images/?id=${props.image.name}`}
            alt=""
            style={{ height: "300px", width: "300px" }}
          />
        </div>
        </div>
      <div className={classes.formBackground} id={"ad-info"}>
          <div className={classes.innerForm} >
              <Grid container>
                  <Grid item xs={12}>
                      <Typography variant={"h3"}>
                          {props.advertisement.title}
                      </Typography>
                  </Grid>
                  <Grid item xs={12}>
                      <Typography variant={"h6"}>
                          {t("adDetails.cost")} {props.advertisement.price} Zl
                      </Typography>
                  </Grid>
                  <Grid item xs={12}>
                      <Typography variant={"h7"}>
                          {props.advertisement.description}
                      </Typography>
                  </Grid>
                  <Grid item xs={12}>
                      <Typography variant={"h7"}>
                          {t("adDetails.location")} {props.advertisement.city} , {props.advertisement.postalCode}
                      </Typography>
                  </Grid>

                  <Grid item xs={12}>
                      <Typography variant={"h7"}>
                          {t("adDetails.Category")}{props.advertisement.category}
                      </Typography>
                  </Grid>
              </Grid>


          </div>
      </div>
      <div className={classes.formBackground} id={"personInfo"}>
          <div className={classes.innerForm} >
          <Typography variant={"h3"}>
              {t("adDetails.contactDetails")}
          </Typography>
              <Grid container>
                  <Grid item xs={12}>
                      <Typography variant={"h6"}>
                          {t("adDetails.soldBy")} {props.user.firstName} {props.user.lastName}
                      </Typography>
                  </Grid>
                  <Grid item xs={12}>
                      <Typography variant={"h6"}>{t("adDetails.email")} {props.user.email}</Typography>
                  </Grid>
                  <Grid item xs={12}>
                      <Typography variant={"h6"}>{t("adDetails.phoneNumber")}{props.user.phoneNumber}</Typography>
                  </Grid>

              </Grid>



      </div>
      </div>

    </div>
  );
};
export default FullPageAdInner;
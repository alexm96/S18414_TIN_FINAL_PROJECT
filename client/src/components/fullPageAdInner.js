import React from "react";
import Grid from "@material-ui/core/Grid";
import useStyles from "./generalStyles";
import { Typography } from "@material-ui/core";

const FullPageAdInner = (props) => {
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
                          Costs: {props.advertisement.price} Zl
                      </Typography>
                  </Grid>
                  <Grid item xs={12}>
                      <Typography variant={"h7"}>
                          {props.advertisement.description}
                      </Typography>
                  </Grid>
                  <Grid item xs={12}>
                      <Typography variant={"h7"}>
                          Located in : {props.advertisement.city} , {props.advertisement.postalCode}
                      </Typography>
                  </Grid>

                  <Grid item xs={12}>
                      <Typography variant={"h7"}>
                          Category: {props.advertisement.category}
                      </Typography>
                  </Grid>
              </Grid>


          </div>
      </div>
      <div className={classes.formBackground} id={"personInfo"}>
          <div className={classes.innerForm} >
          <Typography variant={"h3"}>
              Contact details
          </Typography>
              <Grid container>
                  <Grid item xs={12}>
                      <Typography variant={"h6"}>
                          Sold by : {props.user.firstName} {props.user.lastName}
                      </Typography>
                  </Grid>
                  <Grid item xs={12}>
                      <Typography variant={"h6"}>Email : {props.user.email}</Typography>
                  </Grid>
                  <Grid item xs={12}>
                      <Typography variant={"h6"}>Phone Number : {props.user.phoneNumber}</Typography>
                  </Grid>

              </Grid>



      </div>
      </div>

    </div>
  );
};
export default FullPageAdInner;
import useStyles from "./generalStyles";
import Typography from "@material-ui/core/Typography";
import {Container} from "@material-ui/core";
import SearchBar from "./searchBar";
import React from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

const adHolder=({history})=>{
    const classes = useStyles();
    return(
        <div className={classes.paper}>
            <Typography component="h1" variant="h5">
                Your results
            </Typography>
            <Container id={"ad-container"} >
                <SearchBar/>
            </Container>

            <Container id={"mini-container"}>
                <Grid container spacing={3} >

                </Grid>
            </Container>


        </div>

    )

};

export default (Home);
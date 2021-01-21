import React, {useState} from "react";
import {Container} from "@material-ui/core";
import SearchBar from "./searchBar";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import useStyles from "./generalStyles";
import Grid from "@material-ui/core/Grid";
import {connect} from "react-redux";
import AdHolder from "./adHolder";

const Home=({history})=>{
    const classes = useStyles();
    return(
        <div className={classes.paper}>
            <Typography component="h1" variant="h5">
                Find something cool!
            </Typography>
            <Container id={"search-container"} >

                <SearchBar/>
            </Container>

            <Container id={"mini-container"}>
               <AdHolder/>
            </Container>


        </div>

    )

};
const mapStateToProps=(state)=>({
    getJwt:state.auth.jwt
})
export default connect(mapStateToProps)(Home);




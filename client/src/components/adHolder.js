import useStyles from "./generalStyles";
import Typography from "@material-ui/core/Typography";
import {Container} from "@material-ui/core";
import SearchBar from "./searchBar";
import React, {useEffect} from "react";
import Grid from "@material-ui/core/Grid";
import {connect} from "react-redux";
import AdMini from "./adMini";


const AdHolder=({history,getMiniAds})=>{

    const classes = useStyles();
    return(
        <div>
        <div className={classes.paper}>
        <Typography component="h1" variant="h5">
            Your wildest dreams
        </Typography>
        </div>

        <div className={classes.paper}>


            <Container id={"ad-container"} >
                <SearchBar/>
            </Container>

            <Container id={"mini-container"}>

                <Grid container spacing={3}  >
                    {getMiniAds.map((miniAd,index)=>{
                        return <AdMini key={index} {...miniAd}></AdMini>
                    })}
                </Grid>
            </Container>


        </div>
        </div>
    )

};

const mapStateToProps=(state)=>({
    getMiniAds:state.search
})
export default connect(mapStateToProps)(AdHolder);
import React, {useState} from "react";
import {Container} from "@material-ui/core";
import SearchBar from "./searchBar";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import useStyles from "./generalStyles";
import Grid from "@material-ui/core/Grid";
import {connect} from "react-redux";
import AdHolder from "./adHolder";
import Button from "@material-ui/core/Button";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
const Home=({history,getMiniAds})=>{
    const classes = useStyles();
    const handleIncrement=(event)=>{
        event.preventDefault();
        const previousPage=paginationObject["pageNumber"]
        const newPaginationObject={...paginationObject,pageNumber:Math.min(previousPage+1,maxPages)}
        setPaginationObject(newPaginationObject)
    }
    const handleDecrement=(event)=>{
        const previousPage=paginationObject["pageNumber"]
        const newPaginationObject={...paginationObject,pageNumber:Math.max(previousPage-1,1)}
        setPaginationObject(newPaginationObject)
    }
    const setMaxPageSize=(maxPage)=>{
        setMaxPages(maxPage)
    }
    const [paginationObject,setPaginationObject]=useState({
        pageNumber:1,
        pageSize:5
    })
    const [maxPages,setMaxPages]=useState(100000)
    return (
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Find something cool!
        </Typography>
        <Container id={"search-container"}>
          <SearchBar paginationObject={paginationObject} updateMaxPageNumber={setMaxPageSize} />
        </Container>

        <Container id={"mini-container"}>
          <AdHolder />
        </Container>
          {getMiniAds.length>0 &&
          <div>

          <Button onClick={handleDecrement}><ArrowBackIcon/> </Button>
          <a>{paginationObject["pageNumber"]}</a>
          <Button onClick={handleIncrement}><ArrowForwardIcon/> </Button>
        </div>}
      </div>
    );

};
const mapStateToProps=(state)=>({
    getJwt:state.auth.jwt,
    getMiniAds:state.search
})
export default connect(mapStateToProps)(Home);




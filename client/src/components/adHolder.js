import useStyles from "./generalStyles";
import Typography from "@material-ui/core/Typography";
import {Container, TableBody} from "@material-ui/core";
import SearchBar from "./searchBar";
import React, {useEffect} from "react";
import Grid from "@material-ui/core/Grid";
import {connect} from "react-redux";
import AdMini from "./adMini";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";


const AdHolder=({history,getMiniAds,getJwt})=>{
    const style = {
        borderCollapse:"separate",
        borderSpacing:"1em"
    };
    const classes = useStyles();
    return(
        <div>
        <div className={classes.paper}>

        </div>

        <div className={classes.paper}>


            <Container id={"ad-container"} >
                <SearchBar/>
            </Container>

            <Container id={"mini-container"}>

                <Table style={style} className={classes.adTable}>
                    <TableBody>
                    {getMiniAds.map((miniAd,index)=>{
                        return <AdMini key={index} {...miniAd}></AdMini>
                    })}
                    </TableBody>
                </Table>
            </Container>


        </div>
        </div>
    )

};

const mapStateToProps=(state)=>({
    getMiniAds:state.search,
    getJwt:state.auth.jwt
})
export default connect(mapStateToProps)(AdHolder);
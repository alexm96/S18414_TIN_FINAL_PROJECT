import useStyles from "./generalStyles";

import {Container, TableBody} from "@material-ui/core";

import React, {useEffect} from "react";

import {connect} from "react-redux";
import AdMini from "./adMini";
import Table from "@material-ui/core/Table";
import axios from "axios";
import {set, setAds, update} from "../actions/userDetails";



const UserAdHolder=({history,getUserAds,getJwt,setAds})=>{
    const checkAdData=()=>{
        if(getUserAds===undefined){
            return []
        }
        else{
            return getUserAds
        }
    }
    useEffect(()=>{

        axios.get("/post/userPosts",{headers:{"jwt":getJwt}})
            .then(res => {
                setAds(res.data)
            }).catch((error)=>{
            setAds([])
            return error.response
        })
    },[])

    const style = {
        borderCollapse:"separate",
        borderSpacing:"1em"
    };
    const classes = useStyles();
    return(
        <div>
            <div className={classes.paper}>
                <Container id={"mini-container"}>
                    <Table style={style} className={classes.adTable}>
                        <TableBody>
                            {checkAdData().map((miniAd,index)=>{
                                return <AdMini key={index} shouldBeDeletable={true}{...miniAd}></AdMini>
                            })}
                        </TableBody>
                    </Table>
                </Container>


            </div>
        </div>
    )

};
const mapDispatchToProps = (dispatch) => ({
    setAds: (receivedAds) => dispatch(setAds(receivedAds)),
});
const mapStateToProps=(state)=>({
    getUserAds:state.userDetails.myAds,
    getJwt:state.auth.jwt
})

export default connect(mapStateToProps,mapDispatchToProps)(UserAdHolder);
import useStyles from "./generalStyles";

import {Container, TableBody} from "@material-ui/core";

import React, {useEffect, useState} from "react";

import {connect} from "react-redux";
import AdMini from "./adMini";
import Table from "@material-ui/core/Table";
import axios from "axios";
import {set, setAds, update} from "../actions/userDetails";



const AdminPage=({history,getJwt,})=>{
    const [adminAds,setAdminAds]=useState([])

    useEffect(()=>{
        axios.get("/post/adminPost",{headers:{"jwt":getJwt}})
            .then(res => {
                setAdminAds(res.data)
            }).catch((error)=>{
                console.log(error)
            setAdminAds([])
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
                            {adminAds.map((miniAd,index)=>{
                                return <AdMini key={index} shouldBeDeletable={true}{...miniAd}></AdMini>
                            })}
                        </TableBody>
                    </Table>
                </Container>


            </div>
        </div>
    )

};

const mapStateToProps=(state)=>({
    getJwt:state.auth.jwt
})

export default connect(mapStateToProps,undefined)(AdminPage);
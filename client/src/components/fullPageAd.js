import react, {useEffect, useState} from 'react'
import axios from "axios";
import React from "react";
import {useLocation} from "react-router-dom";

import useStyles from "./generalStyles"
import FullPageAdInner from "./fullPageAdInner";

const AdPage=(props)=>{
    const classes=useStyles()
    const [adDetails,setAdDetails]=useState({})
    const location = useLocation();
    useEffect(() => {
        console.log(location.state.adId); // result: 'some_value'
        axios.get(`post/specificAd/${location.state.adId}`).then((result)=>{
            setAdDetails(result.data)

        }).catch((error)=>{
            console.log(error)
        })

    },[location])
    return (
        <div className={classes.paper}>
            {!(!!adDetails["advertisement"]) ? <p>Loading</p>:
            <FullPageAdInner {...adDetails}/>
}
        </div>
        )
}
export default AdPage
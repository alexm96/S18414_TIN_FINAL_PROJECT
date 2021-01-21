import React from "react";


const Home=({history})=>{
    return(
        <div>Posts will be inserted here <button onClick={(event)=>{
            event.preventDefault()
            history.push("/createAd")
        }}></button></div>

    )

};

export default (Home);



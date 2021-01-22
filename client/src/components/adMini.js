import {TableBody, Typography} from "@material-ui/core";
import React, {useEffect, useState} from "react";

import makeStyles from "@material-ui/core/styles/makeStyles";

import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
        maxWidth: 500,
    },
    image: {
        width: 128,
        height: 128,
    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    },
    holder:{

        width:"100%"
    },
    innerData:{
        textAlign:"left",
        width:"33%"
    },
    mainRow:{
        padding:"100px",
        backgroundColor:"#f3f1f1",
        borderCollapse:"separate",
        borderSpacing:"1em"
    }
    ,
    tryall:{
        borderCollapse:"separate",
        borderSpacing:"1em"
    }
}));
const AdMini=(props)=>{



    const classes = useStyles();
    return (
        <TableRow className={classes.mainRow}  >
                <TableCell width={"100%"} className={classes.holder}>
                    <Table >
                        <TableBody>
                        <TableRow >
                        <TableCell className={classes.innerData}>
                            <img alt="ad image"src={`images/?id=${props.image.name}`} className={classes.image}></img>
                        </TableCell>
                        <TableCell className={classes.innerData}>
                        <Typography property={"h3"}>{props.title}</Typography>
                        </TableCell>
                        <TableCell className={classes.innerData}>
                            <Typography property={"p"}>{props.price}</Typography>
                        </TableCell>
                        </TableRow>
                        </TableBody>
                    </Table>
                    <Typography property={"p"}> {"Posted at :"+props.postedAt}</Typography>
                </TableCell>

        </TableRow>

    )
}
export default AdMini
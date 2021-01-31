import { TableBody, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import makeStyles from "@material-ui/core/styles/makeStyles";

import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { MergeType } from "@material-ui/icons";
import DeleteIcon from '@material-ui/icons/Delete';
import Button from "@material-ui/core/Button";
import {connect} from "react-redux";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: 500,
  },
  image: {
    width: 128,
    height: 128,
    cursor:"pointer"
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
  holder: {
    width: "100%",

    borderRadius: "10px",
  },
  innerData: {
    cursor:"pointer",
    textAlign: "left",
    width: "43%",
    borderRadius: "30px"
  },
  innerDataImage: {
    textAlign: "left",
    minWidth: "128px",
    borderRadius: "30px",
    padding:"0px"
  },

  mainRow: {
    padding: "100px",
    backgroundColor: "#f3f1f1",
    borderCollapse: "separate",
    borderSpacing: "1em",
    borderRadius: "10px",
  },
  price: {
    textAlign: "right",
  },
}));
const AdMini = ({getJwt,shouldBeDeletable,...props}) => {
  const history=useHistory()
  {
    /*Todo fix css here, make bottom time component on same horizontal level as image , change font (title), add currency (default zloty)*/
  }
  const classes = useStyles();
  const handleClick= async ()=>{
      history.push({pathname:"/ad",state:{adId:props.id}})
  }
  const attemptDelete = async () => {
    await axios
      .delete(`post/${props.id}`, { headers: { jwt:getJwt } })
      .then((result) => {
        alert(result.data["message"])
        history.push("/myAds")

      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <TableRow className={classes.mainRow}>
      <TableCell width={"100%"} className={classes.holder}>
        <Table>
          <TableBody>
            <TableRow className={classes.test}>
              <TableCell className={classes.innerDataImage}>
                <img
                  alt="ad image"
                  src={`images/?id=${props.image.name}`}
                  className={classes.image}
                  onClick={handleClick}
                ></img>
              </TableCell>
              <TableCell className={classes.innerData} onClick={handleClick}>
                <Typography property={"h3"}>{props.title}</Typography>

              </TableCell>
              <TableCell
                className={classes.innerData}
                align="center"
                style={{ verticalAlign: "top" }}
              >
                <div className={classes.price}>

                  <Typography property={"p"}>{props.price}</Typography>
                  { shouldBeDeletable && <Button onClick={attemptDelete}>
                    <DeleteIcon />
                  </Button>}
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <Typography property={"p"}>
          {" "}
          {"Posted at :" + new Date(props.postedAt).toLocaleDateString()}
        </Typography>
      </TableCell>
    </TableRow>
  );
};
const mapStateToProps=(state)=>({
  getJwt:state.auth.jwt
})

export default connect(mapStateToProps)(AdMini);
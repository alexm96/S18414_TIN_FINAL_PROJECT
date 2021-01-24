import { TableBody, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";

import makeStyles from "@material-ui/core/styles/makeStyles";

import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { MergeType } from "@material-ui/icons";

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
const AdMini = (props) => {
  {/*Todo fix css here, make bottom time component on same horizontal level as image , change font (title), add currency (default zloty)*/}
  const classes = useStyles();
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
                ></img>
              </TableCell>
              <TableCell className={classes.innerData}>
                <Typography property={"h3"}>{props.title}</Typography>
                <Typography>Some info here </Typography>
              </TableCell>
              <TableCell
                className={classes.innerData}
                align="center"
                style={{ verticalAlign: "top" }}
              >
                <div className={classes.price}>
                  <Typography property={"p"}>{props.price}</Typography>
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
export default AdMini
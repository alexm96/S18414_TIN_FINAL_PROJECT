import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import StorefrontIcon from "@material-ui/icons/Storefront";

import SendIcon from "@material-ui/icons/Send";
import PersonIcon from "@material-ui/icons/Person";

import { logout } from "../actions/auth";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import Badge from "@material-ui/core/Badge";

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
  },
})((props) => (
  <Menu
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

const ProfileMenu = ({ history, logoutDispatch }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        style={{ "boxShadow": "none" }}
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="contained"
        color="primary"
        onClick={handleClick}
      >
          {/*todo add badge here linked to message amount (also implement ad messaging)*/}
          <PersonIcon /> My profile

      </Button>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <StyledMenuItem
          onClick={(event) => {
            history.push("/profile");
            handleClose();
          }}
        >
          <ListItemIcon>
            <PersonIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="My information" />
        </StyledMenuItem>
        <StyledMenuItem
          onClick={(event) => {
            console.log("unimplemented");
            handleClose();
          }}
        >
          <ListItemIcon>
            <StorefrontIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="My ads" />
        </StyledMenuItem>
        <StyledMenuItem
          onClick={(event) => {
            logoutDispatch();
            handleClose();
          }}
        >
          <ListItemIcon>
            <ExitToAppIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </StyledMenuItem>
      </StyledMenu>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  logoutDispatch: () => dispatch(logout()),
});
export default withRouter(connect(undefined, mapDispatchToProps)(ProfileMenu));
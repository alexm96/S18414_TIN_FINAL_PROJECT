import { connect } from "react-redux";

import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import useStyles from "./generalStyles";
import AddLocationOutlinedIcon from '@material-ui/icons/AddLocationOutlined';
import { getSearchItems, search } from "../actions/search";
import { InputAdornment } from "@material-ui/core";

import SearchIcon from "@material-ui/icons/Search";

const SearchBar = ({ searchDispatch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchCity, setSearchCity] = useState("");
  const [canSubmit, setCanSubmit] = useState(false);
  const classes = useStyles();
  useEffect(() => {
    setCanSubmit(!!searchTerm && searchTerm.length >= 4)
  }, [searchTerm]);

  const searchForAdverts = async (event) => {
    event.preventDefault();
    const searchFields = {
      term: searchTerm,
      city: searchCity,
    };

    const results = await getSearchItems(searchFields);
    if (results.status === 200) {
      searchDispatch(results.data);
    } else {
      console.log(results.message);
    }
  };
  return (
    <div>
      <form className={classes.form}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              className="input-field"
              type="text"
              name="search-term"
              placeholder="Enter a search term"
              variant="outlined"
              required
              fullWidth
              helperText={"Search for something cool!"}
              onChange={(event) => {
                event.preventDefault();
                setSearchTerm(event.target.value);
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon className={classes.icons} style={{fill:"grey"}}/>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={6} sm={3}>
            <TextField
              className="input-field"
              type="text"
              name="area"
              placeholder="Your city here "
              variant="outlined"
              fullWidth
              helperText={"Which city are you looking in ?"}
              onChange={(event) => {
                event.preventDefault();
                setSearchCity(event.target.value);
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AddLocationOutlinedIcon className={classes.icons} style={{fill:"grey"}}/>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={6} sm={3}>
            <Button
              type="submit"
              fullWidth
              style={{ height: "70%" }}
              variant="contained"
              color="primary"
              disabled={!canSubmit}
              onClick={searchForAdverts}
            >
              {canSubmit ? "Search" : "Enter more than 4 letters"}
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  searchDispatch: (searchResults) => dispatch(search(searchResults)),
});
const mapStateToProps = (state) => ({
  getMiniAds: state.search,
});
export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);

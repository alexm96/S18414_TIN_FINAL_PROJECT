import { connect } from "react-redux";

import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import useStyles from "./generalStyles";
import AddLocationOutlinedIcon from '@material-ui/icons/AddLocationOutlined';
import { getSearchItems, search } from "../actions/search";
import { InputAdornment } from "@material-ui/core";
import "../../src/i18n/i18n"
import { useTranslation } from 'react-i18next';
import SearchIcon from "@material-ui/icons/Search";

const SearchBar = ({ searchDispatch,pageNumber,pageSize ,updateMaxPageNumber,updateNumberOfResults}) => {
  const {t}=useTranslation()
  const [searchTerm, setSearchTerm] = useState("");
  const [searchCity, setSearchCity] = useState("");
  const [canSubmit, setCanSubmit] = useState(false);
  const classes = useStyles();
  useEffect(() => {
    setCanSubmit(!!searchTerm && searchTerm.length >= 4)
  }, [searchTerm]);
  useEffect(()=>{
    if(!!pageNumber&&!!pageSize){
      searchForAdverts().then(()=>{
        console.log("ok")
      })
    }
  },[pageNumber,pageSize])
  const searchForAdverts = async (event) => {
    if(event){event.preventDefault();}
    const searchFields = {
      term: searchTerm,
      city: searchCity,
    };

    const results = await getSearchItems(searchFields,pageNumber,pageSize);
    if (results.status === 200) {
      searchDispatch(results.data["adverts"]);
      console.log(Math.round(results.data["maxPage"]/pageSize)+.499999)
      updateMaxPageNumber(Math.round(results.data["maxPage"]/pageSize+.499999))
      updateNumberOfResults(results.data["maxPage"])

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
              placeholder={t("termPlaceholder")}
              variant="outlined"
              required
              fullWidth
              helperText={t("termHelpText")}
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
              placeholder={t("cityPlaceholder")}
              variant="outlined"
              fullWidth
              helperText={t("cityHelpText")}
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
              {canSubmit ? t("search") : t("searchBlock")}
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

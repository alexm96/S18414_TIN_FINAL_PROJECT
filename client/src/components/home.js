import React, { useState } from "react";
import { Container } from "@material-ui/core";
import SearchBar from "./searchBar";
import Typography from "@material-ui/core/Typography";
import "../../src/i18n/i18n"
import { useTranslation } from 'react-i18next';
import useStyles from "./generalStyles";

import { connect } from "react-redux";
import AdHolder from "./adHolder";
import Button from "@material-ui/core/Button";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";

const Home = ({ history, getMiniAds }) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const handleIncrement = (event) => {
    event.preventDefault();
    const previousPage = pageNumber;
    setPageNumber(Math.min(previousPage + 1, maxPages));
  };
  const handleDecrement = (event) => {
    const previousPage = pageNumber;
    setPageNumber(Math.max(previousPage - 1, 1));
  };
  const setMaxPageSize = (maxPage) => {
    setMaxPages(maxPage);
  };
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [maxPages, setMaxPages] = useState(100000);
  const [numberOfResults, setNumberOfResults] = useState(-1);
  return (
    <div className={classes.paper}>
      <Typography component="h1" variant="h5">
        {t('welcome')}
      </Typography>
      <Container id={"search-container"}>
        <SearchBar
          pageNumber={pageNumber}
          pageSize={pageSize}
          updateMaxPageNumber={setMaxPageSize}
          updateNumberOfResults={setNumberOfResults}
        />
      </Container>

      {numberOfResults >= 0 && getMiniAds.length > 0 && (
        <Typography variant={"h5"} className={classes["search-results"]}>
          {" "}
          {t("searchResults",{results:numberOfResults})}

        </Typography>
      )}
      <Container id={"mini-container"}>
        <AdHolder />
      </Container>
      {getMiniAds.length > 0 && (
        <div>
          <Button onClick={handleDecrement}>
            <ArrowBackIcon />{" "}
          </Button>
          <a>{pageNumber}</a>
          <Button onClick={handleIncrement}>
            <ArrowForwardIcon />{" "}
          </Button>
        </div>
      )}
    </div>
  );
};
const mapStateToProps = (state) => ({
  getJwt: state.auth.jwt,
  getMiniAds: state.search,
});
export default connect(mapStateToProps)(Home);




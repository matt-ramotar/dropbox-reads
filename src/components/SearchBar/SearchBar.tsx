import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Grid, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import fetchSearchResults from "../../lib/fetchSearchResults";
import { setQuery as setQueryRedux } from "../../store/search";
import { hideView, showView } from "../../store/views";
import { GodBook } from "../../types/GodBook";
import { SearchResultsPopover } from "../../util/views";
import styles from "./SearchBar.module.scss";

export default function SearchBar(): JSX.Element {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState<GodBook[] | null>(null);

  const dispatch = useDispatch();

  const fetchSearchResultsAsync = async () => {
    const response = await fetchSearchResults(query);
    console.log(response);
    setSearchResults(response);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    dispatch(showView(SearchResultsPopover));
    if (e.key === "Enter") fetchSearchResultsAsync();
  };

  const onBlur = () => {
    dispatch(hideView(SearchResultsPopover));
  };

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setQuery(e.target.value);

  useEffect(() => {
    dispatch(setQueryRedux(query));
  }, [query]);

  return (
    <Grid container className={styles.root}>
      <Grid className={styles.search_grid}>
        <FontAwesomeIcon icon={faSearch} size="lg" className={styles.icon} />
        <TextField
          id="search-bar"
          placeholder="Search Dropbox Reads"
          fullWidth
          InputProps={{ disableUnderline: true, className: styles.input }}
          onKeyDown={onKeyDown}
          onChange={onChange}
          onBlur={onBlur}
          className={styles.search}
        />
      </Grid>
    </Grid>
  );
}

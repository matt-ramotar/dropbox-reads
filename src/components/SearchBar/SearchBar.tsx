import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Grid, TextField } from "@material-ui/core";
import React, { useState } from "react";
import fetchSearchResults from "../../lib/fetchSearchResults";
import { GodBook } from "../../types/GodBook";
import styles from "./SearchBar.module.scss";

export default function SearchBar(): JSX.Element {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState<GodBook[] | null>(null);

  const fetchSearchResultsAsync = async () => {
    const response = await fetchSearchResults(query);
    console.log(response);
    setSearchResults(response);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") fetchSearchResultsAsync();
  };

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setQuery(e.target.value);

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
          className={styles.search}
        />
      </Grid>
    </Grid>
  );
}

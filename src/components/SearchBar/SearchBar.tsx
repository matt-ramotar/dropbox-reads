import React, { useState, useEffect } from "react";
import { InputBase } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import { useMemo } from "react";
import { fetchByTags } from "../../lib";
import _ from "lodash";
import styles from "./SearchBar.module.scss";

interface Props {
  handleSearch: (books: any) => void;
}

export default function SearchBar(props: Props): JSX.Element {
  const [query, setQuery] = useState("");

  const changeHandler = (e: React.ChangeEvent<any>) => {
    setQuery(e.target.value);
  };
  const debouncedChangeHandler = useMemo(() => _.debounce(changeHandler, 600), []);

  useEffect(() => {
    let response;
    try {
      response = fetchByTags(query);
      response.then((data) => {
        props.handleSearch(data);
      });
    } catch (err) {
      console.log(err);
    }
  }, [query]);
  return (
    <InputBase
      placeholder="Search recommendations…"
      inputProps={{ "aria-label": "search" }}
      onChange={debouncedChangeHandler}
      className={styles.cta}
    />
  );
}

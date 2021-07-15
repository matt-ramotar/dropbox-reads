import React, { useState, useEffect } from "react";
import { Toolbar, AppBar, InputBase, IconButton } from "@material-ui/core";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import logo from "../../images/logo.png";
import { fetchByTags } from "../../lib";
import _ from "lodash";

export default function SearchBar(): JSX.Element {
  const [data, setData] = useState({});
  const [query, setQuery] = useState("");

  // todo: use debouncer
  const changeHandler = (e: React.ChangeEvent<any>) => {
    setQuery(e.target.value);
  };
  const debouncedChangeHandler = useMemo(() => _.debounce(changeHandler, 600), []);

  useEffect(() => {
    let response;
    try {
      if (query) {
        response = fetchByTags(query);
        console.log(response);
        setData(response);
      }
    } catch (err) {
      console.log(err);
    }
  }, [query]);
  return (
    <>
      <Toolbar>
        <InputBase
          placeholder="Search recommendations…"
          inputProps={{ "aria-label": "search" }}
          onChange={debouncedChangeHandler}
        />
      </Toolbar>
    </>
  );
}

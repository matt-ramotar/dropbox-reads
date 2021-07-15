import React, { useState, useEffect } from "react";
import { Toolbar, AppBar, InputBase, IconButton } from "@material-ui/core";
import { Link } from "react-router-dom";
import logo from "../../images/logo.png";
import { fetchByTags } from "../../lib";


export default function SearchBar(): JSX.Element {
  const [data, setData] = useState({})
  const [query, setQuery] = useState('')

  // todo: use debouncer
  useEffect(() => {
    let response
    try {
      response = fetchByTags(query)
      console.log(response)
      setData(response)
    } catch (err) {
      console.log(err)
    }
  }, [query])
  return (
    <>
      <Toolbar>
        <InputBase
          placeholder="Search recommendations…"
          inputProps={{ 'aria-label': 'search' }}
          onChange={(e) => setQuery(e.target.value)}
        />
      </Toolbar>
    </>
  );
}

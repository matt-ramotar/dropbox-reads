import { FormControl, Input, InputLabel, Button, FormHelperText } from "@material-ui/core";
import { useState, FormEvent, ChangeEvent } from "react";

import { clearGoogleData, fetchBooksFromGoogle, setBook, setFetchStatusToIdle } from "../../store/addBook";
import { useAppDispatch, useAppSelector } from "../../util/hooks";
import styles from "./AddBookForm.module.scss";

interface FormState {
  title: string;
  author: string;
  description: string;
  tags: string[];
}

export default function AddBookForm(): JSX.Element {
  const dispatch = useAppDispatch();
  const fetchStatus = useAppSelector((state) => state.bookForm.fetchStatus);
  const [formState, setFormState] = useState<FormState>({
    title: "",
    author: "",
    description: "",
    tags: [],
  });

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setFormState({
      ...formState,
      [e.target.name]: e.target.name === "tags" ? [...formState.tags, e.target.value] : e.target.value,
    });
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    // Send to store
    dispatch(setBook(formState));
    dispatch(
      fetchBooksFromGoogle({
        title: formState.title,
        author: formState.author,
      })
    );

    // Reset form fields
    setFormState({
      title: "",
      author: "",
      description: "",
      tags: [],
    });
  }

  function handleNewSearchClick() {
    // reset fetchStatus
    dispatch(setFetchStatusToIdle());

    // Clear books that are showing and the data saved in the store
    dispatch(clearGoogleData());
  }

  if (fetchStatus === "fulfilled") {
    return (
      <div className={styles.recommendationDiv}>
        <Button variant="contained" color="primary" onClick={handleNewSearchClick}>
          New Search
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.titleDiv}>
        <FormControl>
          <InputLabel htmlFor="title">What&apos;s the title?</InputLabel>
          <Input required id="title" name="title" value={formState.title} onChange={handleChange} />
          <FormHelperText>REQUIRED</FormHelperText>
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="author">Who wrote it?</InputLabel>
          <Input id="author" name="author" value={formState.author} onChange={handleChange} />
        </FormControl>
      </div>
      <div className={styles.recommendationDiv}>
        <Button variant="contained" color="primary" type="submit" fullWidth>
          Search
        </Button>
      </div>
    </form>
  );
}

import { FormControl, Input, InputLabel, TextField, Button } from "@material-ui/core";
import { useState, FormEvent, ChangeEvent } from "react";

import { fetchBooksFromGoogle, setBook } from "../../store/slices/addBook";
import { useAppDispatch } from "../../util/hooks";
import styles from "./AddBookForm.module.scss";

interface FormState {
  title: string;
  author: string;
  description: string;
  tags: string[];
}

export default function AddBookForm(): JSX.Element {
  const dispatch = useAppDispatch();
  const [formState, setFormState] = useState<FormState>({
    title: "",
    author: "",
    description: "",
    tags: [],
  });

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setFormState({
      ...formState,
      [e.target.name]:
        e.target.name === "tags" ? [...formState.tags, e.target.value] : e.target.value,
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
  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.titleDiv}>
        <FormControl>
          <InputLabel htmlFor="title">What&apos;s the title?</InputLabel>
          <Input required id="title" name="title" value={formState.title} onChange={handleChange} />
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="author">Who wrote it?</InputLabel>
          <Input
            required
            id="author"
            name="author"
            value={formState.author}
            onChange={handleChange}
          />
        </FormControl>
      </div>
      <div className={styles.recommendationDiv}>
        <TextField
          multiline
          required
          fullWidth
          id="description"
          name="description"
          label="Why do you recommend this book?"
          variant="outlined"
          rows={4}
          value={formState.description}
          onChange={handleChange}
        />
        {/* <FormControl>
        <FormLabel>Tags</FormLabel>
        <FormGroup id="tags">
        {TAGS.sort().map((tag) => (
            <FormControlLabel
            key={tag}
            label={tag}
            control={
                <Checkbox
                name="tags"
                value={tag}
                checked={formState.tags.includes(tag)}
                onChange={handleChange}
                />
            }
            />
            ))}
            </FormGroup>
        </FormControl> */}
        <Button variant="contained" color="primary" type="submit" fullWidth>
          Search
        </Button>
      </div>
    </form>
  );
}

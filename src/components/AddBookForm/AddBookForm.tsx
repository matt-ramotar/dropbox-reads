import { FormGroup, FormControl, Input, InputLabel, TextField, Button } from "@material-ui/core"
import styles from "./AddBookForm.module.scss"

export default function AddBookForm(): JSX.Element {
    return (
        <FormGroup className={styles.form}>
            <FormControl>
                <InputLabel htmlFor="input-book-title">What&apos;s the title?</InputLabel>
                <Input id="input-book-title" required />
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="input-book-author">Who wrote it?</InputLabel>
                <Input id="input-book-author" required />
            </FormControl>
            <FormControl>
                <TextField
                    select
                    label="Tags"
                    variant="outlined"
                />
            </FormControl>
            <FormControl>
                <TextField
                    multiline
                    required
                    label="Why do you recommend this book?"
                    variant="outlined"
                />
            </FormControl>
            <Button variant="contained" color="primary" type="submit">Add your recommendation</Button>
        </FormGroup>
    )
}
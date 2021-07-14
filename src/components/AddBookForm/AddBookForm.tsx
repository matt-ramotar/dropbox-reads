import { FormGroup, FormControl, Input, InputLabel, TextField, Button, FormLabel, FormControlLabel, Checkbox } from "@material-ui/core"
import { useState, FormEvent, ChangeEvent } from "react"

import { fetchBookFromGoogle, setBook } from '../../store/slices/form'
import { useAppDispatch } from '../../util/hooks'
import TAGS from "../../util/tags"
import styles from "./AddBookForm.module.scss"

interface FormState {
    title: string,
    author: string,
    description: string,
    tags: string[]
}

export default function AddBookForm(): JSX.Element {
    const dispatch = useAppDispatch()
    const [formState, setFormState] = useState<FormState>({
        title: "",
        author: "",
        description: "",
        tags: [],
    })

    function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setFormState({
            ...formState,
            [e.target.name]: e.target.name === "tags" ? [...formState.tags, e.target.value] : e.target.value
        })
    }

    function handleSubmit(e: FormEvent) {
        e.preventDefault();

        // Send to store
        dispatch(setBook(formState))
        dispatch(fetchBookFromGoogle({
            title: formState.title,
            author: formState.author
        }))

        // Reset form fields
        setFormState({
            title: "",
            author: "",
            description: "",
            tags: [],
        })
    }
    return (
        <form onSubmit={handleSubmit}>
            <FormGroup className={styles.form}>
                <FormControl>
                    <InputLabel htmlFor="title">What&apos;s the title?</InputLabel>
                    <Input
                        required
                        id="title"
                        name="title"
                        value={formState.title}
                        onChange={handleChange}
                    />
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
                <FormControl>
                    <TextField
                        multiline
                        required
                        id="description"
                        name="description"
                        label="Why do you recommend this book?"
                        variant="outlined"
                        value={formState.description}
                        onChange={handleChange}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>Tags</FormLabel>
                    <FormGroup id="tags" >
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
                </FormControl>
                <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                >
                    Add your recommendation
                </Button>
            </FormGroup>
        </form>
    )
}
import { Grid, Typography } from "@material-ui/core";
import SafeUser from "../../types/SafeUser";
import styles from "./AddBook.module.scss";
import AddBookForm from "../../components/AddBookForm";

export default function AddBook({ user }: { user: SafeUser }): JSX.Element {
    return (
        <Grid className={styles.grid} >
            <Typography>{`Hey, ${user.firstName} ${user.lastName}!`}</Typography>
            <Typography>What book would you like to recommend?</Typography>
            <AddBookForm />
        </Grid>
    );
}

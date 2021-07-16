import { GodBook } from '../../types/GodBook';
import SafeUser from "../../types/SafeUser";
import { Grid, Box, Chip } from "@material-ui/core";
import styles from "./BookTagChip.module.scss";
import { Link } from 'react-router-dom';

interface Props {
    user: SafeUser;
    book: GodBook;
}

export default function BookTagChip(props: Props) : JSX.Element {
    return (
        <Box className={styles.container}>
            {props.book.bookTags?.map((gbTag) => {
                if (!gbTag || !gbTag.tag) {
                    return null;
                }
                return (
                    <Grid key={gbTag.id}>
                        <Chip
                            label={gbTag.tag.tag}
                            className={styles.chip}
                            clickable={true}
                            component={Link}
                            to={`/tags/${gbTag.tag.tag}`}
                            size="small"
                            variant="outlined"
                        />
                    </Grid>
                );
            })}
        </Box>
    )
}
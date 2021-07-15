import { GodTag } from "../../types/GodTag";
import { useLocation } from "react-router";
import { useState, Fragment } from "react";
import styles from "./tagDetail.module.scss";
import { Grid, Typography, Box } from "@material-ui/core";
import { useEffect } from "react";
import { fetchGodTag } from "../../lib";
import BookCard from "../../components/BookCard";
import SafeUser from "../../types/SafeUser";
import { GodBook } from "../../types/GodBook";

interface Props {
    user: SafeUser;
    books: GodBook[];
}

export default function TagDetail(props: Props): JSX.Element {
    const location = useLocation();
    const tagname = location.pathname.split("/")[2];

    // Fetch the god tag object
    const [isLoading, setIsLoading] = useState(true);
    const [godTag, setGodTag] = useState<GodTag | null>(null);

    useEffect(() => {
        fetchGodTagAsync(tagname);

        async function fetchGodTagAsync(tagname: string) {
            try {
                const response = await fetchGodTag(tagname);
                setGodTag(response);
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        }
    }, [tagname, setGodTag]);

    if (isLoading) {
        return (
          <Grid className={styles.grid}>
            <Typography>Loading...</Typography>
          </Grid>
        );
      }
    
      if (!godTag) {
        return (
          <Grid className={styles.root}>
            <Typography>{`Tag ${tagname} does not exist`}</Typography>
          </Grid>
        );
      }

    return (
        <Fragment>
            <Grid className={styles.root}>
                <Box className={styles.cta}>
                    <Typography variant="h6" className={styles.heading}>{`Books tagged with "${tagname}"`}</Typography>
                </Box>
            </Grid>
            <Grid className={styles.root}>
                <Box className={styles.main}>
                    {godTag.books?.map((book) => <BookCard key={book.id} user={props.user} book={book}/>)}
                </Box>
            </Grid>
        </Fragment>
    );
}
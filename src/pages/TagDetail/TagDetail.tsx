import { GodTag } from "../../types/GodTag";
import { useLocation } from "react-router";
import { useState } from "react";
import styles from "./tagDetail.module.scss";
import { Grid, Typography } from "@material-ui/core";
import { useEffect } from "react";
import { fetchGodTag } from "../../lib";


export default function TagDetail(): JSX.Element {
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
          <Grid className={styles.grid}>
            <Typography>{`Tag ${tagname} does not exist`}</Typography>
          </Grid>
        );
      }

      const bookList = godTag.books?.map((book) =>
          <li key={book.id}>{book.title}</li>
      );


    return (
        <Grid className={styles.grid}>
            <Typography>Tag Detail</Typography>
            <Typography>{`Tag: ${godTag.tag}`}</Typography>
            <Typography>Book List:</Typography>
            <ul>{bookList}</ul>
        </Grid>
    );
}
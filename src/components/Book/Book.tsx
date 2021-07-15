import { Button } from "@material-ui/core";
import { convertToHTTPS, extractYearFromDate } from "../../helpers";
import { sendBookToDB } from "../../store/slices/addBook";
import { GoogleBookData } from "../../types/GoogleBookData";
import SafeUser from "../../types/SafeUser";
import { useAppDispatch } from "../../util/hooks";
import styles from "./Book.module.scss";

export default function Book({ bookData, user }: { bookData: GoogleBookData; user: SafeUser }): JSX.Element {
  const dispatch = useAppDispatch();
  const { volumeInfo } = bookData;

  return (
    <div className={styles.book}>
      <div className={styles.imgContainer}>
        <img className={styles.coverImg} src={convertToHTTPS(volumeInfo.imageLinks.thumbnail)} alt={`Book Cover of ${volumeInfo.title}`} />
      </div>

      <div className={styles.infoDiv}>
        <div className={styles.bookDetails}>
          <p className={styles.title}>{volumeInfo.title}</p>
          <p className={styles.author}>{volumeInfo.authors.join(", ")}</p>
          <p className={styles.date}>{extractYearFromDate(volumeInfo.publishedDate)}</p>
        </div>
        <div className={styles.btnContainer}>
          <Button
            variant="contained"
            color="secondary"
            href={convertToHTTPS(volumeInfo.previewLink)}
            target="_blank"
            rel="noopener noreferrer"
          >
            More Info
          </Button>
          <Button color="primary" variant="contained" onClick={() => dispatch(sendBookToDB({ user, book: bookData }))}>
            Recommend
          </Button>
        </div>
      </div>
    </div>
  );
}

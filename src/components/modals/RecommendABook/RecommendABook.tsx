import { faAngleLeft, faAngleRight, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Button, Grid, Modal, Typography } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import getNextQuestion from "../../../helpers/getNextScene";
import getNumBookRecScenesCompleted from "../../../helpers/getNumBookRecScenesCompleted";
import getPrevQuestion from "../../../helpers/getPrevScene";
import handleRecommendABook from "../../../lib/handleRecommendABook";
import { RootState } from "../../../store";
import { setBookshelfBook } from "../../../store/bookRec";
import { hideView, setCurrentScene } from "../../../store/views";
import SafeUser from "../../../types/SafeUser";
import { RecommendABookModal } from "../../../util/views";
import AuthorScene from "./AuthorScene";
import BookScene from "./BookScene";
import ProgressBar from "./ProgressBar";
import ReasonScene from "./ReasonScene";
import styles from "./RecommendABook.module.scss";
import SuccessScene from "./SuccessScene";
import TitleScene from "./TitleScene";

interface Props {
  user: SafeUser;
}

export default function RecommendABook(props: Props): JSX.Element {
  const dispatch = useDispatch();

  const isOpen = useSelector((state: RootState) => state.views.RecommendABookModal);
  const currentScene = useSelector((state: RootState) => state.views.currentScene);
  const bookRec = useSelector((state: RootState) => state.bookRec);
  const totalScenes = 4;

  const numScenesCompleted = getNumBookRecScenesCompleted(bookRec);

  const nextIsDisabled = () => currentScene === 4;
  const prevIsDisabled = () => currentScene === 1;

  const handleClose = () => {
    dispatch(hideView(RecommendABookModal));
  };

  const handleNext = () => {
    dispatch(setCurrentScene(getNextQuestion(currentScene, totalScenes)));
  };

  const handlePrev = () => {
    dispatch(setCurrentScene(getPrevQuestion(currentScene)));
  };

  const renderSwitch = () => {
    switch (currentScene) {
      case 0:
        return null;
      case 1:
        return <TitleScene />;
      case 2:
        return <AuthorScene />;
      case 3:
        return <BookScene />;
      case 4:
        return <ReasonScene />;
      case 5:
        return <SuccessScene />;
    }
  };

  const handleSubmit = () => {
    async function handleRecommendABookAsync() {
      const bookshelfBook = await handleRecommendABook(bookRec.book!, bookRec.reason!, props.user.id);
      dispatch(setCurrentScene(5));
      dispatch(setBookshelfBook(bookshelfBook));
    }

    if (bookRec.book && bookRec.reason) handleRecommendABookAsync();
  };

  return (
    <Modal open={isOpen} onClose={handleClose} className={styles.modal}>
      <Box className={styles.root__modal}>
        <Grid
          container
          direction={currentScene < 5 ? "row" : "column"}
          justify={currentScene < 5 ? "flex-start" : "center"}
          alignItems={currentScene < 5 ? "flex-start" : "center"}
          className={styles.main__grid}
        >
          {currentScene < 5 ? (
            <Box className={styles["main__box--label"]}>
              <Typography variant="h6">{currentScene}</Typography>
              <FontAwesomeIcon icon={faArrowRight} />
            </Box>
          ) : null}

          {renderSwitch()}
        </Grid>

        {numScenesCompleted === 3 && currentScene !== 5 ? (
          <Grid className={styles.submit__grid} container direction="row" justify="flex-start" alignItems="center">
            <Button className={styles.submit__button} variant="contained" size="large" onClick={handleSubmit}>
              Submit
            </Button>
          </Grid>
        ) : null}

        {currentScene < 5 ? (
          <Grid className={styles.controls__grid} container direction="row" justify="flex-end" alignItems="flex-end">
            <ProgressBar numScenesCompleted={numScenesCompleted} />

            <Box className={styles.controls__buttons}>
              <Button disabled={prevIsDisabled()} onClick={handlePrev} className={styles["controls__button--left"]}>
                <FontAwesomeIcon icon={faAngleLeft} size="2x" className={styles["controls__icon--left"]} />
              </Button>

              <Button disabled={nextIsDisabled()} onClick={handleNext} className={styles["controls__button--right"]}>
                <FontAwesomeIcon icon={faAngleRight} size="2x" className={styles["controls__icon--right"]} />
              </Button>
            </Box>
          </Grid>
        ) : null}
      </Box>
    </Modal>
  );
}

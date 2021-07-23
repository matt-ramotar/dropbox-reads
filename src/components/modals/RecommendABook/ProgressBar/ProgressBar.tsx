import { Box, Typography } from "@material-ui/core";
import styles from "./ProgressBar.module.scss";

interface Props {
  numScenesCompleted: number;
}

export default function ProgressBar(props: Props): JSX.Element {
  const getProgress = (): string => `${Math.floor(100 * (props.numScenesCompleted / 3))}%`;

  return (
    <Box className={styles.root}>
      <Typography className={styles.heading} variant="body1">{`${getProgress()} completed`}</Typography>
      <Box className={styles.progressBar}>
        <Box className={styles.progress} style={{ width: getProgress() }}></Box>
      </Box>
    </Box>
  );
}

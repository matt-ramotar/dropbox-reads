import loadable from "@loadable/component";
import { Box, Grid } from "@material-ui/core";
import styles from "./Splash.module.scss";

interface Props {
  pageName: string;
}

export default function Splash(props: Props): JSX.Element {
  const Page = loadable(() => import(`../../pages/${props.pageName}`));

  return (
    <Grid className={styles.root}>
      <Box className={styles.container}>
        <Box className={styles.main}>
          <Page />
        </Box>
      </Box>
    </Grid>
  );
}

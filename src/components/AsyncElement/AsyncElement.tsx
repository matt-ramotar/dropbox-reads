import loadable from "@loadable/component";
import { Grid } from "@material-ui/core";
import AsyncElementProps from "../../types/AsyncElementProps";

export default function AsyncElement({
  componentName,
  layoutName,
  direction,
  ...props
}: AsyncElementProps): JSX.Element {
  const Page = loadable(() => import(`../../pages/${componentName}`));
  const Layout = loadable(() => import(`../../layouts/${layoutName}`));

  return (
    <Grid
      container
      direction={direction}
      {...props}
      style={{ width: "100vw", flexWrap: "nowrap" }}
    >
      <Layout />
      <Page />
    </Grid>
  );
}

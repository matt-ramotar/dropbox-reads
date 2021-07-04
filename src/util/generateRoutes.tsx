import { Grid } from "@material-ui/core";
import { Outlet, PartialRouteObject } from "react-router";
import AsyncElement from "../components/AsyncElement";
import Route from "../types/Route";

const generateRoutes = (routes: Route[]): PartialRouteObject[] => {
  return routes.map(
    ({ path, componentName, direction, isOutlet, layoutName, children }) =>
      isOutlet
        ? {
            element: (
              <Grid container direction="row">
                <Outlet />
              </Grid>
            ),
            children: children && generateRoutes(children),
            path,
          }
        : {
            element: (
              <AsyncElement
                componentName={componentName}
                layoutName={layoutName}
                direction={direction}
              />
            ),
            children: children && generateRoutes(children),
            path,
          }
  );
};

export default generateRoutes;

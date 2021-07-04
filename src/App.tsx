import { StylesProvider, ThemeProvider } from "@material-ui/core/styles";
import { Navigate, useRoutes } from "react-router";
import routes from "./routes";
import "./sass/App.scss";
import theme from "./theme";
import generateRoutes from "./util/generateRoutes";

function App(): JSX.Element | null {
  const routing = useRoutes([
    ...generateRoutes(routes),
    {
      path: "*",
      element: <Navigate to="/" />,
    },
  ]);

  return (
    <ThemeProvider theme={theme}>
      <StylesProvider injectFirst>{routing}</StylesProvider>
    </ThemeProvider>
  );
}

export default App;

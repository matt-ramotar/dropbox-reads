import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    type: "light",
    background: {
      default: "#ffffff",
      paper: "#ebe6ff",
    },
    primary: {
      main: "#3300ff",
    },
  },
});

export default theme;

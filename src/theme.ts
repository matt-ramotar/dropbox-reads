import { createMuiTheme } from "@material-ui/core/styles";
import React from "react";

declare module "@material-ui/core/styles/createMuiTheme" {
  interface Theme {
    mighty: {
      purple: {
        light: React.CSSProperties["color"];
        main: React.CSSProperties["color"];
        dark: React.CSSProperties["color"];
      };
      gray: {
        light: React.CSSProperties["color"];
        main: React.CSSProperties["color"];
        dark: React.CSSProperties["color"];
      };
    };
  }

  interface ThemeOptions {
    mighty: {
      purple: {
        dark: React.CSSProperties["color"];
        main: React.CSSProperties["color"];
        light: React.CSSProperties["color"];
      };
      gray: {
        light: React.CSSProperties["color"];
        main: React.CSSProperties["color"];
        dark: React.CSSProperties["color"];
      };
    };
  }
}

const theme = createMuiTheme({
  palette: {
    type: "light",
    background: {
      default: "#201c2b",
      paper: "#201c2b",
    },
    primary: {
      main: "#9246FF",
    },
  },
  mighty: {
    purple: {
      light: "e2dbf0",
      main: "#6441a4",
      dark: "#201c2b",
    },
    gray: {
      light: "#e5e3e8",
      main: "",
      dark: "#232127",
    },
  },
});

export default theme;

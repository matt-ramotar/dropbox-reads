import { StylesProvider, ThemeProvider } from "@material-ui/core/styles";
import { useEffect, useState } from "react";
import { useRoutes } from "react-router";
import "semantic-ui-css/semantic.min.css";
import "./App.scss";
import validateToken, { ValidateTokenSuccess } from "./lib/validateToken";
import routes from "./routes.js";
import theme from "./theme";
import SafeUser from "./types/SafeUser";

function App({ user }: { user: SafeUser | null }): JSX.Element | null {
  const isLoggedIn = Boolean(user);

  const routing = useRoutes(routes(isLoggedIn, user));

  return (
    <ThemeProvider theme={theme}>
      <StylesProvider injectFirst>{routing}</StylesProvider>
    </ThemeProvider>
  );
}

export default function AppHoc(): JSX.Element | null {
  const [isValidated, setIsValidated] = useState<boolean | null>(null);
  const [safeUser, setSafeUser] = useState<SafeUser | null>(null);

  useEffect(() => {
    const localToken = localStorage.getItem("TOKEN");

    if (localToken) validateTokenAsync(localToken);
    else setIsValidated(false);

    async function validateTokenAsync(localToken: string) {
      try {
        const { user }: ValidateTokenSuccess = await validateToken(localToken);
        setSafeUser(user);
        setIsValidated(true);
      } catch (error) {
        setIsValidated(false);
      }
    }
  }, [setIsValidated]);

  if (isValidated === null) return null;
  return <App user={safeUser} />;
}

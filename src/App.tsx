import { StylesProvider, ThemeProvider } from "@material-ui/core/styles";
import { useEffect, useState } from "react";
import { useRoutes } from "react-router";
import "./App.scss";
import fetchBooks from "./lib/fetchBooks";
import fetchTags from "./lib/fetchTags";
import validateToken, { ValidateTokenSuccess } from "./lib/validateToken";
import routes from "./routes.js";
import theme from "./theme";
import { GodBook } from "./types/GodBook";
import SafeUser from "./types/SafeUser";
import { Tag } from "./types/Tag";

function App({ user, tags, books }: { user: SafeUser | null, tags: Tag[], books: GodBook[] }): JSX.Element | null {
  const isLoggedIn = Boolean(user);

  const routing = useRoutes(routes(isLoggedIn, user, tags, books));

  return (
    <ThemeProvider theme={theme}>
      <StylesProvider injectFirst>{routing}</StylesProvider>
    </ThemeProvider>
  );
}

export default function AppHoc(): JSX.Element | null {
  const [isValidated, setIsValidated] = useState<boolean | null>(null);
  const [safeUser, setSafeUser] = useState<SafeUser | null>(null);
  const [tags, setTags] = useState<Tag[] | null>(null)
  const [books, setBooks] = useState<GodBook[] | null>(null)

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

  useEffect(() => {
    async function loadTagsAsync() {
      const tagsResponse = await fetchTags()
      setTags(tagsResponse)
    }

    loadTagsAsync()
  }, [setTags])

  useEffect(() => {
    async function loadBooksAsync() {
      const booksResponse = await fetchBooks()
      setBooks(booksResponse)
    }

    loadBooksAsync()

  }, [setBooks])

  if (isValidated === null || tags === null || books === null) return null;
  return <App user={safeUser} tags={tags} books={books}/>;
}

/* eslint-disable */

import { Navigate } from "react-router-dom";
import HomeLayout from "./layouts/Home";
import MainLayout from "./layouts/Main";
import SplashLayout from "./layouts/Splash";
import {
  BookDetailPage,
  BookshelfDetailPage,
  BookshelvesPage,
  DropboxersPage,
  ExplorePage,
  FeedPage,
  HomePage,
  ProfilePage,
  SplashPage,
  TagPage,
} from "./util/pages";

const routes = (isLoggedIn, user) => [
  {
    path: "i",
    children: [
      {
        path: "bookshelves/:bookshelfId",
        element: <MainLayout user={user} pageName={BookshelfDetailPage} />,
      },
    ],
  },
  {
    path: "dropboxers",
    element: isLoggedIn ? <MainLayout user={user} pageName={DropboxersPage} /> : <Navigate to="/" />,
  },

  {
    path: "feed",
    element: isLoggedIn ? <MainLayout user={user} pageName={FeedPage} /> : <Navigate to="/" />,
  },

  {
    path: "home",
    element: isLoggedIn ? <HomeLayout user={user} pageName={HomePage} /> : <Navigate to="/" />,
  },
  {
    path: "explore",
    element: isLoggedIn ? <MainLayout user={user} pageName={ExplorePage} /> : <Navigate to="/" />,
  },
  {
    path: ":username",
    element: isLoggedIn ? <MainLayout user={user} pageName={ProfilePage} /> : <Navigate to="/" />,
  },
  {
    path: "books/:id",
    element: isLoggedIn ? <MainLayout user={user} pageName={BookDetailPage} /> : <Navigate to="/" />,
  },

  {
    path: ":username/bookshelves",
    element: isLoggedIn ? <MainLayout user={user} pageName={BookshelvesPage} /> : <Navigate to="/" />,
  },
  { path: "login", element: <Navigate to="/" /> },
  {
    path: "tags/:tagname",
    element: isLoggedIn ? <MainLayout user={user} pageName={TagPage} /> : <Navigate to="/" />,
  },
  {
    path: "/",
    element: !isLoggedIn ? <SplashLayout pageName={SplashPage} /> : <Navigate to="/home" />,
  },
];

export default routes;

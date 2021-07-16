/* eslint-disable */

import { Navigate } from "react-router-dom";
import HomeLayout from "./layouts/Home";
import MainLayout from "./layouts/Main";
import SplashLayout from "./layouts/Splash";
import BookDetail from "./pages/BookDetail";
import { AddBookFormPage, ExplorePage, HomePage, ProfilePage, SplashPage, TagPage, BookDetailPage } from "./util/pages";

const routes = (isLoggedIn, user, tags, books, users) => [
  {
    path: "/home",
    element: isLoggedIn ? <HomeLayout user={user} pageName={HomePage} tags={tags} books={books} users={users} /> : <Navigate to="/" />,
  },
  {
    path: "/explore",
    element: isLoggedIn ? <MainLayout user={user} pageName={ExplorePage} /> : <Navigate to="/" />,
  },
  {
    path: "/:username",
    element: isLoggedIn ? <MainLayout user={user} pageName={ProfilePage} /> : <Navigate to="/" />,
  },
  { path: "/login", element: <Navigate to="/" /> },
  {
    path: "/tags/:tagname",
    element: isLoggedIn ? <MainLayout user={user} pageName={TagPage} /> : <Navigate to="/" />,
  },
  {
    path: "/",
    element: !isLoggedIn ? <SplashLayout pageName={SplashPage} /> : <Navigate to="/home" />,
  },
  {
    path: "/add-book",
    element: isLoggedIn ? <MainLayout user={user} pageName={AddBookFormPage} /> : <Navigate to="/" />,
  },
  {
    path: "/books/:id/god",
    element: isLoggedIn ? <MainLayout user={user} pageName={BookDetailPage} /> : <Navigate to="/" />,
  }
];

export default routes;

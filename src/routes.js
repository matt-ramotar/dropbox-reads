/* eslint-disable */

import { Navigate } from "react-router-dom";
import HomeLayout from "./layouts/Home";
import MainLayout from "./layouts/Main";
import SplashLayout from "./layouts/Splash";
import { AddBookFormPage, ExplorePage, HomePage, ProfilePage, SplashPage } from "./util/pages";

const routes = (isLoggedIn, user, tags, books) => [
  {
    path: "/home",
    element: isLoggedIn ? <HomeLayout user={user} pageName={HomePage} tags={tags} books={books} /> : <Navigate to="/" />,
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
    path: "/",
    element: !isLoggedIn ? <SplashLayout pageName={SplashPage} /> : <Navigate to="/home" />,
  },
  {
    path: "/add-book",
    element: isLoggedIn ? <MainLayout user={user} pageName={AddBookFormPage} /> : <Navigate to="/" />,
  },
];

export default routes;

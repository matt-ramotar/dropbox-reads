/* eslint-disable */

import { Navigate } from "react-router-dom";
import MainLayout from "./layouts/Main";
import SplashLayout from "./layouts/Splash";
import { ExplorePage, HomePage, ProfilePage, SplashPage, AddBookFormPage } from "./util/pages";

const routes = (isLoggedIn, user) => [
  {
    path: "/home",
    element: isLoggedIn ? <MainLayout user={user} pageName={HomePage} /> : <Navigate to="/" />,
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
    element: isLoggedIn ? <MainLayout user={user} pageName={AddBookFormPage} /> : <Navigate to="/" />
  }
];

export default routes;

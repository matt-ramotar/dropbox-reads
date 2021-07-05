/* eslint-disable */

import { Navigate } from "react-router-dom";
import { MainLayout, SplashLayout } from "./layouts";
import Explore from "./pages/Explore";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Splash from "./pages/Splash";

const routes = (isLoggedIn, user) => [
  {
    path: "/home",
    element: isLoggedIn ? (
      <>
        <MainLayout />
        <Home user={user} />
      </>
    ) : (
      <Navigate to="/" />
    ),
  },
  {
    path: "/explore",
    element: isLoggedIn ? (
      <>
        <MainLayout />
        <Explore user={user} />
      </>
    ) : (
      <Navigate to="/" />
    ),
  },
  {
    path: "/:username",
    element: isLoggedIn ? (
      <>
        <MainLayout />
        <Profile user={user} />
      </>
    ) : (
      <Navigate to="/" />
    ),
  },

  {
    path: "/",
    element: !isLoggedIn ? (
      <>
        <SplashLayout />
        <Splash />
      </>
    ) : (
      <Navigate to="/home" />
    ),
  },
];

export default routes;

import { Navigate } from "react-router-dom";
import { MainLayout, SplashLayout } from "./layouts";
import Home from "./pages/Home";
import Splash from "./pages/Splash";

const routes = (isLoggedIn) => [
  {
    path: "/home",
    element: isLoggedIn ? (
      <>
        <MainLayout />
        <Home />
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

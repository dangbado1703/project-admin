import React from "react";
import { Navigate, useLocation, useRoutes } from "react-router-dom";
import useAuth from "../contants/useAuth";
import Client from "../pages/Client/Client";
import Home from "../pages/Home/Home";
import LayoutMain from "../pages/Layout/Layout";
import Login from "../pages/Login/Login";
import Order from "../pages/Order/Order";
import Register from "../pages/Register/Register";
import Staff from "../pages/Staff/Staff";
import { path } from "./path";

const Router = () => {
  const location = useLocation();
  const auth = useAuth();
  return useRoutes([
    {
      path: path.home,
      element: auth ? (
        <LayoutMain />
      ) : (
        <Navigate to={path.login} state={{ from: location }} />
      ),
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: path.order,
          element: <Order />,
        },
        {
          path: path.staff,
          element: <Staff />,
        },
        {
          path: path.client,
          element: <Client />,
        },
      ],
    },
    {
      path: path.login,
      element: auth ? (
        <Navigate to={path.home} state={{ from: location }} />
      ) : (
        <Login />
      ),
    },
    {
      path: path.register,
      element: auth ? (
        <Navigate to={path.home} state={{ from: location }} />
      ) : (
        <Register />
      ),
    },
  ]);
};

export default Router;

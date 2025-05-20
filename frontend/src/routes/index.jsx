import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import * as path from "./routePaths";

import SignUp from "@pages/auth/signup";
import Login from "@pages/auth/login";
import Profile from "@pages/user/profile";

import BaseLayout from "@components/layout/baseLayout";
import ProtectedRoute from "./protectedRoute";

import { CircularProgress } from "@mui/material";

export const RoutesList = () => {
  return (
    <Suspense fallback={<CircularProgress />}>
      <Routes>
        <Route path={path.rootPath} element={<BaseLayout ignore={["/login", "/signup","/profile"]} />}>
          <Route index element={<Login />} />
          <Route path={path.login} element={<Login />} />
          <Route path={path.signup} element={<SignUp />} />
          <Route element={<ProtectedRoute />}>
            <Route path={path.profile} element={<Profile />} />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
};

export default RoutesList;

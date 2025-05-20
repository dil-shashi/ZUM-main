import React, { Suspense, useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { Backdrop, CircularProgress } from "@mui/material";
import BaseLayout from "@components/layout/baseLayout";
import { rootPath } from "./routePaths";
import { useSelector } from "react-redux";
import { REDUX_KEYS } from "../_helpers/constants";

export const ProtectedRouteWithoutLayout = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state[REDUX_KEYS.REDUX_USER]);
  useEffect(() => {
    if (!isAuthenticated) {
      return navigate(rootPath, { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  return (
    <Suspense
      fallback={
        <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open>
          <CircularProgress color="inherit" />
        </Backdrop>
      }
    >
      <Outlet />
    </Suspense>
  );
};

const ProtectedRoute = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state[REDUX_KEYS.REDUX_USER]);
  useEffect(() => {
    if (!isAuthenticated) {
      return navigate(rootPath, { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  return (
    <BaseLayout>
      <Suspense
        fallback={
          <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open>
            <CircularProgress color="inherit" />
          </Backdrop>
        }
      >
        <Outlet />
      </Suspense>
    </BaseLayout>
  );
};

export default ProtectedRoute;

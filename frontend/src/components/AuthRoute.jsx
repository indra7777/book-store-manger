import React from "react";
import { Route, Navigate } from "react-router-dom";

const AuthRoute = ({ element, isAuthenticated, redirectTo, ...props }) => {
  return isAuthenticated ? (
    <Route {...props} element={element} />
  ) : (
    <Navigate to={redirectTo} replace={true} />
  );
};

export default AuthRoute;

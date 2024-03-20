import React, { PropsWithChildren } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useAppSelector } from "redux/store";
import authRoutes from "routes/authRoutes";
import publicRoutes from "routes/publicRoutes";

function RouterProvider({ children }: PropsWithChildren) {
  const isSignedIn = useAppSelector((state) => state.auth.isSignedIn);

  return (
    <Router>
      <Routes>
        {!isSignedIn
          ? publicRoutes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={<route.component />}
              />
            ))
          : authRoutes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={<route.component />}
              />
            ))}
      </Routes>
    </Router>
  );
}

export default RouterProvider;

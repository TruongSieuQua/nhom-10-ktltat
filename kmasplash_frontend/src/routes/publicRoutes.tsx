import React, { lazy } from "react";
import { withTranslation } from "react-i18next";

interface RouteConfig {
  path: string;
  component: React.ComponentType<any>;
}

const publicRoutes: RouteConfig[] = [
  {
    path: "/home",
    component: lazy(() => import("../pages/Home/Home")),
  },
  {
    path: "*",
    component: withTranslation()(
      lazy(() => import("../pages/NotFound/NotFound")),
    ),
  },
  {
    path: "/notFound",
    component: withTranslation()(
      lazy(() => import("../pages/NotFound/NotFound")),
    ),
  },
  {
    path: "/login",
    component: withTranslation()(lazy(() => import("../pages/Login/Login"))),
  },
  {
    path: "/register",
    component: withTranslation()(
      lazy(() => import("../pages/Register/Register")),
    ),
  },
  {
    path: "/post/:postId",
    component: lazy(() => import("../pages/Post/PostDetailScreen")),
  },
  {
    path: "/",
    component: lazy(() => import("../pages/Home/Home")),
  },
  {
    path: "/:category",
    component: lazy(() => import("../pages/CategoryHome/CategoryHome")),
  },
  {
    path: "/search",
    component: lazy(() => import("pages/SearchScreen/SearchScreen")),
  },
  {
    path: "/profile/:id",
    component: lazy(() => import("pages/Profile/Profile")),
  },
];

export default publicRoutes;

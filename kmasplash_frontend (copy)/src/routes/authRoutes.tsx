import React, { lazy } from "react";
import { withTranslation } from "react-i18next";
interface RouteConfig {
  path: string;
  component: React.ComponentType<any>;
}

const authRoutes: RouteConfig[] = [
  {
    path: "*",
    component: withTranslation()(
      lazy(() => import("../pages/NotFound/NotFound")),
    ),
  },
  {
    path: "/",
    component: withTranslation()(lazy(() => import("../pages/Home/Home"))),
  },
  {
    path: "/home",
    component: withTranslation()(lazy(() => import("../pages/Home/Home"))),
  },
  {
    path: "/notFound",
    component: withTranslation()(
      lazy(() => import("../pages/NotFound/NotFound")),
    ),
  },
  {
    path: "/:category",
    component: lazy(() => import("../pages/CategoryHome/CategoryHome")),
  },
  {
    path: "/password/forget",
    component: withTranslation()(
      lazy(() => import("../pages/EditPassword/ForgetPassword")),
    ),
  },
  {
    path: "/user/password/reset",
    component: withTranslation()(
      lazy(() => import("../pages/EditPassword/ResetPassword")),
    ),
  },
  {
    path: "/account/password",
    component: withTranslation()(
      lazy(() => import("../pages/Account/ChangePassword")),
    ),
  },
  {
    path: "/post/:postId",
    component: lazy(() => import("../pages/Post/PostDetailScreen")),
  },
  {
    path: "/search",
    component: lazy(() => import("pages/SearchScreen/SearchScreen")),
  },
  {
    path: "/profile/:id",
    component: lazy(() => import("pages/Profile/Profile")),
  },
  {
    path: "/account",
    component: lazy(() => import("../pages/Account/Account")),
  },
  {
    path: "/collection/detail",
    component: lazy(() => import("../pages/Collection/CollectionDetail")),
  },
];

export default authRoutes;

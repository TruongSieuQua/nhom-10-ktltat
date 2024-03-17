import CommonFullLoading from "components/Loading/Loading";
import { PropsWithChildren, Suspense } from "react";
import { ToastContainer } from "react-toastify";
import ReduxProvider from "./ReduxProvider";
import RouterProvider from "./RouterProvider";
import React from "react";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "redux/store";

function AppProvider({ children }: PropsWithChildren) {
  return (
    <Suspense fallback={<CommonFullLoading />}>
      <ReduxProvider>
        <PersistGate loading={<CommonFullLoading />} persistor={persistor}>
          <RouterProvider />
          <ToastContainer />
        </PersistGate>
      </ReduxProvider>
    </Suspense>
  );
}

export default AppProvider;

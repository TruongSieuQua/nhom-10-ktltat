import React, { Provider } from "react-redux";
import { PropsWithChildren } from "react";
import store from "redux/store";

function ReduxProvider({ children }: PropsWithChildren) {
  return <Provider store={store}>{children}</Provider>;
}

export default ReduxProvider;

import React from "react";
import { RootState, useAppSelector } from "redux/store";

const withAuthReducerHOC = (
  WrappedComponent: React.ComponentType<Pick<RootState, "auth">>,
) => {
  const WithAuth = () => {
    const auth = useAppSelector((state) => state.auth);
    return <WrappedComponent auth={auth} />;
  };

  const displayName = `withAuthReducerHOC(${
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  })`;

  WithAuth.displayName = displayName;

  return WithAuth;
};

export default withAuthReducerHOC;

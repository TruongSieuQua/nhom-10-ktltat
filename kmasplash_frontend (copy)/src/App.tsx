import AppProvider from "Provider/AppProvider";
import * as React from "react";

import "react-toastify/dist/ReactToastify.css";
interface IAppProps {
  history?: any;
}

const App: React.FunctionComponent<IAppProps> = (props) => {
  return <AppProvider />;
};

export default App;

import React, { useEffect } from "react";
import MainRouter from "./routing/MainRouter";
import "./App.scss";
import AuthStore from "./stores/AuthStore";
import { AuthenticationResourceApi, Authentication } from "cloudsourced-api";
import DataContext, { defaultDataContext } from "./core/DataContext";

import { monaco } from "@monaco-editor/react";

require("dotenv").config();

const AppWrapper = () => {
  const { setAuth } = AuthStore.useContainer();

  useEffect(() => {
    monaco
      .init()
      .then((monaco) => {
        /* here is the instance of monaco, so you can use the `monaco.languages` or whatever you want */
      })
      .catch((error) =>
        console.error(
          "An error occurred during initialization of Monaco: ",
          error
        )
      );
  }, []);

  useEffect(() => {
    const authItem = localStorage.getItem("AUTH");
    if (authItem === null) {
      return;
    }

    (async () => {
      const auth: Authentication = JSON.parse(authItem);
      const response = await new AuthenticationResourceApi().validateTokenUsingPOST(
        {
          token: auth.token!,
        }
      );
      if (!response.valid) {
        localStorage.removeItem("AUTH");
        return;
      }
      setAuth(auth);
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <MainRouter />;
};

function App() {
  return (
    <DataContext.Provider value={defaultDataContext}>
      <AuthStore.Provider>
        <AppWrapper />
      </AuthStore.Provider>
    </DataContext.Provider>
  );
}

export default App;

import React, { useEffect } from "react";
import MainRouter from "./routing/MainRouter";
import "./App.scss";
import AuthStore from "./stores/AuthStore";
import {
  AuthenticationResourceApi,
  ValidateTokenUsingPOSTRequest,
} from "cloudsourced-api";
import { Authentication } from "cloudsourced-api";

require("dotenv").config();

const AppWrapper = () => {
  const { setAuth } = AuthStore.useContainer();
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
    <AuthStore.Provider>
      <AppWrapper />
    </AuthStore.Provider>
  );
}

export default App;

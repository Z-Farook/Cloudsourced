import React, { useEffect } from "react";
import MainRouter from "./routing/MainRouter";
import "./App.scss";
import AuthStore from "./stores/AuthStore";
import {
  AuthenticationResourceApi,
  ValidateTokenUsingPOSTRequest,
} from "../gen/api/src/apis";
import { Authentication } from "../gen/api/src/models";

require("dotenv").config();

const AppWrapper = () => {
  const { setAuth } = AuthStore.useContainer();
  useEffect(() => {
    const authItem = localStorage.getItem("AUTH");
    if (authItem === null) {
      return;
    }
    const auth: Authentication = JSON.parse(authItem);
    setAuth(auth);

    (async () => {
      const isValid = new AuthenticationResourceApi().validateTokenUsingPOST({
        token: auth.token!,
      });
      alert(isValid);
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

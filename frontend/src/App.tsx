import React, {useEffect, useState} from "react";
import MainRouter from "./routing/MainRouter";
import "./App.scss";
import AuthStore from "./stores/AuthStore";
import {
  AuthenticationResourceApi,
  Authentication,
  UserDTO,
} from "cloudsourced-api";
import DataContext, { defaultDataContext } from "./core/DataContext";

import { monaco } from "@monaco-editor/react";
import {Spin} from "antd";

require("dotenv").config();

const AppWrapper = () => {
  const [loading, setLoading] = useState(true);
  const { setAuth, setUser } = AuthStore.useContainer();

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
    const userItem = localStorage.getItem("USER");
    if (authItem === null || userItem === null) {
      setLoading(false);
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
        localStorage.removeItem("USER");
        return;
      }
      const user: UserDTO = JSON.parse(userItem);
      setAuth(auth);
      setUser(user);

      setLoading(false);
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Loading is required so the application can set the auth state before the rest of the app tries to access
  // these values
  if (loading) {
    return (
      <div style={{
        display: "flex",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        height: "100vh",
      }}>
        <Spin />
      </div>
    );
  }

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

import React, { useEffect } from "react";
import MainRouter from "./routing/MainRouter";
import "./App.scss";
import AuthStore from "./stores/AuthStore";
import { api } from "./core/api";
require("dotenv").config();

const AppWrapper = () => {
  const { setAuth } = AuthStore.useContainer();

  useEffect(() => {
    const authItem = localStorage.getItem("AUTH");
    if (authItem === null) {
      return;
    }
    const auth = JSON.parse(authItem);
    setAuth(auth);
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

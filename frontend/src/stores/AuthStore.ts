import { createContainer } from "unstated-next";
import { Authentication } from "cloudsourced-api";
import { useCallback, useMemo, useState } from "react";
import { saveAuthentication } from "../core/api";

interface IInitialState {
  auth?: Authentication;
}

const defaultInitialState: IInitialState = {
  auth: undefined,
};

const useAuthStore = (initialState?: IInitialState) => {
  const state = useMemo<IInitialState>(() => {
    return { ...defaultInitialState, ...initialState };
  }, [initialState]);
  const [auth, setAuth] = useState<Authentication | null>(state.auth || null);

  const setAuthFn = useCallback(
    (x: Authentication | null) => {
      setAuth(x);
      saveAuthentication(x);
    },
    [setAuth]
  );

  return { auth, setAuth: setAuthFn };
};

const AuthStore = createContainer(useAuthStore);

export default AuthStore;

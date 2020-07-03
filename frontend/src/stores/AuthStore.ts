import { createContainer } from "unstated-next";
import { Authentication, UserDTO } from "cloudsourced-api";
import { useCallback, useMemo, useState } from "react";
import { saveAuthentication, saveUser } from "../core/api";

interface IInitialState {
  auth?: Authentication;
  user?: UserDTO;
}

const defaultInitialState: IInitialState = {
  auth: undefined,
  user: undefined,
};

const useAuthStore = (initialState?: IInitialState) => {
  const state = useMemo<IInitialState>(() => {
    return { ...defaultInitialState, ...initialState };
  }, [initialState]);
  const [auth, setAuth] = useState<Authentication | null>(state.auth || null);
  const [user, setUser] = useState<UserDTO | null>(state.user || null);

  const setAuthFn = useCallback(
    (x: Authentication | null) => {
      setAuth(x);
      saveAuthentication(x);
    },
    [setAuth]
  );

  const setUserFn = useCallback(
    (x: UserDTO | null) => {
      setUser(x);
      saveUser(x);
    },
    [setUser]
  );

  return { auth, setAuth: setAuthFn, user, setUser: setUserFn };
};

const AuthStore = createContainer(useAuthStore);

export default AuthStore;

import { Authentication, Configuration } from "cloudsourced-api";

export const api = {
  config: (() => {
    const authItem = localStorage.getItem("AUTH");
    if (authItem != null) {
      const auth = JSON.parse(authItem);
      return new Configuration({
        headers: {
          Authorization: auth.token!,
        },
      });
    }

    return new Configuration();
  })(),
};

export const saveAuthentication = (auth: Authentication | null) => {
  if (auth == null) {
    api.config = new Configuration();
    localStorage.removeItem("AUTH");
    return;
  }

  api.config = new Configuration({
    headers: {
      Authorization: auth.token!,
    },
  });

  localStorage.setItem("AUTH", JSON.stringify(auth));
};

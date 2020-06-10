import { User } from "cloudsourced-api";

export const formatUser = (user: User): string => {
  return `${user.name}${user.infix === undefined ? "" : ` ${user.infix}`}${
    user.lastName === undefined ? "" : ` ${user.lastName}`
  }`;
};

import { Configuration, UserDTO, UserResourceApi } from "cloudsourced-api";

export interface IUserResource {
  getUserInfo: () => Promise<UserDTO>;
}

export const user = (config?: Configuration): IUserResource => {
  return {
    getUserInfo: async () => {
      return await new UserResourceApi(config).getUserInfoUsingGET();
    },
  };
};

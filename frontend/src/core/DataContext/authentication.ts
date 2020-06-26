import {
  Authentication,
  AuthenticationResourceApi,
  Configuration,
  User,
} from "cloudsourced-api";

export interface IAuthenticateUserParams {
  email: string;
  password: string;
}
export interface IRegisterNewUserParams {
  country?: string;
  email?: string;
  infix?: string;
  languages?: Array<string>;
  lastName?: string;
  name?: string;
  password?: string;
  street?: string;
  streetNumber?: string;
  telephone?: string;
}

interface IAuthenticateUserResult {
  authentication: Authentication;
}
interface IRegisterNewUserResult {
  user: User;
}
export interface IAuthenticationResource {
  authenticateUser: (
    params: IAuthenticateUserParams
  ) => Promise<IAuthenticateUserResult>;
  registerNewUser: (
    params: IRegisterNewUserParams
  ) => Promise<IRegisterNewUserResult>;
}

const authentication = (config?: Configuration): IAuthenticationResource => {
  return {
    authenticateUser: async (
      params: IAuthenticateUserParams
    ): Promise<IAuthenticateUserResult> => {
      const result = await new AuthenticationResourceApi(
        config
      ).authenticateUserUsingPOST({
        authenticationUserDTO: {
          email: params.email,
          password: params.password,
        },
      });
      return {
        authentication: result,
      };
    },
    registerNewUser: async (
      params: IRegisterNewUserParams
    ): Promise<IRegisterNewUserResult> => {
      const result = await new AuthenticationResourceApi(
        config
      ).registerNewUserUsingPOST({
        registerUserDTO: {
          ...params,
        },
      });
      return {
        user: result,
      };
    },
  };
};

export default authentication;

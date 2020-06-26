import {
  Authentication,
  AuthenticationResourceApi,
  Configuration,
} from "cloudsourced-api";

export interface IAuthenticateUserParams {
  email: string;
  password: string;
}

interface IAuthenticateUserResult {
  authentication: Authentication;
}

export interface IAuthenticationResource {
  authenticateUser: (
    params: IAuthenticateUserParams
  ) => Promise<IAuthenticateUserResult>;
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
  };
};

export default authentication;

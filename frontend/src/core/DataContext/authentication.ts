import {
  Authentication,
  AuthenticationResourceApi,
  Configuration,
  User,
} from "cloudsourced-api";
import {message} from "antd";

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
  image?: string;
}

export interface IAuthenticateUserResult {
  authentication: Authentication;
}
export interface IRegisterNewUserResult {
  user: User;
}
export interface IAuthenticationResource {
  authenticateUser: (
    params: IAuthenticateUserParams
  ) => Promise<IAuthenticateUserResult>;
  registerNewUser: (
    params: IRegisterNewUserParams
  ) => Promise<IRegisterNewUserResult>;
  postImage: (
      params: string
  ) => Promise<string>;
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
    postImage: async (image: string): Promise<string> => {
      image = image.split("base64,")[1];
      const url = "https://api.imgur.com/3/image";
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Client-ID 2b1eae61348c066",
        },
        body: JSON.stringify({
          image,
          type: "base64",
        }),
      };
      try {
        const response = await fetch(url, requestOptions);
        const data = await response.json();
        console.log(data)
        return data!.data!.link;
      } catch (e) {
        errorMessage();
        return "";
      }
    }
  };
};
const errorMessage = () => {
  message.error({
    content: "Something went wrong",
    key: "updatableKey",
    duration: 2,
  });
};
export default authentication;

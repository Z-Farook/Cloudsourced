import { Configuration, TransactionResourceApi } from "cloudsourced-api";
import { UserDTO } from "../../../gen/api/src/models";
import { api } from "../api";

export interface ITransactionResource {
  getTransactionsByAuthenticatedUser: () => Promise<
    Array<IGettransactionsByAuthenticatedUserResult>
  >;
}
export interface IGettransactionsByAuthenticatedUserResult {
  id?: number;
  points?: number;
  user?: UserDTO;
}
const transaction = (config?: Configuration): ITransactionResource => {
  return {
    getTransactionsByAuthenticatedUser: async (): Promise<
      Array<IGettransactionsByAuthenticatedUserResult>
    > => {
      const result = await new TransactionResourceApi(
        api.config
      ).getAllTransactionForAUserUsingGET();
      return result;
    },
  };
};

export default transaction;

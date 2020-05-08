export enum EState {
  Loading,
  Loaded,
  Error,
}

export interface IError<TErrorCode> {
  code: TErrorCode;
}

interface IRemoteData<T, TErrorCode> {
  error: IError<TErrorCode> | null;
  data: T | null;
  state: EState;
}

const fromLoading = <T, TErrorCode>(): IRemoteData<T, TErrorCode> => {
  return {
    data: null,
    error: null,
    state: EState.Loading,
  };
};

const fromLoaded = <T, TErrorCode>(data: T): IRemoteData<T, TErrorCode> => {
  return {
    data,
    error: null,
    state: EState.Loaded,
  };
};

const fromError = <T, TErrorCode>(
  code: TErrorCode
): IRemoteData<T, TErrorCode> => {
  return {
    data: null,
    error: {
      code,
    },
    state: EState.Error,
  };
};

export { fromLoading, fromLoaded, fromError };

export default IRemoteData;

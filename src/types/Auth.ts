import firebase from 'firebase/compat/app';

export type UserType = firebase.User | null;

export type AuthType = {
  open: boolean;
  handleClose: () => void;
};

export type formValues = { name: string; password: string; email: string };

export enum AuthActionsTypes {
  CHECK = 'CHECK_LOADING',
  CHECK_AUTH = 'CHECK_AUTH',
  UPDATE_AUTH = 'UPDATE_AUTH',
  UPDATE_IS_AUTH_ERROR = 'UPDATE_IS_AUTH_ERROR',
}

interface Check {
  type: AuthActionsTypes.CHECK;
}

interface CheckAuth {
  type: AuthActionsTypes.CHECK_AUTH;
  payload: UserType;
}

interface UpdateAuth {
  type: AuthActionsTypes.UPDATE_AUTH;
  payload: UserType;
}

interface UpdateIsAuthError {
  type: AuthActionsTypes.UPDATE_IS_AUTH_ERROR;
}

export type AuthActionType = Check | CheckAuth | UpdateAuth | UpdateIsAuthError;

/* eslint-disable func-names */
import { Dispatch } from 'redux';
import { auth } from '../../firebase';
import { AuthActionsTypes, AuthActionType, UserType } from '../../types/Auth';

export const checkAuthUser = () => {
  const thunk = async (dispatch: Dispatch<AuthActionType>) => {
    try {
      dispatch({ type: AuthActionsTypes.CHECK });
      auth.onAuthStateChanged(function (user) {
        dispatch({ type: AuthActionsTypes.CHECK_AUTH, payload: user });
      });
    } catch (error) {
      dispatch({ type: AuthActionsTypes.UPDATE_IS_AUTH_ERROR });
      console.error(`Failed to check authorization, ${error}`);
    }
  };
  return thunk;
};

export const logoutUser = () => {
  const thunk = async (dispatch: Dispatch<AuthActionType>) => {
    try {
      await auth.signOut();
      dispatch({ type: AuthActionsTypes.UPDATE_AUTH, payload: null });
      dispatch({ type: AuthActionsTypes.CHECK });
    } catch (error) {
      dispatch({ type: AuthActionsTypes.UPDATE_IS_AUTH_ERROR });
      console.error(`Failed to log-out, ${error}`);
    }
  };
  return thunk;
};

export const checking = () => {
  return {
    type: AuthActionsTypes.CHECK,
  };
};

export const isAuthError = () => {
  return {
    type: AuthActionsTypes.UPDATE_IS_AUTH_ERROR,
  };
};

export const updateAuth = (payload: UserType) => {
  return {
    type: AuthActionsTypes.UPDATE_AUTH,
    payload,
  };
};



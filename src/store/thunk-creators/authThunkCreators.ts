/* eslint-disable func-names */
import { Dispatch } from 'redux';
import { auth } from '../../firebase';
import { checkAuth, checkUserData, updateAuthError, updateUserData } from '../actions/authAction';
import { AuthActionType } from '../../types/Auth';

export const checkAuthUser = () => {
  const thunk = async (dispatch: Dispatch<AuthActionType>) => {
    try {
      dispatch(checkAuth());
      auth.onAuthStateChanged(function (user) {
        dispatch(checkUserData(user));
      });
    } catch (error) {
      dispatch(updateAuthError());
      console.error(`Failed to check authorization, ${error}`);
    }
  };
  return thunk;
};

export const logoutUser = () => {
  const thunk = async (dispatch: Dispatch<AuthActionType>) => {
    try {
      await auth.signOut();
      dispatch(updateUserData());
      dispatch(checkAuth());
    } catch (error) {
      dispatch(updateAuthError());
      console.error(`Failed to log-out, ${error}`);
    }
  };
  return thunk;
};

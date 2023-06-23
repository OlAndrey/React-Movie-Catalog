/* eslint-disable func-names */
import { Dispatch } from 'redux';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import { checkAuth, checkUserData, updateAuth, updateAuthError } from '../actions/authAction';
import { AuthActionType } from '../../types/Auth';

export const checkAuthUser = () => {
  const thunk = async (dispatch: Dispatch<AuthActionType>) => {
    try {
      dispatch(checkAuth());
      onAuthStateChanged(auth, (user) => {
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
      await signOut(auth);
      dispatch(updateAuth(null));
      dispatch(checkAuth());
    } catch (error) {
      dispatch(updateAuthError());
      console.error(`Failed to log-out, ${error}`);
    }
  };
  return thunk;
};

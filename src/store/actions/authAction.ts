import { AuthActionsTypes, AuthActionType, UserType } from '../../types/Auth';

export const checkAuth = (): AuthActionType => ({ type: AuthActionsTypes.CHECK });

export const updateAuthError = (): AuthActionType => ({
  type: AuthActionsTypes.UPDATE_IS_AUTH_ERROR,
});

export const checkUserData = (user: UserType): AuthActionType => ({
  type: AuthActionsTypes.CHECK_AUTH,
  payload: user,
});

export const updateUserData = (): AuthActionType => ({
  type: AuthActionsTypes.UPDATE_AUTH,
  payload: null,
});

export const checking = (): AuthActionType => ({
  type: AuthActionsTypes.CHECK,
});

export const isAuthError = (): AuthActionType => ({
  type: AuthActionsTypes.UPDATE_IS_AUTH_ERROR,
});

export const updateAuth = (payload: UserType): AuthActionType => ({
  type: AuthActionsTypes.UPDATE_AUTH,
  payload,
});

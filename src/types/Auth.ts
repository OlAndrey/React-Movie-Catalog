import firebase from 'firebase/compat/app';

export type UserType = firebase.User | any;

export interface IAuth{
    open: boolean,
    handleClose: () => void
}

export interface ILogin{
    emailInputError: string,
    passwordInputError: string,
    handleForm: (a: string, b: string) => void,
    clearError: (value: "emailInputError" | "passwordInputError") => void,
    registry: () => void,
    handleClose: () => void
}

export interface IRegistry{
    nameInputError: string,
    emailInputError: string,
    passwordInputError: string,
    handleForm: (email: string, password: string, name: string) => void,
    clearError: (value: "emailInputError" | "passwordInputError" | "nameInputError") => void,
    handleClose: () => void
}

export enum AuthActionsTypes {
	CHECK_AUTH = 'CHECK_AUTH',
	UPDATE_AUTH = 'UPDATE_AUTH',
	UPDATE_IS_AUTH_ERROR = 'UPDATE_IS_AUTH_ERROR',
}

interface CheckAuth {
	type: AuthActionsTypes.CHECK_AUTH
}

interface UpdateAuth {
	type: AuthActionsTypes.UPDATE_AUTH,
    payload: UserType
}

interface UpdateIsAuthError {
	type: AuthActionsTypes.UPDATE_IS_AUTH_ERROR,
}

export type AuthActionType =
	CheckAuth
	| UpdateAuth
	| UpdateIsAuthError
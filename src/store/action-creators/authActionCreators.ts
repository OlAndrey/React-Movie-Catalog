import { Dispatch } from 'react';
import { auth } from '../../firebase';
import { AuthActionsTypes, AuthActionType } from '../../types/Auth';


export const createUser = (name: string, email: string, password: string) => {
	const thunk = async (dispatch: Dispatch<AuthActionType>) => {
		try {
            dispatch({type: AuthActionsTypes.CHECK})
			const dataFromServer = await auth.createUserWithEmailAndPassword(email, password)
            dataFromServer.user!.updateProfile({
                displayName: name
            })
            dispatch({type: AuthActionsTypes.UPDATE_AUTH, payload: null})
        } catch (error) {
            dispatch({type: AuthActionsTypes.UPDATE_IS_AUTH_ERROR})
			console.error(`Can't proceed fetch movie list, ${error}`)
		}
	}
	return thunk;
}

export const checkAuthUser = () => {
	const thunk = async (dispatch: Dispatch<AuthActionType>) => {
		try {
            dispatch({type: AuthActionsTypes.CHECK})
			auth.onAuthStateChanged(function(user) {
                dispatch({type: AuthActionsTypes.CHECK_AUTH, payload: user})
          })
            
		} catch (error) {
            dispatch({type: AuthActionsTypes.UPDATE_IS_AUTH_ERROR})
			console.error(`Can't proceed fetch movie list, ${error}`)
		}
	}
	return thunk;
}

export const loginUser = (email: string, password: string) => {
	const thunk = async (dispatch: Dispatch<AuthActionType>) => {
		try {
            dispatch({type: AuthActionsTypes.CHECK})
			const dataFromServer = await auth.signInWithEmailAndPassword(email, password)
            dispatch({type: AuthActionsTypes.UPDATE_AUTH, payload: dataFromServer.user})
		} catch (error) {
            dispatch({type: AuthActionsTypes.UPDATE_IS_AUTH_ERROR})
			console.error(`Can't proceed fetch movie list, ${error}`)
		}
	}
	return thunk;
}

export const logoutUser = () => {
	const thunk = async (dispatch: Dispatch<AuthActionType>) => {
		try {
			const dataFromServer = await auth.signOut()
            dispatch({type: AuthActionsTypes.UPDATE_AUTH, payload: null})
            dispatch({type: AuthActionsTypes.CHECK})
		} catch (error) {
            dispatch({type: AuthActionsTypes.UPDATE_IS_AUTH_ERROR})
			console.error(`Can't proceed fetch movie list, ${error}`)
		}
	}
	return thunk;
}



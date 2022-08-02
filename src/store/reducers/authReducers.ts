import { auth } from "../../firebase"
import { UserType, AuthActionsTypes, AuthActionType } from "../../types/Auth"

interface IAuth{
    isCheck: boolean,
    isError: boolean,
    currentUser: UserType
}

const initState: IAuth = {
    isCheck: false,
    isError: false,
    currentUser: auth.currentUser
}


export const authReducer = (state: IAuth = initState, action: AuthActionType): IAuth => {
	switch (action.type) {
		case AuthActionsTypes.CHECK_AUTH:
            return {
                ...state,
                isCheck: false,
                isError: false
            }
        case AuthActionsTypes.UPDATE_AUTH:
            return {
                isCheck: true,
                isError: false,
                currentUser: action.payload
            }
        
		case AuthActionsTypes.UPDATE_IS_AUTH_ERROR:
            return {
                ...state,
                isCheck: true,
                isError: true
            }
            
        default: 
            return state
    }
}
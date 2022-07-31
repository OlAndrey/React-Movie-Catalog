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
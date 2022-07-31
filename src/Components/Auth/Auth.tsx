import React, { useState } from "react";
import { Dialog } from "@mui/material";
import Login from "./Login";
import Registry from "./Registry";
import { IAuth } from "../../types/Auth";


const Auth: React.FunctionComponent<IAuth> = ({open, handleClose}) => {
    const [isNewUser, setIsNewUser] = useState<boolean>(false);
    const [nameInputError, setNameInputError] = useState<string>("");
    const [emailInputError, setEmailInputError] = useState<string>("");
    const [passwordInputError, setPasswordInputError] = useState<string>("");
    
    const regularEmail = /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/;
    const regularPassword = /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;

    const handleForm = (emailInput: string, passwordInput: string, nameInput?: string) => {
        let error: boolean = false
        if (emailInput === '') {
            setEmailInputError('email is empty!')
            error = true
        }
        if (passwordInput === '') {
            setPasswordInputError('password is empty!')
            error = true
        }
        if (!(emailInput === '') && !regularEmail.test(emailInput)){
            setEmailInputError('email is not correct!!')
            error = true
        }
        if (!(passwordInput === '') && !regularPassword.test(passwordInput)){
            setPasswordInputError('password is not correct!!')
            error = true
        }

        if(!(typeof nameInput === "string")){
            if(!error)
                handleClose()
        }
        else{
            if (nameInput === '') {
                setNameInputError('name is empty!')
                error = true
            }
            if(!error)
                setIsNewUser(false)
        }
    }

    const clearError = (value: "emailInputError" | "passwordInputError" | "nameInputError") =>{ 
        switch (value) {
            case "nameInputError":
                setNameInputError("")
                break
            case 'emailInputError':
                setEmailInputError("")
                break
            case "passwordInputError":
                setPasswordInputError("")
                break
            default:
        }
    }

    return (
        <Dialog open={open} aria-labelledby="form-dialog-title">
            {
                isNewUser
                ?<Registry 
                    nameInputError={nameInputError} 
                    emailInputError={emailInputError} 
                    passwordInputError={passwordInputError} 
                    handleForm={handleForm} 
                    clearError={clearError} 
                    handleClose={handleClose} />
                :<Login 
                    emailInputError={emailInputError} 
                    passwordInputError={passwordInputError} 
                    handleForm={handleForm} 
                    clearError={clearError} 
                    handleClose={handleClose} 
                    registry={() => setIsNewUser(true)} />
            }
        </Dialog>
    )
}

export default Auth;
import React, { useEffect, useState } from "react";
import { Dialog } from "@mui/material";
import Login from "./Login";
import Registry from "./Registry";
import { IAuth, UserType } from "../../types/Auth";
import { AppStatetype } from "../../store/reducers";
import { connect } from "react-redux";
import { createUser, loginUser } from "../../store/action-creators/authActionCreators"

type IReact = React.FunctionComponent<IAuth 
        &{ isCheck: boolean, isError: boolean, user: UserType } 
        & { createUser: (name: string, email: string, password: string) => Promise<void>; loginUser: (email: string, password: string) => Promise<void>;}>


const Auth: IReact = ({open, isCheck, isError, user, handleClose, createUser, loginUser}) => {
    const [isNewUser, setIsNewUser] = useState<boolean>(false);
    const [isRegistry, setIsRegistry] = useState<boolean>(false);
    const [nameInputError, setNameInputError] = useState<string>("");
    const [emailInputError, setEmailInputError] = useState<string>("");
    const [passwordInputError, setPasswordInputError] = useState<string>("");
    
    const regularEmail = /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/;
    const regularPassword = /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;

    useEffect(() => {
        if(isCheck){
            if(isError){
                setEmailInputError('email or password is incorrect!!!')
                setPasswordInputError('email or password is incorrect!!!')
            }
            else{
                user
                    ?close()
                    :setIsRegistry(true)
                setIsNewUser(false)
            }
        }
    }, [isCheck, isError])

    const close = () => {
        setIsRegistry(false)
        handleClose()
    }

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
            if(!error){
                loginUser(emailInput, passwordInput)
        }}
        else{
            if (nameInput === '') {
                setNameInputError('name is empty!')
                error = true
            }
            if(!error){
                createUser(nameInput, emailInput, passwordInput)}
        }
        return error;
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
                    handleClose={() => setIsNewUser(false)} />
                :<Login 
                    emailInputError={emailInputError} 
                    passwordInputError={passwordInputError} 
                    isRegistry={isRegistry}
                    handleForm={handleForm} 
                    clearError={clearError} 
                    handleClose={close} 
                    registry={() => setIsNewUser(true)} />
            }
        </Dialog>
    )
}

const mapStateToProps = ( state: AppStatetype ) => {
    return {
        isCheck: state.auth.isCheck,
        isError: state.auth.isError
    }
}

export default connect(mapStateToProps, {createUser, loginUser})(Auth);
import React, { useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";

interface ILogin{
    open: boolean,
    handleClose: () => void
}

const Login: React.FunctionComponent<ILogin> = ({open, handleClose}) => {
    const [emailInput, setEmailInput] = useState<string>("");
    const [passwordInput, setPasswordInput] = useState<string>("");
    const [emailInputError, setEmailInputError] = useState<string>("");
    const [passwordInputError, setPasswordInputError] = useState<string>("");

    
    const regularEmail = /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/;
    const regularPassword = /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;

    const handleInputChange = (event: any) => {
        const target = event.target
        const value = target.type === 'checkbox' ? target.checked : target.value
        const name = target.name
        
        switch (name) {
          case 'emailInput':
            setEmailInput(value)
            setEmailInputError("")
            break
          case 'passwordInput':
            setPasswordInput(value)
            setPasswordInputError("")
            break
          default:
    
        }
    }

    const handleForm = () => {
        let error: boolean = false
        if (emailInput === '') {
            setEmailInputError('email is empty!')
            error = true
        }
        if (passwordInput === '') {
            setPasswordInputError('password is empty!')
            error = true
        }
        if (!(emailInput === '') &&!regularEmail.test(emailInput)){
            setEmailInputError('email is not correct!!')
            error = true
        }
        if (!(passwordInput === '') && !regularPassword.test(passwordInput)){
            setPasswordInputError('password is not correct!!')
            error = true
        }
        if(!error)
            handleClose()
    }
    return (
        <Dialog open={open} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title" textAlign="center">Log in</DialogTitle>
            <DialogContent>
                <TextField 
                    autoFocus
                    margin="dense"
                    id="name"
                    label={"Email Adress"}
                    name='emailInput'
                    type="email"
                    onChange={handleInputChange}
                    helperText={emailInputError}
                    error={emailInputError.trim() !== ''}
                    value={emailInput}
                    fullWidth
                />
                <TextField 
                    margin="dense"
                    id="pass"
                    label="Password"
                    name='passwordInput'
                    onChange={handleInputChange}
                    helperText={passwordInputError}
                    error={passwordInputError.trim() !== ''}
                    type="password"
                    value={passwordInput}
                    fullWidth
                />
                <DialogContentText>Don't have account? Click Here!</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} variant="outlined">Cancel</Button>
                <Button onClick={handleForm} variant="contained">Log in</Button>
            </DialogActions>
        </Dialog>
    )
}

export default Login;
import React, { useState } from "react";
import { Alert, Button, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import { ILogin } from "../../types/Auth";

type login = React.FunctionComponent<ILogin & { isRegistry: boolean }>

const Login: login = ({emailInputError, passwordInputError, isRegistry, handleForm, clearError, registry, handleClose}) => {
    const [emailInput, setEmailInput] = useState<string>("");
    const [passwordInput, setPasswordInput] = useState<string>("");


    const handleInputChange = (event: any) => {
        const target = event.target
        const value = target.type === 'checkbox' ? target.checked : target.value
        const name = target.name
        
        switch (name) {
          case 'emailInput':
            setEmailInput(value)
            clearError("emailInputError")
            break
          case 'passwordInput':
            setPasswordInput(value)
            clearError("passwordInputError")
            break
          default:
    
        }
    }

    return (
        <>
            <DialogTitle id="form-dialog-title" textAlign="center">Log in</DialogTitle>
            {isRegistry && <Alert severity="success">Your account has been registered!</Alert>}
            <DialogContent>
                <TextField 
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Email Adress"
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
                <DialogContentText sx={{display: "inline-block"}}>Don't have account?</DialogContentText>
                <Button onClick={registry}>Click Here!</Button>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} variant="outlined">Cancel</Button>
                <Button onClick={() => handleForm(emailInput, passwordInput)} variant="contained">Log in</Button>
            </DialogActions>
        </>
    )
}

export default Login;
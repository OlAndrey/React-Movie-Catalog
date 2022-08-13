import React, { useState } from 'react';
import { Button, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { IRegistry } from '../../types/Auth';

const Registry: React.FunctionComponent<IRegistry> = ({
  nameInputError,
  emailInputError,
  passwordInputError,
  handleForm,
  clearError,
  handleClose,
}) => {
  const [nameInput, setNameInput] = useState<string>('');
  const [emailInput, setEmailInput] = useState<string>('');
  const [passwordInput, setPasswordInput] = useState<string>('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = event;
    const { name, value } = target;

    switch (name) {
      case 'nameInput':
        setNameInput(value);
        clearError('nameInputError');
        break;
      case 'emailInput':
        setEmailInput(value);
        clearError('emailInputError');
        break;
      case 'passwordInput':
        setPasswordInput(value);
        clearError('passwordInputError');
        break;
      default:
    }
  };

  return (
    <>
      <DialogTitle id="form-dialog-title" textAlign="center">
        Registration
      </DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Name"
          name="nameInput"
          type="text"
          onChange={handleInputChange}
          helperText={nameInputError}
          error={nameInputError.trim() !== ''}
          value={nameInput}
          fullWidth
        />
        <TextField
          margin="dense"
          id="email"
          label="Email Adress"
          name="emailInput"
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
          name="passwordInput"
          onChange={handleInputChange}
          helperText={passwordInputError}
          error={passwordInputError.trim() !== ''}
          type="password"
          value={passwordInput}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="outlined">
          Cancel
        </Button>
        <Button
          onClick={() => handleForm(emailInput, passwordInput, nameInput)}
          variant="contained"
        >
          Registry
        </Button>
      </DialogActions>
    </>
  );
};

export default Registry;

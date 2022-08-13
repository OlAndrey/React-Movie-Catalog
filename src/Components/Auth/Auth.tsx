import React, { useEffect, useState } from 'react';
import { Dialog } from '@mui/material';
import { connect } from 'react-redux';
import Login from './Login';
import Registry from './Registry';
import { AuthType, UserType } from '../../types/Auth';
import { AppStatetype } from '../../store/reducers';
import { createUser, loginUser } from '../../store/action-creators/authActionCreators';

type MapStatePropsType = { isCheck: boolean; isError: boolean };

type MapDispatchPropsType = {
  createUser: (name: string, email: string, password: string) => void;
  loginUser: (email: string, password: string) => void;
};

type OwnPropsType = AuthType & { user: UserType };

type PropsType = OwnPropsType & MapStatePropsType & MapDispatchPropsType;

const Auth: React.FC<PropsType> = ({
  open,
  isCheck,
  isError,
  user,
  handleClose,
  createUser,
  loginUser,
}) => {
  const [isNewUser, setIsNewUser] = useState<boolean>(false);
  const [isRegistry, setIsRegistry] = useState<boolean>(false);
  const [nameInputError, setNameInputError] = useState<string>('');
  const [emailInputError, setEmailInputError] = useState<string>('');
  const [passwordInputError, setPasswordInputError] = useState<string>('');

  const regularEmail = /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/;
  const regularPassword = /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;

  const close = () => {
    setIsRegistry(false);
    handleClose();
  };

  useEffect(() => {
    if (isCheck) {
      if (isError) {
        setEmailInputError('email or password is incorrect!!!');
        setPasswordInputError('email or password is incorrect!!!');
      } else {
        // eslint-disable-next-line no-unused-expressions
        user ? close() : setIsRegistry(true);
        setIsNewUser(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCheck, isError]);

  const handleForm = (emailInput: string, passwordInput: string, nameInput?: string) => {
    let error = false;
    if (emailInput === '') {
      setEmailInputError('email is empty!');
      error = true;
    }
    if (passwordInput === '') {
      setPasswordInputError('password is empty!');
      error = true;
    }
    if (!(emailInput === '') && !regularEmail.test(emailInput)) {
      setEmailInputError('email is not correct!!');
      error = true;
    }
    if (!(passwordInput === '') && !regularPassword.test(passwordInput)) {
      setPasswordInputError('password is not correct!!');
      error = true;
    }

    if (!(typeof nameInput === 'string')) {
      if (!error) {
        loginUser(emailInput, passwordInput);
      }
    } else {
      if (nameInput === '') {
        setNameInputError('name is empty!');
        error = true;
      }
      if (!error) {
        createUser(nameInput, emailInput, passwordInput);
      }
    }
    return error;
  };

  const clearError = (value: 'emailInputError' | 'passwordInputError' | 'nameInputError') => {
    switch (value) {
      case 'nameInputError':
        setNameInputError('');
        break;
      case 'emailInputError':
        setEmailInputError('');
        break;
      case 'passwordInputError':
        setPasswordInputError('');
        break;
      default:
    }
  };

  return (
    <Dialog open={open} aria-labelledby="form-dialog-title">
      {isNewUser ? (
        <Registry
          nameInputError={nameInputError}
          emailInputError={emailInputError}
          passwordInputError={passwordInputError}
          handleForm={handleForm}
          clearError={clearError}
          handleClose={() => setIsNewUser(false)}
        />
      ) : (
        <Login
          emailInputError={emailInputError}
          passwordInputError={passwordInputError}
          isRegistry={isRegistry}
          handleForm={handleForm}
          clearError={clearError}
          handleClose={close}
          registry={() => setIsNewUser(true)}
        />
      )}
    </Dialog>
  );
};

const mapStateToProps = (state: AppStatetype): MapStatePropsType => {
  return {
    isCheck: state.auth.isCheck,
    isError: state.auth.isError,
  };
};

export default connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStatetype>(
  mapStateToProps,
  { createUser, loginUser }
)(Auth);

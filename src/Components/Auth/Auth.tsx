/* eslint-disable react/jsx-no-bind */
import React, { useEffect, useState } from 'react';
import { Dialog } from '@mui/material';
import { connect } from 'react-redux';
import { SubmissionError } from 'redux-form';
import Registration from './Registration';
import { AuthType, UserType, formValues } from '../../types/Auth';
import { AppStatetype } from '../../store/reducers';
import { checkAuth, updateAuthError, updateAuth } from '../../store/actions/authAction';
import { auth } from '../../firebase';
import Login from './Login';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';

type MapStatePropsType = { isCheck: boolean; isError: boolean };

type MapDispatchPropsType = {
  checkAuth: () => void;
  updateAuthError: (payload: UserType) => void;
  updateAuth: (payload: UserType) => void;
};

type OwnPropsType = AuthType & { user: UserType };

type PropsType = OwnPropsType & MapStatePropsType & MapDispatchPropsType;

const Auth: React.FC<PropsType> = (props) => {
  const { open, isCheck, isError, user, handleClose, checkAuth, updateAuthError, updateAuth } =
    props;
  const [isNewUser, setIsNewUser] = useState<boolean>(false);
  const [isRegistry, setIsRegistry] = useState<boolean>(false);

  const close = () => {
    setIsRegistry(false);
    handleClose();
  };

  useEffect(() => {
    if (isCheck) {
      if (!isError) {
        // eslint-disable-next-line no-unused-expressions
        user ? close() : setIsRegistry(true);
        setIsNewUser(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCheck, isError]);

  async function registry({ name, password, email }: formValues) {
    try {
      if (!name) {
        throw new SubmissionError({
          name: 'Required',
          _error: 'Registry failed!',
        });
      }
      checkAuth();
      const dataFromServer = await createUserWithEmailAndPassword(auth, email, password);
      if (dataFromServer.user) {
        updateProfile(dataFromServer.user, {
          displayName: name,
        });
      }
      updateAuth(null);
    } catch (error) {
      updateAuthError(null);
      throw new SubmissionError({
        email: 'The email address is already in use by another account',
        _error: 'Registry failed!',
      });
    }
  }

  async function login({ password, email }: formValues) {
    try {
      checkAuth();
      const dataFromServer = await signInWithEmailAndPassword(auth, email, password);
      updateAuth(dataFromServer.user);
    } catch (error) {
      updateAuthError(null);
      throw new SubmissionError({
        password: 'Email or password is incorrect!!!',
        email: 'Email or password is incorrect!!!',
        _error: 'Login failed!',
      });
    }
  }

  return (
    <Dialog open={open} aria-labelledby="form-dialog-title">
      {isNewUser ? (
        <Registration onSubmit={registry} handleClose={() => setIsNewUser(false)} />
      ) : (
        <Login
          isRegistry={isRegistry}
          onSubmit={login}
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
  { checkAuth, updateAuthError, updateAuth }
)(Auth);

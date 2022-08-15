/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Field, reduxForm, InjectedFormProps, WrappedFieldProps } from 'redux-form';
import {
  Alert,
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@mui/material';
import validate from '../../helpers/validateForm';
import { formValues } from '../../types/Auth';

type renderTextFieldType = WrappedFieldProps & { label: string };

const renderTextField: React.FC<renderTextFieldType> = ({
  input,
  label,
  meta: { touched, error },
}) => {
  return (
    <TextField
      margin="dense"
      label={label}
      id={input.name}
      type={label === 'Password' ? 'password' : 'text'}
      fullWidth
      error={touched && Boolean(error)}
      helperText={touched && error}
      {...input}
    />
  );
};

type ownPropsType = {
  isRegistry: boolean;
  registry: () => void;
  handleClose: () => void;
};

const Login: React.FC<InjectedFormProps<formValues, ownPropsType> & ownPropsType> = (props) => {
  const { handleSubmit, registry, handleClose, isRegistry, pristine, submitting } = props;
  return (
    <form onSubmit={handleSubmit}>
      <DialogTitle id="form-dialog-title" textAlign="center">
        Log in
      </DialogTitle>
      {isRegistry && <Alert severity="success">Your account has been registered!</Alert>}
      <DialogContent>
        <Field name="email" component={renderTextField} label="Email" />
        <Field name="password" component={renderTextField} label="Password" />
        <DialogContentText sx={{ display: 'inline-block' }}>
          Don&apos;t have account?
        </DialogContentText>
        <Button onClick={registry}>Click Here!</Button>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={handleClose} disabled={submitting}>
          Cancel
        </Button>
        <Button type="submit" variant="contained" disabled={pristine || submitting}>
          Log in
        </Button>
      </DialogActions>
    </form>
  );
};

export default reduxForm<formValues, ownPropsType>({
  form: 'Login', // a unique identifier for this form
  validate,
})(Login);

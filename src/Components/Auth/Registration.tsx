/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Field, reduxForm, InjectedFormProps, WrappedFieldProps } from 'redux-form';
import { Button, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
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

type ownPropsType = { handleClose: () => void };

const Registration: React.FC<InjectedFormProps<formValues, ownPropsType> & ownPropsType> = (
  props
) => {
  const { handleSubmit, handleClose, pristine, submitting } = props;
  return (
    <form onSubmit={handleSubmit} style={{ width: '100%' }}>
      <DialogTitle id="form-dialog-title" textAlign="center">
        Registration
      </DialogTitle>
      <DialogContent>
        <Field name="name" component={renderTextField} label="Name" />
        <Field name="email" component={renderTextField} label="Email" />
        <Field name="password" component={renderTextField} label="Password" />
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={handleClose} disabled={submitting}>
          Cancel
        </Button>
        <Button type="submit" variant="contained" disabled={pristine || submitting}>
          Registry
        </Button>
      </DialogActions>
    </form>
  );
};

export default reduxForm<formValues, ownPropsType>({
  form: 'Regystry', // a unique identifier for this form
  validate,
})(Registration);

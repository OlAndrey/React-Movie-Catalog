import { formValues } from '../types/Auth';

type fieldType = 'name' | 'password' | 'email';

// eslint-disable-next-line func-names
export default function (values: formValues) {
  const errors = { name: '', password: '', email: '' };
  const requiredFields: Array<fieldType> = ['name', 'password', 'email'];
  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = 'Required';
    }
  });
  if (
    values.password &&
    !/(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/.test(values.password)
  ) {
    errors.password = 'Invalid password';
  }
  if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  return errors;
}

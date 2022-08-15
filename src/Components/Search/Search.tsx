import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { Field, InjectedFormProps, reduxForm, WrappedFieldProps } from 'redux-form';
import { SearchBlock, SearchIconWrapper, StyledInputBase } from './SearchStyle';

type formValues = { search: string };

const renderTextField: React.FC<WrappedFieldProps> = ({ input }) => {
  return (
    <StyledInputBase
      placeholder="Search…"
      id={input.name}
      margin="dense"
      inputProps={{ ...input }}
    />
  );
};

const Search: React.FC<InjectedFormProps<formValues>> = ({ handleSubmit, reset }) => {
  const handler: React.FormEventHandler<HTMLFormElement> = (e) => {
    handleSubmit(e);
    reset();
  };

  return (
    <form onSubmit={handler}>
      <SearchBlock>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <Field name="search" component={renderTextField} label="Search" />
      </SearchBlock>
    </form>
  );
};

export default reduxForm<formValues>({
  form: 'Search',
})(Search);

import React from 'react';
import { FormControl, TextField, InputAdornment } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { Search as SearchIcon } from '@material-ui/icons';
import styles from './index.module.css';

interface IProps { }

export default (props: IProps) => {
  const [selectText, setSelectText] = React.useState('');
  const search = (event: any) => {
    setSelectText(event.currentTarget.value);
  };

  React.useEffect(() => {
    console.log(selectText);
  }, [selectText]);

  const [countries, setCountries] = React.useState([
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
    { title: 'The Dark Knight', year: 2008 },
    { title: '12 Angry Men', year: 1957 },
    { title: "Schindler's List", year: 1993 },
  ]);

  const selectCountryTextField = (params: any) => {
    const inputProps = params.InputProps || {};
    inputProps.startAdornment =
      <InputAdornment position="start">
        <SearchIcon />
      </InputAdornment>
    return (
      <TextField
        {...params} label="Select a country" variant="outlined"
        InputProps={inputProps}
      />
    )
  };

  return (
    <div className={styles.container}>
      <FormControl fullWidth>
        <Autocomplete
          loading
          open={!!selectText}
          options={countries}
          getOptionLabel={(option: any) => option.title}
          renderInput={selectCountryTextField}
          onInputChange={search}
        />
      </FormControl>
    </div>
  );
};

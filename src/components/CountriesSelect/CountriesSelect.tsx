import { Button, createStyles, FormControl, InputAdornment, makeStyles, TextField, Theme } from '@material-ui/core';
import { Search as SearchIcon } from '@material-ui/icons';
import { Autocomplete } from '@material-ui/lab';
import { observer } from 'mobx-react';
import React from 'react';
import Country from '../../models/entries/Country';
import CountriesStore from '../../stores/CountriesStore';
import useStores from '../../stores/UseStores';
import styles from './CountriesSelect.module.css';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    countrySelect: {
      marginTop: theme.spacing(2),
    },
    addCountryButton: {
      marginTop: theme.spacing(2),
    },
  }),
);

interface IProps { }

const CountriesSelect = observer((props: IProps) => {
  const { countriesStore }: { countriesStore: CountriesStore } = useStores();

  const search = (event: any) => {
    const filter = event.currentTarget.value;
    countriesStore.getCountryByName(filter);
  };

  const changeCountry = (event: any, value: Country | null, reason: string) => {
    console.log(value);
  }

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

  const classes = Object.assign({}, useStyles(), styles);
  return (
    <div className={classes.container}>
      <FormControl fullWidth className={classes.countrySelect}>
        <Autocomplete
          loading={!!countriesStore.filter && !countriesStore.countries.length}
          options={countriesStore.countries}
          getOptionLabel={(option: any) => option.name}
          renderInput={selectCountryTextField}
          onInputChange={search}
          onChange={changeCountry}
        />
      </FormControl>
      <FormControl fullWidth className={classes.addCountryButton}>
        <Button disabled variant="contained" color="primary">Add country to list</Button>
      </FormControl>
    </div>
  );
});
export default CountriesSelect;
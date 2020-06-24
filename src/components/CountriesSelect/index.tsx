import React from 'react';
import { FormControl, InputLabel, Input, Icon } from '@material-ui/core';
import styles from './index.module.css';

interface IProps {}

export default (props: IProps) => {
  const search = (countryName: string) => {
    console.log(countryName);
  };

  return (
    <div className={styles.container}>
      <h1>test</h1>
      <FormControl fullWidth>
        <InputLabel htmlFor="standard-adornment-amount">Amount</InputLabel>
        <Input
          id="standard-adornment-amount"
          // value={values.amount}
          // onChange={handleChange('amount')}
          startAdornment={<Icon>Search</Icon>}
        />
      </FormControl>
    </div>
  );
};

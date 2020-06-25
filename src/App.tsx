import { AppBar, createStyles, IconButton, makeStyles, Theme, Toolbar, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { Provider } from 'mobx-react';
import React from 'react';
import styles from './App.module.css';
import CountriesSelect from './components/CountriesSelect/CountriesSelect';
import store from './stores';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    body: {
      padding: theme.spacing(1),
    },
    menuButton: {
      marginLeft: theme.spacing(2),
    },
  }),
);

function App() {
  const ss = useStyles();
  console.log(ss);
  console.log(styles);
  const classes = Object.assign({}, useStyles(), styles);
  return (
    <Provider store={store}>
      <div className={classes.page}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.headerTitle}>Select country to view</Typography>
            <IconButton edge="end" className={classes.menuButton} color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <div className={classes.body}>
          <CountriesSelect />
        </div>
        <footer className={classes.footer}>NM &copy; 2020</footer>
      </div>
    </Provider>
  );
}

export default App;

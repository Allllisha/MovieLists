import React from 'react';
import {  useNavigate, Link } from "react-router-dom";
import Cookies from 'js-cookie';
import { makeStyles } from '@material-ui/core/styles';
import {  useState } from 'react';
import {  signOut, getCurrentUser } from './Auth';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import HeaderDrawer from './HeaderDrawer';
import '../stylesheets/Header.scss';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));



const Header = () => {




  const navigate = useNavigate();
  const handleSignOut = async (e) => {
    try {
      const res = await signOut();
      console.log(res)
      Cookies.remove('_access_token');
      Cookies.remove('_client');
      Cookies.remove('_uid');
      navigate('/sign_in');
      console.log('succeeded in sign out');
    } catch (e) {
      console.log(e);
    }
  };

  const currentUser = getCurrentUser();
  const AuthButtons = () => {
    if ( currentUser) {
      return (
        <Button
          color='inherit'
          className={classes.linkBtn}
          onClick={handleSignOut}
        >
          Sign out
        </Button>
      );
    } else {
      return (
        <>
          <Button
            component={Link}
            to='/sign_in'
            color='inherit'
            className={classes.linkBtn}
          >
            Sign in
          </Button>
          <Button
            component={Link}
            to='/sign_up'
            color='inherit'
            className={classes.linkBtn}
          >
            Sign Up
          </Button>
        </>
      );
    }
  };


  const drawerItem = [
    { label: 'Home', path: '/home' },
    { label: 'Create New Lists', path: `/lists` },
    { label: 'Search Movies', path: '/movies' },
  ];

  const [open, setOpen] = useState(false);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };


  const classes = useStyles();
  return (
    <>
    <div className={classes.root}>
      <AppBar position="static"
      style={{ backgroundColor: "#201133"}}
      >
        <Toolbar>
        { currentUser && (
              <IconButton
                edge='start'
                className={classes.menuButton}
                color='inherit'
                aria-label='menu'
                onClick={handleDrawerToggle}
              >
                <MenuIcon />
              </IconButton>
            )}
            <Typography variant="h6" className={classes.title} id="title"><Link to={`/home`}>
            MovieList
            </Link>
          </Typography>
          <AuthButtons />
        </Toolbar>
      </AppBar>
    </div>
    <HeaderDrawer
    open={open}
    handleDrawerToggle={handleDrawerToggle}
    drawerItem={drawerItem}
  />
  </>
  );
}

export default Header;
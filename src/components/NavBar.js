import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import userTokenContext from '../UserTokenContext';

function NavBar() {

  const useStyles = makeStyles( (theme) =>({
    root: {
      flexGrow: 1,
      justifyContent: "space-between"
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      color: '#bdbdbd',
    }
  }));
  const {userToken, token} = useContext(userTokenContext)
  const classes = useStyles();
  const history = useHistory();

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.clear();
    token();
    history.push('/');
  };
  
  return (
      <AppBar position="sticky">
        <Toolbar className={classes.root}>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" component={RouterLink} to="/">
                <Typography variant="h6">
                    Jobly
                </Typography>
            </IconButton>
            {userToken ? ( 
            <>
              <Typography variant="h6" className={classes.title}>
                  <Button color="inherit" component={NavLink} to="/jobs" activeStyle={{color:'white'}}>Jobs</Button>
                  <Button color="inherit" component={NavLink} to="/companies" activeStyle={{color:'white'}}>Companies</Button>
                  <Button color="inherit" component={NavLink} to="/profile" activeStyle={{color:'white'}}>Profile</Button>
              </Typography>
              <div>
                <Button color="inherit" onClick={handleLogout}>Logout</Button>
              </div>
            </>) : 
            (<div>
              <Button color="inherit" component={RouterLink} to="/login">Login</Button>
              <Button color="inherit" component={RouterLink} to="/signup">Signup</Button>
            </div>)
            }
        </Toolbar>
      </AppBar>

  );
}

export default NavBar;

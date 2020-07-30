import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link as RouterLink } from 'react-router-dom';

function Home({userToken, setToken}) {
    const useStyles = makeStyles({
      root: {
        minWidth: 275,
        color: '#3f51b5'
      },

      title: {
        textAlign: 'center',
        position: 'absolute',
        top: '25%',
        right: '50%',
        transform: 'translateX(50%) translateY(50%)'
      },

      description: {
        marginBottom: 12,
        textAlign: 'center',
      },

      button: {
          margin:"0 .5em"
      }
    });

    const classes = useStyles();

    return (
      <React.Fragment>
        <div className={classes.title}>
            <Typography variant="h2" component="h2" >
                {userToken ? "Jobly" : "Welcome to Jobly!"}
            </Typography>
            <Typography className={classes.description} variant="h6">
                All the jobs in one, convenient place
            </Typography>
            {userToken ? <Typography className={classes.description} variant="h4">
                Welcome back!
            </Typography> :
            <>
            <Button color="primary" variant="contained" className={classes.button} component={RouterLink} to="/login">Login</Button>
            <Button color="primary" variant="contained" className={classes.button} component={RouterLink} to="/signup">Signup</Button> 
            </>
            }
        </div>
      </React.Fragment>
    )
}

export default Home;
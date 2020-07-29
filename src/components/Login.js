import React, { useState, useContext } from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import useInput from '../hooks/useInput';
import JoblyAPI from '../joblyAPI';
import Alert from '@material-ui/lab/Alert';
import userTokenContext from '../UserTokenContext';

function Login() {
    
    const initialState = {
        username: "",
        password: ""
    }

    const [loginForm, setLoginForm] = useInput(initialState)
    const [formError, setFormError] = useState("")

    const history = useHistory();
    const useStyles = makeStyles((theme) => ({
        formRoot: {
          '& .MuiTextField-root': {
            margin: theme.spacing(3),
            width:'50%'
          },
        },

        gridRoot: {
            paddingTop: '64px'
        },

        button: {
            margin: "0 .5em"
        },

        signupAlert: {
            justifyContent: "center",
            marginTop: "24px"
        }

    }));
    
    const classes = useStyles();
    const {token} = useContext(userTokenContext);

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            const request = await JoblyAPI.request('login', loginForm, 'post')
            localStorage.setItem('jobly_token', request.token)
            token(request)
            history.push('/');
        }
        catch (e) {
            setFormError(e[0])
        }
    }
        return (
            <form onSubmit={handleSubmit}>
                {formError && <Alert severity="error" className={classes.signupAlert}>{formError}</Alert>}
                <FormControl className={classes.formRoot} noValidate autoComplete="off" fullWidth>
                    <Grid container justify="center" className={classes.gridRoot}>
                        <TextField label="Username" name="username" value={loginForm.username} onChange={setLoginForm} />
                        <TextField label="Password" name="password" value={loginForm.password} onChange={setLoginForm} type="password" />
                    </Grid>
                    <Grid container justify="center">
                    </Grid>      
                </FormControl>
                <Grid container justify="center">
                    <Button className={classes.button} variant="contained" color="primary" onClick={() => history.goBack()}>Back</Button>
                    <Button className={classes.button} variant="contained" color="primary" type="submit">Submit</Button>
                </Grid>
            </form>
        );
}

export default Login;

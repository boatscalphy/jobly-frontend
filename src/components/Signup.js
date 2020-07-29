import React, { useState, useContext } from 'react'
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import useInput from '../hooks/useInput';
import JoblyApi from '../joblyAPI';
import Alert from '@material-ui/lab/Alert';
import userTokenContext from '../UserTokenContext';

function Signup() {
    const initialState = {
        first_name: "",
        last_name: "",
        photo_url: "",
        email: "",
        username: "",
        password: ""
    }

    const [formError, setFormError] = useState("")

    const [signupForm, setSignupForm] = useInput(initialState)
    const {token} = useContext(userTokenContext)

    const history = useHistory();
    const useStyles = makeStyles((theme) => ({
        formRoot: {
          '& .MuiTextField-root': {
            margin: theme.spacing(3),
            width: '80%',
            alignSelf: 'center',
          },
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
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { first_name, last_name, photo_url, username, email, password } = signupForm
            const request = await JoblyApi.request('users', { first_name, last_name, photo_url, username, email, password }, 'post');
            localStorage.setItem('jobly_token', request);
            token(request)
            history.push("/")
        } catch (e) {
            setFormError(e[0]);
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            {formError && <Alert severity="error" className={classes.signupAlert}>{formError}</Alert>}
            <FormControl className={classes.formRoot} noValidate autoComplete="off" fullWidth>
                <TextField label="First Name" name="first_name" value={signupForm.first_name} onChange={setSignupForm} required/>
                <TextField label="Last Name" name="last_name" value={signupForm.last_name} onChange={setSignupForm} required/>
                <TextField label="E-mail" name="email" value={signupForm.email} onChange={setSignupForm} type="email" required/>
                <TextField label="Photo URL" name="photo_url" value={signupForm.photo_url} onChange={setSignupForm} />
                <TextField label="Username" name="username" value={signupForm.username} onChange={setSignupForm} required/>
                <TextField label="Password" name="password" value={signupForm.password} onChange={setSignupForm} type="password"/>
            </FormControl>
            <Grid container justify="center">
                <Button className={classes.button} variant="contained" color="primary" onClick={() => history.goBack()}>Back</Button>
                <Button className={classes.button} variant="contained" color="primary" type="submit">Submit</Button>
            </Grid>       
        </form>
    )
}

export default Signup;
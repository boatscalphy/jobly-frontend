import React from 'react'
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import useInput from '../hooks/useInput';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography'
import { useHistory } from 'react-router-dom';
import JoblyApi from '../joblyAPI';

export default function UserProfile(props) {

    const history = useHistory()
    const [isLoading, setIsLoading] = React.useState(true)
    const initialState = {
        first_name: props.user.first_name || "",
        last_name: props.user.last_name || "",
        email: props.user.email || "",
        photo_url: props.user.photo_url || "",
        password: ""
    }

    const [loginForm, setLoginForm, resetForm, updateForm] = useInput(initialState)

    const useStyles = makeStyles((theme) => ({
        formRoot: {
          '& .MuiTextField-root': {
            margin: theme.spacing(3),
            width: '100%',
            alignSelf: 'center'
          },
        },

        gridRoot: {
            paddingTop: '64px'
        },

        button: {
            margin: "0 .5em"
        }
    }));
    
    const classes = useStyles();

    function submitUpdate(e) {
        e.preventDefault();
        props.update(props.user.username, loginForm)
        history.push('/');    
    }
    
    React.useEffect(() => {
        console.log(props.user.username);
        updateForm(initialState)
        setIsLoading(false)
    }, [props.user.username])
    if (isLoading) {
        return <div>loading...</div>
    }
    return (
        <Container maxWidth="sm">
            <Typography variant="h4" color="primary" align="center" style={{paddingTop: '24px'}}>Update User Profile ({props.user.username})</Typography>
            <form onSubmit={submitUpdate}>
                <FormControl className={classes.formRoot} noValidate autoComplete="off" fullWidth>
                    <TextField label={`First Name (${props.user.first_name})`} name="first_name" value={loginForm.first_name} onChange={setLoginForm} />
                    <TextField label={`Last Name (${props.user.last_name})`} name="last_name" value={loginForm.last_name} onChange={setLoginForm} />
                    <TextField label={`Email (${props.user.email})`} name="email" value={loginForm.email} onChange={setLoginForm} type="email"/>
                    <TextField label="Photo URL" name="photo_url" value={loginForm.username} onChange={setLoginForm} />
                    <TextField label="Re-enter password" name="password" onChange={setLoginForm} type="password" value={loginForm.password}/>
                    <Button className={classes.button} variant="contained" color="primary" type="submit">Submit</Button>
                </FormControl>    
            </form>
        </Container>
    )
}
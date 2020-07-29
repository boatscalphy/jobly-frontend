import React from 'react'
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import useInput from '../hooks/useInput';

function JoblySearchBar(props) {
    const initialState = {search: ""}
    const [searchForm, setSearchForm, resetForm] = useInput(initialState)

    const useStyles = makeStyles((theme) => ({
        root: {
          padding: '2px 4px',
          display: 'flex',
          alignItems: 'center',
          marginTop: '48px',
        },
        input: {
          marginLeft: theme.spacing(1),
          flex: 1,
        },
        iconButton: {
          padding: 10,
        },
        divider: {
          height: 28,
          margin: 4,
        },
      }));
      
    const classes = useStyles();

    const handleSubmit = (e) => {
      e.preventDefault()
      resetForm();
      props.submit(searchForm);
    }
    
    return (
        <>
            <Grid item xs={12}>
                <Paper component="form" className={classes.root} onSubmit={handleSubmit}>
                    <InputBase
                        className={classes.input}
                        placeholder="Enter search term"
                        inputProps={{ 'aria-label': 'search jobly' }}
                        name="search"
                        value={searchForm.search}
                        onChange={setSearchForm}
                    />
                    <Divider className={classes.divider} orientation="vertical" />
                    <IconButton color="primary" className={classes.iconButton} aria-label="search" type="submit">
                        Search
                    </IconButton>
                </Paper>
            </Grid>
        </>
    );
}

export default JoblySearchBar;
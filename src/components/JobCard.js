import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

export default function JobCard(props) {

    const [jobApplied, setJobApplied] = useState(props.applied)

    const useStyles = makeStyles((theme) => ({
        root: {
            display: 'flex',
            margin: '.75em 0',
            justifyContent: 'space-between'
        },
        details: {
            display: 'flex',
            flexDirection: 'column',
        },
        content: {
            flex: '1 0 auto',
        },
        cover: {
            width: 151,
        },
        linkColor: {
            color: '#3f51b5',
            textDecoration: 'none'
        },
        buttonWidth: {
            width: '100px'
        }
        }));
    const classes = useStyles();
    const handleApply = (e) => {
        props.handleApply(props.id);
        setJobApplied(oldState => !oldState)
    }
    
    if (jobApplied) {
        return (
            <Grid item xs={12}>
            <Card className={classes.root}>
            <div className={classes.details}>
                <CardContent className={classes.content}>
                <Typography variant="h5" className={classes.linkColor}>
                    {props.title}
                </Typography>
                <Typography variant="subtitle1">
                    {`Salary: $${props.salary}`}
                </Typography>
                <Typography variant="subtitle1">
                    {`Equity: ${props.equity}`}
                </Typography>
                </CardContent>
            </div>
                <Button variant="contained" color="secondary" className={classes.buttonWidth}>Unapply</Button>
            </Card>
        </Grid>
        )
    }

    else {
        return (
            <Grid item xs={12}>
                <Card className={classes.root}>
                <div className={classes.details}>
                    <CardContent className={classes.content}>
                    <Typography variant="h5" className={classes.linkColor}>
                        {props.title}
                    </Typography>
                    <Typography variant="subtitle1">
                        {`Salary: $${props.salary}`}
                    </Typography>
                    <Typography variant="subtitle1">
                        {`Equity: ${props.equity}`}
                    </Typography>
                    </CardContent>
                </div>
                    <Button variant="contained" className={classes.buttonWidth} color="primary" onClick={handleApply}>Apply</Button>
                </Card>
            </Grid>
        );
    }
    
}
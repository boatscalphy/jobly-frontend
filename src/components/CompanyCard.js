import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';

export default function CompanyCard(props) {
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
        }
        }));
    const classes = useStyles();

    return (
        <Grid item xs={12}>
            <Card className={classes.root}>
            <div className={classes.details}>
                <CardContent className={classes.content}>
                <Typography component={Link} to={`/companies/${props.handle}`} variant="h5" className={classes.linkColor}>
                    {props.name}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                    {props.description}
                </Typography>
                </CardContent>
            </div>
            <CardMedia
                component="img"
                className={classes.cover}
                src={props.img}
                alt=""
            />
            </Card>
        </Grid>
    );
    }
import React, { useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography'
import JoblySearchBar from './JoblySearchBar';

export default function JoblyLoading() {
    return (
        <Grid container>
            <JoblySearchBar />
            <Typography color="primary" variant="h3" style={{textAlign: "center"}}>Loading...</Typography>
        </Grid>
    )
}
import React, { useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid';
import JoblySearchBar from './JoblySearchBar';
import JobCard from './JobCard';
import { useParams } from 'react-router-dom';
import JoblyAPI from '../joblyAPI';

export default function Company(props) {

    const { handle } = useParams()
    const [company, setCompany] = useState({})
    
    useEffect(() => {
        const getJobs = async () => {
            const company = await JoblyAPI.getCompany(handle);
            setCompany(company);
        }

        getJobs();
    }, [handle])
    const {jobs, name} = company;

    return (
        <Grid container>
            <h1>{name}</h1>
            {jobs ? jobs.map(job => <JobCard key={job.id} title={job.title} salary={job.salary} equity={job.equity} />) : "No Jobs listed"}
        </Grid>
    );

}

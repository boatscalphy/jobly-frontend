import React, { useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography'
import JoblySearchBar from './JoblySearchBar';
import JobCard from './JobCard';
import JoblyLoading from './JoblyLoading';
import JoblyApi from '../joblyAPI';

export default function Jobs(props) {
    
    const [jobFilter, setJobFilter] = useState([]);
    const [allJobs, setAllJobs] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [test, setTest] = useState([])

    useEffect(() => {
        const requestAllJobs = async () => {
            let req = await JoblyApi.request('jobs');
            setAllJobs(req.jobs);
        }
        
        const userApplications = async () => {
            let req = await JoblyApi.getUser();
            console.log(req.jobs);
        }
        requestAllJobs();
        userApplications();
    }, []);

    useEffect(() => {
        setIsLoading(false)
    }, [isLoading])

    const handleSearch = async (search) => {
        if (search.search !== "") {
            const res = await JoblyApi.request('jobs', search);
            setIsLoading(true)
            if (res.jobs.length) {
                setJobFilter(res.jobs);
            }
            else {
                setJobFilter(0)
            }
            
        }
        else {
            setJobFilter([]);
        }
    }

    const handleApply = async (id) => {
        try {
            props.setUserJobs(old => [...old, id])
            setIsLoading(false)
            await JoblyApi.applyJob(id);            
        } catch (e) {
            return e
        }
    } 

    const userAppliedJobIds = props.userJobs;
    const jobCardArray = jobFilter === 0 ? <Typography 
                                                color="primary" 
                                                variant="h4"
                                                align="center"
                                                style={{paddingTop:'24px'}}>
                                                    No jobs found.
                                            </Typography> 
            : jobFilter.length ? (jobFilter.map(job => {
        if (userAppliedJobIds.includes(job.id)) {
            return <JobCard key={job.id} id={job.id} title={job.title} salary={job.id} equity={job.equity} company_handle={job.company_handle} applied={true} />
        }
        else {
            return <JobCard key={job.id} id={job.id} title={job.title} salary={job.id} equity={job.equity} company_handle={job.company_handle} applied={false} handleApply={handleApply} />
        }
    })) :
        (allJobs.map(job => {
            if (userAppliedJobIds.includes(job.id)) {
                return <JobCard key={job.id} id={job.id} title={job.title} salary={job.id} equity={job.equity} company_handle={job.company_handle} applied={true} />
            }
            else {
                return <JobCard key={job.id} id={job.id} title={job.title} salary={job.id} equity={job.equity} company_handle={job.company_handle} applied={false} handleApply={handleApply}/>
            }
        }))

    if (isLoading) {
        return <JoblyLoading />
    }

    else {

        return (
            <Grid container>
                <JoblySearchBar submit={handleSearch}/>
                {jobCardArray}
            </Grid>
        )
    }

}


    // const [isLoading, setIsLoading] = useState(true)
    // const [jobFilter, setJobFilter] = useState(null)
    // const [jobIds, setJobsIds] = useState([])
    // const [jobs, setJobs] = useState([])
    // const handleSearch = async (search) => {
    //     if (search.search === "") {
    //         setJobFilter(jobs)
    //     }
    //     else {
    //         const result = await JoblyApi.request('jobs', search)
    //         const filterJobs = result.jobs.map(job => (<JobCard key={job.id} title={job.title} salary={job.id} equity={job.equity} company_handle={job.company_handle} />))
    //         setJobFilter(filterJobs)
    //     }
    // }

    // useEffect(() => {
    //     const populateUserJob = async () => {
    //         try {
    //             const user = await JoblyApi.getUser();
    //             const userJobs = user.jobs;
    //             const userJobIds = userJobs.map(job => job.id);
    //             console.log(userJobIds);
    //             return userJobIds

    //         } catch (e) {
    //             console.log(e);
    //         }
    //     }
    //     const getAllJobs = async () => {
    //         try {
    //             const allJobs = await JoblyApi.request('jobs');
    //             console.log(allJobs);
    //             return allJobs
    //         } catch (e) {
    //             console.log(e);
    //         }
    //     }
    //     setJobs(getAllJobs);
    //     setJobsIds(populateUserJob);

    //     const allJobs = jobs.map((job) => {
    //         if (jobIds.includes(job.id)){
    //             return (
    //                 <JobCard key={job.id} title={job.title} salary={job.id} equity={job.equity} company_handle={job.company_handle} id={job.id} applied={true} />
    //             )
    //         }
    
    //         return (
    //             <JobCard key={job.id} title={job.title} salary={job.id} equity={job.equity} company_handle={job.company_handle} id={job.id} applied={false} handleApply={handleApply}/>
    //         )
    //     })

    //     setJobs(allJobs);
    //     setIsLoading(false)}, [])

    // const handleApply = async (id) => {
    //     try {
    //         await JoblyApi.applyJob(id);            
    //     } catch (e) {
    //         return e
    //     }
    // } 

    // if (isLoading) {
    //     return <JoblyLoading />
    // }
    
    // return (

    // );
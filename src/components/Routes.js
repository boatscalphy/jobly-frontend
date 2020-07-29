import React, { useEffect, useState, useContext } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './Home.js';
import Login from './Login.js';
import Signup from './Signup.js';
import Companies from './Companies';
import Company from './Company';
import Container from '@material-ui/core/Container';
import UserProfile from './UserProfile';
import Jobs from './Jobs';
import JoblyAPI from '../joblyAPI';
import UserTokenContext from '../UserTokenContext.js';

export default function Routes() {
    
    const [companies, setCompanies] = useState({companies: []})
    const [jobs, setJobs] = useState({jobs: []});
    const [loggedInUser, setLoggedInUser] = useState({jobs:[]})
    const [userJobs, setUserJobs] = useState([]);
    const { userToken, token } = useContext(UserTokenContext);
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        const getCompanies = async () => {
          const companies = await JoblyAPI.request('companies')
          setCompanies(() => {
              return companies
          });
        }
        
        const getUser = async () => {
            const user = await JoblyAPI.getUser()
            setLoggedInUser(user);
            setUserJobs([...user.jobs.map(job=>job.id)]);            
        }
        
        const getJobs = async () => {
          const jobs = await JoblyAPI.request('jobs')
          setJobs( () => {
              return jobs
          })
        }

        if (userToken) {
            getCompanies();
            getJobs();
            getUser();
        }

        setIsLoading(false)
    },[userToken, userJobs.jobs])
    console.log(jobs);
    const updateUser = async (username, data) => {
        try {
            const res = await JoblyAPI.request(`users/${username}`, data, 'patch')
            setLoggedInUser(oldUser => {return ({...oldUser, ...res.user})})
        } catch (e) {
            console.log(e);
        }
    }

    if (isLoading) {
        return "Loading"
    }
    return (
        <Switch>
            <Route exact path="/">
                <Container maxWidth="xl">
                    <Home userToken={userToken} setToken={token}/>
                </Container>
            </Route>

            <Route exact path="/jobs">
                <Container maxWidth="lg">
                    <Jobs jobs={jobs} user={loggedInUser} userJobs={userJobs} setUserJobs={setUserJobs}/>
                </Container>
            </Route>

            <Route exact path="/companies">
                <Container maxWidth="lg">
                    <Companies companies={companies} />
                </Container>
            </Route>

            <Route path="/companies/:handle">
                <Container maxWidth="lg">
                    <Company />
                </Container>
            </Route>

            <Route exact path="/profile">
                <Container maxWidth="lg">
                    <UserProfile user={loggedInUser} update={updateUser}/>
                </Container>
            </Route>

            <Route exact path="/login">
                <Login />
            </Route>

            <Route exact path="/signup">
                <Container maxWidth="lg">
                    <Signup />
                </Container>
            </Route>

            <Route path="/">
                <p>Not Found</p>
            </Route>
        </Switch>
    )
}
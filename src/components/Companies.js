import React, { useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography'
import JoblySearchBar from './JoblySearchBar';
import CompanyCard from './CompanyCard';
import JoblyLoading from './JoblyLoading';
import JoblyApi from '../joblyAPI';

function Companies(props) {

    const [companyFilter, setCompaniesFilter] = useState(null)
    const handleSearch = async (search) => {
        if (search.search === "") {
            setCompaniesFilter(companies)
        }
        else {
            const result = await JoblyApi.request('companies', search)
            const filterCompanies = result.companies.map(company => (<CompanyCard key={company.handle} name={company.name} description={company.description} handle={company.handle} img={company["logo_url"]} />))
            setCompaniesFilter(filterCompanies)
        }
    }
    const companies = props.companies.companies.map((company) => {
        return (
            <CompanyCard key={company.handle} name={company.name} description={company.description} handle={company.handle} img={company["logo_url"]} />
        )
    })
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setIsLoading(false);
    },[])
   
    if (isLoading) {
        return <JoblyLoading />
    }

    return (
        <Grid container>
            <JoblySearchBar submit={handleSearch}/>
            {companyFilter === null ? companies : 
                companyFilter.length ? 
                    companyFilter : 
                        <Typography 
                            color="primary" 
                            variant="h4"
                            align="center"
                            style={{paddingTop:'24px'}}>
                                No companies found.
                        </Typography>}
        </Grid>
    );

}

export default Companies;
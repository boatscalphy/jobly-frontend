import axios from 'axios';

class JoblyApi {
    static async request(endpoint, paramsOrData = {}, verb = "get") {
      paramsOrData._token = localStorage.getItem('jobly_token');
  
      console.debug("API Call:", endpoint, paramsOrData, verb);
  
      try {
        return (await axios({
          method: verb,
          url: `${process.env.REACT_APP_BASE_URL}${endpoint}` || `http://localhost:3001/${endpoint}`,
          [verb === "get" ? "params" : "data"]: paramsOrData})).data;
          // axios sends query string data via the "params" key,
          // and request body data via the "data" key,
          // so the key we need depends on the HTTP verb
      }
  
      catch(err) {
        console.error("API Error:", err.response);
        let message = err.response.data.message;
        throw Array.isArray(message) ? message : [message];
      }
    }
  
    static async getCompany(handle) {
      let res = await this.request(`companies/${handle}`);
      return res.company;
    }

    static async applyJob(id) {
      let res = await this.request(`jobs/${id}/apply`, {}, 'post')
      return res
    }

    static async getUser() {
      try {
        return (await this.request('user', {}, 'post'))
      } catch (e) {
        return e
      }
    }
}

export default JoblyApi
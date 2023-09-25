import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 *
 */

class JoblyApi {
  // the token for interacting with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    // passing authorization token through the header
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = method === "get" ? data : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Get current user details. */
  // {username} => {username, first_name, last_name, email, is_Admin, applications}
  static async getCurrUser(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  /** Get details on a company by handle. */
  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  /** Get all companies, filter by name if not undefined. */
  static async getCompanies(name) {
    let res = await this.request(`companies`, { name });
    return res.companies;
  }

  /** Get list of jobs and filter by title if not undefined. */
  static async getJob(id) {
    let res = await this.request(`jobs/${id}`);
    return res.job;
  }

  /** Get list of jobs and filter by title if not undefined. */
  static async getJobs(title) {
    let res = await this.request(`jobs`, { title });
    return res.jobs;
  }

  /** Apply to job w/ jobID. */
  static async applyToJob(username, jobId) {
    await this.request(`users/${username}/jobs/${jobId}`, {}, "post");
  }

  /** User login. { username, password } => { token }. */
  static async login(data) {
    let res = await this.request(`auth/token`, data, "post");
    return res.token;
  }

  /** User signup. { username, password, firstName, lastName, email } => { token }. */
  static async signup(data) {
    let res = await this.request(`auth/register`, data, "post");
    return res.token;
  }

  /** Update user profile.
   * { firstName, lastName, password, email } =>
   * { username, firstName, lastName, email, isAdmin }. */
  static async updateProfile(username, data) {
    let res = await this.request(`users/${username}`, data, "patch");
    return res.user;
  }
}

export default JoblyApi;

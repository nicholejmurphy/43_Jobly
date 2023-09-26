import React, { useEffect, useState } from "react";
import JoblyApi from "../api/api";
import SearchForm from "../common/SearchForm";
import JobCardList from "./JobCardList";

/** Shows a list of all jobs
 *
 * - Saves jobs as state
 * - Passes 'search()' to SearchForm which allows
 *   usesrs to filter job list by title
 */
function JobList() {
  const [jobs, setJobs] = useState(null);

  useEffect(() => {
    function getJobsOnMount() {
      search();
    }
    getJobsOnMount();
  }, []);

  async function search(title) {
    const jobsRes = await JoblyApi.getJobs(title);
    setJobs(jobsRes);
  }

  if (!jobs) return <></>;

  return (
    <div className="JobList container rounded shadow">
      <div className="bg-dark p-3 m-3 rounded shadow">
        <h2 className="text-light display-4">Job Listings</h2>
      </div>
      <SearchForm search={search} />

      {jobs.length ? (
        <JobCardList jobs={jobs} />
      ) : (
        <p className="text-dark ml-3 h1">
          Sorry, no jobs were found with that title.
        </p>
      )}
    </div>
  );
}

export default JobList;

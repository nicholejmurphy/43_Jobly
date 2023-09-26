import React, { useContext, useState, useEffect } from "react";
import UserContext from "../auth/UserContext";
import JobCardList from "../jobs/JobCardList";
import JoblyApi from "../api/api";

/** Shows a list of all jobs for a user has applied for.
 * - Passes applications list to JobCardList
 *
 */
function Applications() {
  const { applicationIds } = useContext(UserContext);
  const [jobs, setJobs] = useState(null);

  useEffect(() => {
    async function getJobsOnMount() {
      const promiseArray = [];
      applicationIds.forEach((id) => {
        promiseArray.push(JoblyApi.getJob(id));
      });
      let res = await Promise.all(promiseArray);
      setJobs(res);
    }
    getJobsOnMount();
  }, [applicationIds]);

  if (!jobs) return <></>;

  return (
    <div className="Applications  container rounded shadow">
      <div className="bg-dark p-3 m-3 rounded shadow">
        <h2 className="text-light display-4">Your active job applications</h2>
      </div>
      <JobCardList jobs={jobs} />
    </div>
  );
}

export default Applications;

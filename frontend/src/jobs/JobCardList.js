import React from "react";
import JobCard from "./JobCard";

/** List of all job cards from jobs in JobList
 *
 */
function JobCardList({ jobs }) {
  return (
    <div className="JobCardList">
      {jobs.map((job) => (
        <JobCard
          key={job.id}
          id={job.id}
          title={job.title}
          salary={job.salary}
          equity={job.equity}
          companyName={job.companyName}
          companyHandle={job.companyHandle}
        />
      ))}
    </div>
  );
}

export default JobCardList;

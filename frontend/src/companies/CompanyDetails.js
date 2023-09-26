import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import JoblyApi from "../api/api";
import JobCardList from "../jobs/JobCardList";

/** Shows a list of all jobs for a company.
 *
 * - Gets company details from JoblyApi
 * - Saves company as state
 * - Passes company jobs > JobCardList
 */
function CompanyDetails() {
  const [company, setCompany] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { handle } = useParams();

  useEffect(() => {
    async function getCompanyOnMount() {
      const company = await JoblyApi.getCompany(handle);
      setCompany(company);
      setIsLoading(false);
    }
    setIsLoading(true);
    getCompanyOnMount();
  }, [handle]);

  if (isLoading) return;

  return (
    <div className="CompanyDetails">
      <div className="bg-dark p-3 m-3 rounded shadow">
        <h5 className="text-light">Job Listings for:</h5>
        <h1 className="text-light">{company.name}</h1>
        <p className="lead text-light">{company.description}</p>
      </div>
      <JobCardList jobs={company.jobs} />
    </div>
  );
}

export default CompanyDetails;

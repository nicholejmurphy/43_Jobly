import React, { useContext, useState, useEffect } from "react";
import { Button } from "reactstrap";
import UserContext from "../auth/UserContext";
import { Link } from "react-router-dom/cjs/react-router-dom";
import "./JobCard.css";

/** Shows details about an individual job
 *  Allows user to apply for job
 *  - Route: "/companies/:handle"
 */
function JobCard({ id, title, salary, equity, companyName, companyHandle }) {
  const { hasApplied, applyToJob } = useContext(UserContext);
  const [applied, setApplied] = useState();

  // Check if user has applied to the job
  useEffect(() => {
    setApplied(hasApplied(id));
  }, [id, hasApplied]);

  async function handleApply(e) {
    if (hasApplied(id)) return;
    applyToJob(id);
    setApplied(true);
  }

  return (
    <div className="JobCard bg-light rounded shadow p-3 m-3">
      <h2>{title}</h2>
      <hr className="w-25 ml-0" />

      <Link to={`/companies/${companyHandle}`}>
        <h5>{companyName}</h5>
      </Link>
      <p className="mb-0 mt-2">Salary: ${salary}</p>
      <p className="mt-0">Equity: {equity || "N/A"}</p>
      <div className="JobCard-apply">
        <Button
          className="bg-success m-2"
          onClick={handleApply}
          disabled={applied}
        >
          {applied ? "Applied" : "Apply"}
        </Button>
      </div>
    </div>
  );
}

export default JobCard;

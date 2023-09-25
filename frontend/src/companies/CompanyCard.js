import React from "react";
import { Link } from "react-router-dom";

/** Shows details about an individual company
 *  Links to Company details page
 *  - Route: "/companies/:handle"
 */
function CompanyCard({ handle, name, numEmployees, description, logoUrl }) {
  return (
    <div className="CompanyCard bg-light rounded shadow p-3 m-3">
      <Link to={`/companies/${handle}`}>
        <h2>{name}</h2>
      </Link>
      <hr className="w-25 ml-0" />
      <p className="lead">{description}</p>
      <p>
        Number of employees:{" "}
        <span className="badge badge-info">{numEmployees}</span>
      </p>
    </div>
  );
}

export default CompanyCard;

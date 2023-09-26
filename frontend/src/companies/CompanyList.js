import React, { useEffect, useState } from "react";
import JoblyApi from "../api/api";
import SearchForm from "../common/SearchForm";
import CompanyCard from "./CompanyCard";

/** Shows a list of all companies
 *
 * - Saves companies as state
 * - Passes 'search()' to SearchForm which allows
 *   usesrs to filter company list by name
 */
function CompanyList() {
  const [companies, setCompanies] = useState(null);

  useEffect(function getCompaniesOnMount() {
    search();
  }, []);

  async function search(name) {
    let companies = await JoblyApi.getCompanies(name);
    setCompanies(companies);
  }

  if (!companies) return <></>;

  return (
    <div className="CompanyList">
      <div className="bg-dark p-3 m-3 rounded shadow">
        <h2 className="text-light display-4">Companies</h2>
      </div>
      <SearchForm search={search} />
      {companies.length ? (
        <div className="CompanyList-list">
          {companies.map((company) => (
            <CompanyCard
              key={company.handle}
              handle={company.handle}
              name={company.name}
              description={company.description}
              numEmployees={company.numEmployees}
              logoUrl={company.logoUrl}
            />
          ))}
        </div>
      ) : (
        <p className="text-light h1">Sorry, no results were found.</p>
      )}
    </div>
  );
}

export default CompanyList;

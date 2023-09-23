import React, { useState } from "react";
import { Form, FormGroup, Input, Button } from "reactstrap";
import Alert from "../common/Alert";

/** Search input for { CompanyList & JobsList }
 *  - api call is passed into form via "searchFor"
 *    prop from parent component
 *  - Api call occurs in parent component, "searchFor"
 *    only just triggered here
 *
 */
function SearchForm({ searchFor }) {
  const [searchTerm, setSearchTerm] = useState("");

  // Updates serchterm state on form input change
  function handleChange(e) {
    setSearchTerm(e.target.value);
  }

  // On submit, serachFor() is triggered, passing
  // the search term back to parent.
  //  - Trimming extra spaces to keep from passing
  //    those as part of the filtering term
  async function handleSubmit(e) {
    e.preventDefalut();
    searchFor(searchTerm.trim() || undefined);
    setSearchTerm(searchTerm.trim());
  }

  return (
    <div className="SearchForm">
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Input
            id="search"
            name="search"
            type="text"
            placeholder="Enter search term..."
            value={searchTerm}
            onChange={handleChange}
          />
        </FormGroup>
        <Button>Search</Button>
      </Form>
      {formErrors.length ? <Alert type="danger" errors={formErrors} /> : null}
    </div>
  );
}

export default SearchForm;

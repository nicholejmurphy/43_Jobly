import React, { useState } from "react";
import { Form, Row, Col, Input, Button } from "reactstrap";

/** Search input for { CompanyList & JobsList }
 *  - api call is passed into form via "searchFor"
 *    prop from parent component
 *  - Api call occurs in parent component, "searchFor"
 *    only just triggered here
 *
 */
function SearchForm({ search }) {
  const [searchTerm, setSearchTerm] = useState("");

  // Updates serchterm state on form input change
  function handleChange(e) {
    setSearchTerm(e.target.value);
  }

  // On submit, serach() is triggered, passing
  // the search term back to parent.
  //  - Trimming extra spaces to keep from passing
  //    those as part of the filtering term
  async function handleSubmit(e) {
    e.preventDefault();
    search(searchTerm.trim() || undefined);
    setSearchTerm(searchTerm.trim());
  }

  return (
    <div className="SearchForm mb-4 mt-4 ml-3 vw-100">
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col>
            <Input
              className="shadow"
              id="search"
              name="search"
              type="text"
              placeholder="Enter search term..."
              value={searchTerm}
              onChange={handleChange}
            />
          </Col>
          <Col>
            {" "}
            <Button className="bg-info shadow">Search</Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default SearchForm;

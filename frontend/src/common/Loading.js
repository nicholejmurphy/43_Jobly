import React from "react";
import "./Loading.css";

function Loading() {
  return (
    <div className="Loading rounded shadow">
      <p className="h2">
        <span
          className="Loading-spinner spinner-grow spinner-grow-sm"
          role="status"
          aria-hidden="true"
        ></span>{" "}
        Loading . . .{" "}
      </p>
    </div>
  );
}

export default Loading;

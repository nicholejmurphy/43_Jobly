import React from "react";
import "./Loading.css";

function Loading() {
  return (
    <div className="Loading">
      <p className="display-3">
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

import React from "react";

/** Alert Component shows error messages from a variety of components.
 *  - renders with "type" { success, danger, warning }
 *    which controls the color of alert
 *  - errors maps through to show each error message
 */
function Alert({ type, errors }) {
  return (
    <div>
      {errors.map((e) => (
        <p className={type}>e</p>
      ))}
    </div>
  );
}

export default Alert;

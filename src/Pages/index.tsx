import React from "react";
import { Plus } from "react-feather";

const index = () => {
  return (
    <div className="container-fluid p-5">
      <div id="header" className="d-flex justify-content-between ">
        <div>
          <h3>Invoices</h3>
        </div>
        <button className="btn btn-primary">
          <Plus /> Create new Invoice
        </button>
      </div>
      <div className="p-4 border mt-5 rounded">invoices</div>
    </div>
  );
};

export default index;

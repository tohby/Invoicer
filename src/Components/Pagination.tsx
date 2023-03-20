import React from "react";

const Pagination = () => {
  return (
    <div className="mt-4">
      <nav>
        <ul className="pagination">
          <li className="page-item">
            <button type="button" className="page-link">
              Previous
            </button>
          </li>
          <li className="page-item">
            <button type="button" className="page-link">
              1
            </button>
          </li>
          <li className="page-item">
            <button type="button" className="page-link">
              2
            </button>
          </li>
          <li className="page-item">
            <button type="button" className="page-link">
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;

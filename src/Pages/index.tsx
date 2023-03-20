import React, { useState, useEffect } from "react";
import { Plus } from "react-feather";
import { useHistory } from "react-router-dom";
import { useQuery } from "react-query";
import { fetchInvoices } from "../Services";
import Pagination from "react-js-pagination";
// import Pagination from "../Components/Pagination";

const index = () => {
  const history = useHistory();
  const authToken = localStorage.getItem("access_token");
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState("");

  if (!authToken) {
    history.push("/login");
  }

  const { data, isLoading, isFetching, isError, error } = useQuery(
    ["invoices", page],
    () => fetchInvoices({ page, filter }),
    { keepPreviousData: true }
  );

  const handlePageChange = (num: number) => {
    setPage(num);
  };

  const handlePageFilter = (_filter: string) => {
    setFilter(_filter);
  };

  return (
    <div className="container-fluid p-5">
      <div id="header">
        <div className="row">
          <div className="col-lg-8">
            <h3>Invoices</h3>
          </div>
          <div className="col-lg-2">
            <select
              className="form-select"
              aria-label="Default select example"
              onChange={(e) => handlePageFilter(e.target.value)}
            >
              <option selected>Filter by status</option>
              <option value="overdue">Overdue</option>
              <option value="due">Due</option>
              <option value="paid">Paid</option>
            </select>
          </div>
          <div className="col-lg-2">
            <button className="btn btn-primary">
              <Plus /> Create new Invoice
            </button>
          </div>
        </div>
      </div>

      {isLoading ? (
        "loading"
      ) : isError ? (
        <div>An error occured</div>
      ) : (
        <div className="p-4 mt-5">
          {isFetching ? <span> Loading...</span> : null}{" "}
          <ul className="list-group">
            {data.data.map((invoice: any, i: number) => {
              return (
                <li className="list-group-item" key={i}>
                  <div className="row">
                    <div className="col-md-4">
                      <div className="text-wrap">
                        {invoice.invoiceNumber.substring(0, 20)}
                      </div>
                    </div>
                    <div className="col-md-2">
                      <span className="badge rounded-pill text-bg-primary">
                        {invoice.status[0].key}
                      </span>
                    </div>
                    <div className="col-md-2">
                      <span className="bold">${invoice.totalAmount}</span>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
          <div className="mt-4 clearfix float-end">
            <Pagination
              activePage={page}
              itemsCountPerPage={20}
              totalItemsCount={data.paging.totalRecords}
              pageRangeDisplayed={5}
              onChange={(e) => handlePageChange(e)}
              itemClass="page-item"
              linkClass="page-link"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default index;

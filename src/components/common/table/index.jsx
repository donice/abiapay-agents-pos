"use client";
import React, { useState } from "react";
import Pagination from "./pagination";
// import "./style.scss" // Moved to _app;
import { MdOutlineManageSearch } from "react-icons/md";
var Table = function (_a) {
    var data = _a.data;
    var _b = useState(1), currentPage = _b[0], setCurrentPage = _b[1];
    var itemsPerPage = useState(10)[0]; // Number of items per page
    var _c = useState(""), filter = _c[0], setFilter = _c[1];
    var handleFilterChange = function (e) {
        setFilter(e.target.value);
    };
    var filteredData = data.filter(function (item) {
        return Object.values(item).some(function (val) {
            return val === null || val === void 0 ? void 0 : val.toString().toLowerCase().includes(filter.toLowerCase());
        });
    });
    var indexOfLastItem = currentPage * itemsPerPage;
    var indexOfFirstItem = indexOfLastItem - itemsPerPage;
    var currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
    var paginate = function (pageNumber) { return setCurrentPage(pageNumber); };
    return (<div className="custom-table">
      <div className="filter">
        <MdOutlineManageSearch className="filter_icon"/>
        <input type="text" placeholder="Filter by name or email" value={filter} onChange={handleFilterChange}/>
      </div>

      <figure>
        <table>
          <thead>
            <tr>
              {/* Adjust table headers according to your data */}
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map(function (item, index) { return (<tr key={index}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
              </tr>); })}
          </tbody>
        </table>
      </figure>

      <Pagination itemsPerPage={itemsPerPage} totalItems={filteredData.length} paginate={paginate} currentPage={currentPage}/>
    </div>);
};
export default Table;

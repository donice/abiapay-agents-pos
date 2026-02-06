import React from 'react';
var Pagination = function (_a) {
    var itemsPerPage = _a.itemsPerPage, totalItems = _a.totalItems, paginate = _a.paginate, currentPage = _a.currentPage;
    var pageNumbers = [];
    for (var i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
        pageNumbers.push(i);
    }
    return (<nav>
      <ul className="pagination">
        {pageNumbers.map(function (number) { return (<li key={number} className={"page-item ".concat(number === currentPage ? 'active' : '')}>
            <span onClick={function () { return paginate(number); }} className="page-link">
              {number}
            </span>
          </li>); })}
      </ul>
    </nav>);
};
export default Pagination;

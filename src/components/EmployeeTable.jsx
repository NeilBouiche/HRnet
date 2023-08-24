import React from "react";
import {
  useTable,
  useGlobalFilter,
  useSortBy,
  usePagination,
} from "react-table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortUp, faSortDown } from "@fortawesome/free-solid-svg-icons";

const EmployeeTable = ({ data, setShowTable }) => {
  console.log(data);
  const columns = React.useMemo(
    () => [
      { Header: "First Name", accessor: "firstName", sortType: "basic" },
      { Header: "Last Name", accessor: "lastName", sortType: "basic" },
      { Header: "Start Date", accessor: "startDate", sortType: "datetime" },
      { Header: "Department", accessor: "department", sortType: "basic" },
      {
        Header: "Date of Birth",
        accessor: "dateOfBirth",
        sortType: "datetime",
      },
      { Header: "Street", accessor: "street", sortType: "basic" },
      { Header: "City", accessor: "city", sortType: "basic" },
      { Header: "State", accessor: "state", sortType: "basic" },
      { Header: "Zip Code", accessor: "zipCode", sortType: "basic" },
    ],
    []
  );

  // Custom sorting function for date columns
  const dateSortMethod = (rowA, rowB, columnId) => {
    const dateA = new Date(rowA.values[columnId]);
    const dateB = new Date(rowB.values[columnId]);

    return dateA.getTime() - dateB.getTime();
  };

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    setGlobalFilter,
    pageOptions,
    page,
    gotoPage,
    setPageSize,
    pageCount,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    state: { pageIndex, pageSize, globalFilter },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 10 },
      sortTypes: {
        datetime: dateSortMethod,
      },
    },
    useGlobalFilter, // Hook for global search
    useSortBy, // Hook for sorting
    usePagination
  );

  return (
    <div className="table-container">
      <h2 id="employee-list-title">Current Employees</h2>
      {/* Global Filter */}
      <div className="table-center-elem">
        <input
          id="globalSearch"
          value={globalFilter || ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
          placeholder="Recherche..."
        />
      </div>
      <table
        {...getTableProps()}
        style={{ width: "100%", borderCollapse: "collapse" }}
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr
              {...headerGroup.getHeaderGroupProps()}
              style={{
                borderBottom: "1px solid black",
                background: "#334662",
                height: "40px",
                textAlign: "left",
                color: "white",
              }}
            >
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  style={{
                    padding: "8px",
                  }}
                >
                  {column.render("Header")}
                  {/* Display sorting icon */}
                  <span>
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <FontAwesomeIcon icon={faSortDown} />
                      ) : (
                        <FontAwesomeIcon icon={faSortUp} />
                      )
                    ) : (
                      ""
                    )}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, rowIndex) => {
            prepareRow(row);
            return (
              <tr
                {...row.getRowProps()}
                style={{
                  background: rowIndex % 2 === 0 ? "transparent" : "#efefef",
                  borderBottom: "1px solid black",
                }}
              >
                {row.cells.map((cell) => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      style={{
                        padding: "8px",
                        textAlign: "left",
                      }}
                    >
                      {cell.column.id === "dateOfBirth" ||
                      cell.column.id === "startDate"
                        ? new Date(cell.value).toLocaleDateString()
                        : cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      {/* Pagination */}
      <div className="table-center-elem">
        <button
          className="back-button"
          onClick={() => gotoPage(0)}
          disabled={!canPreviousPage}
        >
          {"<<"}
        </button>
        <button
          className="back-button"
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
        >
          Précédent
        </button>
        <span>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>
        </span>

        <button
          className="back-button"
          onClick={() => nextPage()}
          disabled={!canNextPage}
        >
          Suivant
        </button>
        <button
          className="back-button"
          onClick={() => gotoPage(pageCount - 1)}
          disabled={!canNextPage}
        >
          {">>"}
        </button>
      </div>
      {/* Page Size Selector */}
      <div className="table-center-elem table-footer">
        <select
          className="pagination-select"
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[5, 10, 20, 40, 50].map((pageSize) => (
            <option
              className="pagination-option"
              key={pageSize}
              value={pageSize}
            >
              {pageSize}
            </option>
          ))}
        </select>
        <button className="back-button" onClick={() => setShowTable(false)}>
          Close
        </button>
      </div>
    </div>
  );
};

export default EmployeeTable;

import React, { useState, useEffect, useMemo } from "react";
import {
  useTable,
  useSortBy,
  usePagination,
  useGlobalFilter,
  useFlexLayout,
  useResizeColumns,
} from "react-table";
import { GlobalFilter } from "./GlobalFilter";

const defaultPropGetter = () => ({});

const ReactTable = ({
  initialState,
  data,
  columns,
  isSortable,
  isResizable,
  defaultColumn,
  getHeaderProps = defaultPropGetter,
  getColumnProps = defaultPropGetter,
  getRowProps = defaultPropGetter,
  getCellProps = defaultPropGetter,
}) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    gotoPage,
    state,
    setGlobalFilter,
    pageCount,
    setPageSize
  } = useTable(
    {
      data,
      columns,
      defaultColumn,
      autoResetPage: false,
      autoResetSortBy: false,
      autoResetGlobalFilter: false,
      initialState: { ...initialState, pageSize: 5 }
    },
    useResizeColumns,
    useGlobalFilter,
    useSortBy,
    usePagination,
    useFlexLayout
  );

  const { pageIndex, globalFilter, pageSize } = state;
  return (
    <>
      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      <div className="react-table">
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps([
                      {
                        className: column.className,
                        style: column.style,
                      },
                      getColumnProps(column),
                      getHeaderProps(column),
                    ])}
                  >
                    <span {...column.getSortByToggleProps()}>
                      {column.render("Header")}
                      <span>
                        {column.isSorted
                          ? column.isSortedDesc
                            ? " ↓ "
                            : " ↑ "
                          : ""}
                      </span>
                    </span>
                    {isResizable ? (
                      <div
                        {...column.getResizerProps()}
                        className="resizer"
                      ></div>
                    ) : null}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps(getRowProps(row))}>
                  {row.cells.map((cell) => {
                    return (
                      <td
                        {...cell.getCellProps([
                          {
                            className: cell.column.className,
                            style: cell.column.style,
                          },
                          getColumnProps(cell.column),
                          getCellProps(cell),
                        ])}
                      >
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="indexation">
        <span>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>
        </span>
        <select value={pageSize} onChange={e => setPageSize(Number(e.target.value))}>
          {
            [5, 10, 25].map(pageSize => (
              <option key={pageSize} value={pageSize}>
                Afficher {pageSize}
              </option>
            ))
          }
        </select>
        <button style={{ padding: "5px" }} onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {" << "}
        </button>
        <button style={{ padding: "5px" }} onClick={() => previousPage()} disabled={!canPreviousPage}>
          Précédent
        </button>
        <button style={{ padding: "5px" }} onClick={() => nextPage()} disabled={!canNextPage}>
          Suivant
        </button>
        <button style={{ padding: "5px" }} onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {" >> "}
        </button>
      </div>
    </>
  );
};

export default ReactTable;

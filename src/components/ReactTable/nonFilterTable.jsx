import React, { useState, useEffect, useMemo } from "react";
import {
  useTable,
  useSortBy,
  usePagination,
  useFlexLayout,
  useResizeColumns,
} from "react-table";


const defaultPropGetter = () => ({});

const ReactTableNonFiltered = ({
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
    pageCount,
  } = useTable(
    {
      data,
      columns,
      defaultColumn,
      autoResetPage: false
      // manualPagination: true,
    },
    useResizeColumns,
    useSortBy,
    usePagination,
    useFlexLayout
  );

  const { pageIndex } = state;

  return (
    <>
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
      <div>
        <span>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>
        </span>
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

export default ReactTableNonFiltered;

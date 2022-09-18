import React from "react";
import "../styles/App.scss";

export interface Props {
  page: number;
  totalPages: number;
  handlePagination: (page: number) => void;
}

export const PaginationComponent: React.FC<Props> = ({
  page,
  totalPages,
  handlePagination,
}) => {
  return (
    <div className="pagination">
      <div className="paginationWrapper">
        {page !== 1 && (
          <button
            onClick={() => handlePagination(page - 1)}
            type="button"
            className="btn"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="btn--icon"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>{" "}
          </button>
        )}
        <button
          onClick={() => handlePagination(1)}
          type="button"
          className="pageItem"
        >
          {1}
        </button>
        {page > 3 && <div className="separator">...</div>}
        {page === totalPages && totalPages > 3 && (
          <button
            onClick={() => handlePagination(page - 2)}
            type="button"
            className="pageItem"
          >
            {" "}
            {page - 2}
          </button>
        )}
        {page > 2 && (
          <button
            onClick={() => handlePagination(-1)}
            type="button"
            className="pageItem"
           
          >
            {" "}
            {-1}
          </button>
        )}
        {page !== 1 && page !== totalPages && (
          <button
            onClick={() => handlePagination(page)}
            type="button"
            className="pageItem active"
          >
            {" "}
            {page}
          </button>
        )}
        {page < totalPages - 1 && (
          <button
            onClick={() => handlePagination(page + 1)}
            type="button"
            className="pageItem"
          >
            {" "}
            {page + 1}
          </button>
        )}
        {page === 1 && totalPages > 3 && (
          <button
            onClick={() => handlePagination(page + 2)}
            type="button"
            className="pageItem"
          >
            {page + 2}
          </button>
        )}
        {page < totalPages - 2 && <div className="separator">...</div>}
        <button
          onClick={() => handlePagination(totalPages)}
          type="button"
          className="pageItem"
        >
          {totalPages}
        </button>
        {page !== totalPages && (
          <button
            onClick={() => handlePagination(page + 1)}
            type="button"
            className="btn"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="btn--icon"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export const Pagination = PaginationComponent;

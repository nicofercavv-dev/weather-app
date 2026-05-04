import React from "react";

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination = React.memo(
  ({ currentPage, totalPages, onPageChange }: PaginationProps) => (
    <div className="pagination-container">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 0}
        className="pagination-btn"
      >
        &lt;
      </button>
      <span className="pagination-info">
        Página {currentPage + 1} de {totalPages}
      </span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages - 1}
        className="pagination-btn"
      >
        &gt;
      </button>
    </div>
  ),
);

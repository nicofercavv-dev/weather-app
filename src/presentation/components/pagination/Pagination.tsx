import React from "react";
import { PaginationStyled } from "./Pagination.styles";

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination = React.memo(
  ({ currentPage, totalPages, onPageChange }: PaginationProps) => (
    <PaginationStyled>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 0}
      >
        &lt;
      </button>
      <span>
        Página {currentPage + 1} de {totalPages}
      </span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages - 1}
      >
        &gt;
      </button>
    </PaginationStyled>
  ),
);

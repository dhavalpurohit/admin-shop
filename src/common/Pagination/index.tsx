import React, { useState } from 'react';

interface PaginationProps {
  totalItems: number;
  initialPageSize?: number;
  pageSizeOptions?: number[];
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  initialPageSize = 10,
  pageSizeOptions = [5, 10, 20, 50],
  onPageChange,
  onPageSizeChange,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);

  const totalPages = Math.ceil(totalItems / pageSize);

  const handlePageChange = (page: number) => {
    console.log('current page', page);
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    if (onPageChange) onPageChange(page);
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setCurrentPage(1); // Reset to page 1
    if (onPageSizeChange) onPageSizeChange(newPageSize);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxDisplayedPages = 5;
    const ellipsis = '...';

    if (totalPages <= maxDisplayedPages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            className={`px-3 py-1 mx-1 rounded ${
              i === currentPage
                ? 'bg-blue-500 text-white font-bold'
                : 'bg-gray-200 hover:bg-blue-200'
            }`}
          >
            {i}
          </button>,
        );
      }
    } else {
      if (currentPage > 2) {
        pageNumbers.push(
          <button
            key={1}
            onClick={() => handlePageChange(1)}
            className="px-3 py-1 mx-1 bg-gray-200 hover:bg-blue-200 rounded"
          >
            1
          </button>,
        );
        if (currentPage > 3)
          pageNumbers.push(<span key="start-ellipsis">{ellipsis}</span>);
      }

      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            className={`px-3 py-1 mx-1 rounded ${
              i === currentPage
                ? 'bg-blue-500 text-white font-bold'
                : 'bg-gray-200 hover:bg-blue-200'
            }`}
          >
            {i}
          </button>,
        );
      }

      if (currentPage < totalPages - 2) {
        if (currentPage < totalPages - 3)
          pageNumbers.push(<span key="end-ellipsis">{ellipsis}</span>);
        pageNumbers.push(
          <button
            key={totalPages}
            onClick={() => handlePageChange(totalPages)}
            className="px-3 py-1 mx-1 bg-gray-200 hover:bg-blue-200 rounded"
          >
            {totalPages}
          </button>,
        );
      }
    }

    return pageNumbers;
  };

  return (
    <div className="flex items-center space-x-4 w-full">
      {/* Page Size Dropdown */}
      <div className="flex items-center space-x-2 ml-auto">
        <label htmlFor="pageSize" className="text-gray-700">
          Items per page:
        </label>
        <select
          id="pageSize"
          value={pageSize}
          onChange={(e) => handlePageSizeChange(Number(e.target.value))}
          className="px-3 py-1 border rounded bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {pageSizeOptions.map((size) => (
            <option
              key={size}
              value={size}
              className={`${
                size === pageSize ? 'bg-blue-500 text-white font-bold' : ''
              }`}
            >
              {size}
            </option>
          ))}
        </select>
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center space-x-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-3 py-1 bg-gray-200 hover:bg-blue-200 rounded ${
            currentPage === 1 ? 'cursor-not-allowed opacity-50' : ''
          }`}
        >
          Prev
        </button>
        {renderPageNumbers()}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-3 py-1 bg-gray-200 hover:bg-blue-200 rounded ${
            currentPage === totalPages ? 'cursor-not-allowed opacity-50' : ''
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;

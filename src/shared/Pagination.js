import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';

const Pagination = ({ pages, onPageChange }) => {
  const { total, currentPage, hasNext, hasPrev, limit } = pages;
  const totalPages = 10;
  const location = useLocation();

  const formatUrl = (page) => {
    return `${location.pathname}?page=${page}`;
  };

  const handlePageClick = (page) => {
    if (onPageChange) {
      onPageChange(page);
    }
  };

  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        {hasPrev && (
          <Link
            to={formatUrl(currentPage - 1)}
            onClick={() => handlePageClick(currentPage - 1)}
            className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            Previous
          </Link>
        )}
        {hasNext && (
          <Link
            to={formatUrl(currentPage + 1)}
            onClick={() => handlePageClick(currentPage + 1)}
            className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Next
            <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
          </Link>
        )}
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
       
        <div>
          <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
            {hasPrev && (
              <Link
                to={formatUrl(currentPage - 1)}
                onClick={() => handlePageClick(currentPage - 1)}
                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                <span className="sr-only">Previous</span>
                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
              </Link>
            )}
            
            {Array.from({ length: totalPages }, (_, index) => {
              const page = index + 1;
              return (
                <Link
                  key={page}
                  to={formatUrl(page)}
                  onClick={() => handlePageClick(page)}
                  className={`relative inline-flex items-center px-4 py-2 text-sm font-medium ${
                    page === currentPage ? 'bg-indigo-600 text-white' : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {page}
                </Link>
              );
            })}

            {hasNext && (
              <Link
                to={formatUrl(currentPage + 1)}
                onClick={() => handlePageClick(currentPage + 1)}
                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                <span className="sr-only">Next</span>
                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
              </Link>
            )}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Pagination;

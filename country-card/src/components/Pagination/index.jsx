import React, { useState } from 'react';
import range from 'lodash/range';

const LEFT_PAGE = 'LEFT';
const RIGHT_PAGE = 'RIGHT';

const Pagination = ({ totalCountries }) => {
  const [totalRecords, setTotalRecords] = useState(200); // total number of records to be paginated
  const [pageLimit, setPageLimit] = useState(10); // number of records to be shown per page
  const [pageNeighbours, setPageNeighbours] = useState(2); // indicates the number of additional page numbers to show on each side of the current page
  const [currentPage, setCurrentPage] = useState(17);

  const totalPages = Math.ceil(totalRecords / pageLimit); // calculate number of pages required

  console.log(totalRecords);
  console.log(totalPages);

  const fetchPageNumbers = () => {
    /**
     * totalNumebrs: total page numbers to show on the control, pageNeighbours * 2 (left and right) + 3 (current page + first page + last page)
     * totalBlocks: + 2 (cover the < and > controls)
     */
    const totalNumbers = pageNeighbours * 2 + 3;
    const totalBlocks = totalNumbers + 2;

    // ensure there's a need to show the pageNeighbours and control
    if (totalPages > totalBlocks) {
      const startPage = Math.max(2, currentPage - pageNeighbours); // calculate the left-side starting page
      const endPage = Math.min(totalPages - 1, currentPage + pageNeighbours); // calculate the right-side ending page
      let pages = range(startPage, endPage + 1); // generate page numbers to display

      /**
       * hasLeftHidden: has hidden pages to the left
       * hasRightHidden: has hidden pages to the right
       * hiddenPages: total number of hidden pages either to the left or the right
       */
      const hasLeftHidden = startPage > 2;
      const hasRightHidden = totalPages - endPage > 1;
      const hiddenPages = totalPages - totalNumbers;

      // handle case (1) < {5, 6} [7] {8, 9} (10)
      if (hasLeftHidden && !hasRightHidden) {
        const extraPages = range(2, startPage);
        pages = [LEFT_PAGE, ...extraPages, ...pages];
      } // handle case (1) {2, 3} [4] {5, 6} > (10)
      else if (!hasLeftHidden && hasRightHidden) {
        const extraPages = range(endPage + 1, totalPages);
        pages = [...pages, ...extraPages, RIGHT_PAGE];
      } // handle case (1) < {4, 5} [6] {7, 8} > (10)
      else if (hasLeftHidden && hasRightHidden) {
        pages = [LEFT_PAGE, ...pages, RIGHT_PAGE];
      }

      return [1, ...pages, totalPages];
    }

    return range(1, totalPages + 1);
  };

  if (!totalRecords || totalPages === 1) return null;

  const pages = fetchPageNumbers();

  const renderPaginationList = () => {
    const renderedList = pages.map((page, index) => {
      if (page === LEFT_PAGE) {
        return (
          <li key={index} className='pagination-list__item'>
            <button>&laquo;</button>
          </li>
        );
      }

      if (page === RIGHT_PAGE) {
        return (
          <li key={index} className='pagination-list__item'>
            <button>&raquo;</button>
          </li>
        );
      }

      return (
        <li key={index} className='pagination-list__item'>
          <button>{page}</button>
        </li>
      );
    });

    return renderedList;
  };

  return (
    <div className='pagination'>
      <nav>
        <ul className='pagination-list'>{renderPaginationList()}</ul>
      </nav>
    </div>
  );
};

export default Pagination;

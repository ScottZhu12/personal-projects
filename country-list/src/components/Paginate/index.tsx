import React, { Dispatch, SetStateAction } from 'react';
import ReactPaginate from 'react-paginate';

import { countryDataType } from '../../App';

interface PaginateProps {
  pageCount: number;
  itemsPerPage: number;
  data: countryDataType[];
  setCountriesOffset: Dispatch<SetStateAction<number>>;
}

const Paginate: React.FC<PaginateProps> = ({
  pageCount,
  itemsPerPage,
  data,
  setCountriesOffset,
}) => {
  // invoke when user click to request another page
  const onPageClick = (e: { selected: number }) => {
    const newOffset = (e.selected * itemsPerPage) % data.length;
    setCountriesOffset(newOffset);
  };

  return (
    <>
      <ReactPaginate
        breakLabel='...'
        nextLabel='next'
        previousLabel='previous'
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={onPageClick}
        containerClassName='pagination'
        pageLinkClassName='pagination__item'
        previousLinkClassName='pagination__item pagination__item--margin'
        nextLinkClassName='pagination__item pagination__item--margin'
        breakLinkClassName='pagination__item'
        activeLinkClassName='pagination__item--active'
      />
    </>
  );
};

export default Paginate;

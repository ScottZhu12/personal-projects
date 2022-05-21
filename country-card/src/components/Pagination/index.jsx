import React, { useState } from 'react';

const Pagination = () => {
  const [totalRecords, setTotalRecords] = useState(0);
  const [pageLimit, setPageLimit] = useState(30);
  const [pageNeighbours, setPageNeighbours] = useState(0);

  return <div className='pagination'>Pagination</div>;
};

export default Pagination;

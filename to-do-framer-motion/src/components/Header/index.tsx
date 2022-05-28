import React, { useState } from 'react';

import Button from '../Button';
import TodoModal from '../TodoModal';

const Header: React.FC = () => {
  const [viewType, setViewType] = useState('');

  const onSelectionChanged = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setViewType(e.target.value);
  };

  return (
    <div className='header'>
      <Button btnType='button' btnText='Click Me' btnClass='btn btn--primary' />
      <select
        name='selectTodo'
        id='selectTodo'
        className='header-select'
        onChange={onSelectionChanged}
      >
        <option value=''></option>
        <option value='all'>All</option>
        <option value='incomplete'>Incomplete</option>
        <option value='complete'>Complete</option>
      </select>
      <TodoModal />
    </div>
  );
};

export default Header;

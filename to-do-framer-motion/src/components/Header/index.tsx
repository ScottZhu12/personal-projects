import React, { useState } from 'react';

import TodoModal from '../TodoModal';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { modalShow } from '../../features/modalSlice';

const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const modal = useAppSelector((state) => state.modal.show);

  const [viewType, setViewType] = useState('');

  const onSelectionChanged = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setViewType(e.target.value);
  };

  const onBtnClick = () => {
    dispatch(modalShow(true));
  };

  return (
    <div className='header'>
      <button type='button' className='btn btn--primary' onClick={onBtnClick}>
        Add Task
      </button>
      <select
        name='selectTodo'
        id='selectTodo'
        className='header-select'
        value={viewType}
        onChange={onSelectionChanged}
      >
        <option value=''></option>
        <option value='all'>All</option>
        <option value='incomplete'>Incomplete</option>
        <option value='complete'>Complete</option>
      </select>
      {modal && <TodoModal />}
    </div>
  );
};

export default Header;

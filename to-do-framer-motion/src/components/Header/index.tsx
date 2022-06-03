import React, { useState } from 'react';

import TodoModal from '../TodoModal';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { addModalShow } from '../../features/modalSlice';
import { changeFilterStatus } from '../../features/todosSlice';

const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const modal = useAppSelector((state) => state.modal.addShow);
  const initialFilterStatus = useAppSelector(
    (state) => state.todo.filterStatus
  );

  const [viewType, setViewType] = useState(initialFilterStatus);

  const onSelectionChanged = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setViewType(e.target.value);
    dispatch(changeFilterStatus(e.target.value));
  };

  const onBtnClick = () => {
    dispatch(addModalShow(true));
  };

  return (
    <div className='header'>
      <button type='button' className='btn btn--primary' onClick={onBtnClick}>
        Add Todo
      </button>
      <select
        name='selectTodo'
        id='selectTodo'
        className='header-select'
        value={viewType}
        onChange={onSelectionChanged}
      >
        <option value='all'>All</option>
        <option value='incomplete'>Incomplete</option>
        <option value='complete'>Complete</option>
      </select>
      {modal && <TodoModal type='add' />}
    </div>
  );
};

export default Header;

import React, { useState } from 'react';

import Button from '../Button';

const TodoModal: React.FC = () => {
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('');

  const onTitleChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const onSelectionChanged = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value);
  };

  return (
    <div className='todo-modal'>
      <div className='todo-modal-content'>
        <div className='todo-modal-content__close'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-6 w-6'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
            strokeWidth={1}
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M6 18L18 6M6 6l12 12'
            />
          </svg>
        </div>

        <form className='todo-form'>
          <h3>Add Task</h3>
          <div className='todo-form__field'>
            <label htmlFor='todoTitle'>Title</label>
            <input
              name='todoTitle'
              id='todoTitle'
              type='text'
              value={title}
              onChange={onTitleChanged}
            />
          </div>

          <div className='todo-form__field'>
            <label htmlFor='todoStatus'>Status</label>
            <select
              name='todoStatus'
              id='todoStatus'
              className='todo-status-select'
              onChange={onSelectionChanged}
            >
              <option value=''></option>
              <option value='incomplete'>Incomplete</option>
              <option value='complete'>Complete</option>
            </select>
          </div>

          <div className='todo-form__field'>
            <Button
              btnType='submit'
              btnText='Add Task'
              btnClass='btn btn--primary'
            />

            <Button
              btnType='button'
              btnText='Cancel'
              btnClass='btn btn--secondary'
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default TodoModal;

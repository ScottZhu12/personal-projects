import React, { useState } from 'react';
import toast from 'react-hot-toast';

import { useAppDispatch } from '../../app/hooks';
import { addModalShow, updateModalShow } from '../../features/modalSlice';
import { addTodo, updateTodo } from '../../features/todosSlice';
import type { TodosListType } from '../../types';

interface TodoModalProps {
  type: string;
  todo?: TodosListType;
}

const TodoModal: React.FC<TodoModalProps> = ({ type, todo }) => {
  const dispatch = useAppDispatch();

  const checkTitle = () => {
    if (type === 'update' && todo) {
      return todo.title;
    }

    return '';
  };
  const checkStatus = () => {
    if (type === 'update' && todo) {
      return todo.status;
    }

    return '';
  };

  const [title, setTitle] = useState(checkTitle());
  const [status, setStatus] = useState(checkStatus());
  const [formError, setFormError] = useState(false);

  const onTitleChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const onSelectionChanged = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value);
  };

  const onBtnClick = () => {
    dispatch(addModalShow(false));
    dispatch(updateModalShow(false));
  };

  const canSave = [title, status].every(Boolean);

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!canSave) {
      setFormError(true);
    }

    if (canSave) {
      try {
        if (type === 'update' && todo) {
          dispatch(updateTodo({ id: todo.id, title, status }));
          toast.success('Todo Updated Successfully');
        } else if (type === 'add' && !todo) {
          dispatch(addTodo({ title, status }));
          toast.success('Todo added Successfully');
        }

        setTitle('');
        setStatus('');
        setFormError(false);
        dispatch(addModalShow(false));
        dispatch(updateModalShow(false));
      } catch (e) {
        toast.error('Error Occured');
        console.error(e);
      }
    }
  };

  const renderedFormError = () => {
    return <div className='form-error'>Form is not completed</div>;
  };

  return (
    <div className='todo-modal' onClick={onBtnClick}>
      <div className='todo-modal-content' onClick={(e) => e.stopPropagation()}>
        <div
          className='todo-modal-content__close'
          onClick={onBtnClick}
          role='button'
        >
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

        <form className='todo-form' onSubmit={onFormSubmit}>
          <h3>{type === 'update' ? 'Update Todo' : 'Add Todo'}</h3>
          <div className='todo-form__field'>
            <label htmlFor='todoTitle'>Title</label>
            <input
              name='todoTitle'
              id='todoTitle'
              type='text'
              value={title}
              onChange={onTitleChanged}
              autoComplete='off'
            />
          </div>

          <div className='todo-form__field'>
            <label htmlFor='todoStatus'>Status</label>
            <select
              name='todoStatus'
              id='todoStatus'
              className='todo-status-select'
              value={status}
              onChange={onSelectionChanged}
            >
              <option value=''></option>
              <option value='incomplete'>Incomplete</option>
              <option value='complete'>Complete</option>
            </select>
          </div>

          <div className='todo-form__field'>
            <button type='submit' className='btn btn--primary'>
              {type === 'update' ? 'Update Todo' : 'Add Todo'}
            </button>
            <button
              type='button'
              className='btn btn--secondary'
              onClick={onBtnClick}
            >
              Cancel
            </button>
          </div>
        </form>
        {formError && renderedFormError()}
      </div>
    </div>
  );
};

export default TodoModal;

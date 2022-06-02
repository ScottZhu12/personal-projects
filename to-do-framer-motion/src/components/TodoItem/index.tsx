import React from 'react';
import format from 'date-fns/format';
import toast from 'react-hot-toast';

import { TodosListType } from '../../types';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { deleteTodo } from '../../features/todosSlice';
import TodoModal from '../TodoModal';
import { updateModalShow } from '../../features/modalSlice';

interface TodoItemProps {
  todo: TodosListType;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const dispatch = useAppDispatch();
  const modal = useAppSelector((state) => state.modal.updateShow);
  const headingClass = todo.status === 'complete' ? 'heading-complete' : '';

  const onDeleteBtnClick = () => {
    dispatch(deleteTodo(todo));

    toast.success('Todo deleted successfully');
  };
  const onEditBtnClick = () => {
    dispatch(updateModalShow(true));
  };

  return (
    <div className='todo-item'>
      <div className='todo-item__checkbox'>[]</div>
      <div className='todo-item__content'>
        <div className='todo-item__content__detail'>
          <h3 className={headingClass}>{todo.title}</h3>
          <p>{format(new Date(todo.time), 'p, MM/dd/yyyy')}</p>
        </div>

        <div className='todo-item__content__btns'>
          <button type='button' onClick={onDeleteBtnClick}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='icon icon--delete'
              viewBox='0 0 20 20'
              fill='currentColor'
            >
              <path
                fillRule='evenodd'
                d='M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z'
                clipRule='evenodd'
              />
            </svg>
          </button>
          <button type='button' onClick={onEditBtnClick}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='icon icon--edit'
              viewBox='0 0 20 20'
              fill='currentColor'
            >
              <path d='M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z' />
            </svg>
          </button>
        </div>
      </div>
      {modal && <TodoModal type='update' todo={todo} />}
    </div>
  );
};

export default TodoItem;

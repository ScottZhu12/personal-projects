import React from 'react';
import format from 'date-fns/format';
import toast from 'react-hot-toast';
import { motion, useMotionValue, useTransform } from 'framer-motion';

import { TodosListType } from '../../types';
import { useAppDispatch } from '../../app/hooks';
import { updateModalShow } from '../../features/modalSlice';
import { deleteTodo, fetchTodo, updateTodo } from '../../features/todosSlice';

const boxVariants = {
  checked: {
    backgroundColor: '#748ffc',
    transition: {
      duration: 0.1,
    },
  },
  unChecked: {
    backgroundColor: '#e9ecef',
    transition: {
      duration: 0.1,
    },
  },
};

const checkVariants = {
  initial: {
    color: '#fff',
  },
  checked: {
    pathLength: 1,
  },
  unChecked: {
    pathLength: 0,
  },
};

const childVariants = {
  hidden: {
    y: 20,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
  },
};

interface TodoItemProps {
  todo: TodosListType;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const pathLength = useMotionValue(0);
  const opacity = useTransform(pathLength, [0.05, 0.15], [0, 1]);

  const dispatch = useAppDispatch();

  const headingClass = todo.status === 'complete' ? 'heading-complete' : '';
  const checked = todo.status === 'complete' ? true : false;

  const onDeleteBtnClick = () => {
    dispatch(deleteTodo(todo));

    toast.success('Todo deleted successfully');
  };
  const onEditBtnClick = () => {
    dispatch(updateModalShow(true));
    dispatch(fetchTodo(todo));
  };
  const onCheckBtnClick = () => {
    const changedStatus =
      todo.status === 'complete' ? 'incomplete' : 'complete';
    dispatch(
      updateTodo({
        id: todo.id,
        title: todo.title,
        status: changedStatus,
        time: todo.time,
      })
    );
  };

  return (
    <motion.div className='todo-item' variants={childVariants}>
      <motion.div
        className='todo-item__checkbox'
        variants={boxVariants}
        animate={checked ? 'checked' : 'unChecked'}
        onClick={onCheckBtnClick}
      >
        <motion.svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-5 w-5'
          viewBox='0 0 20 20'
          fill='currentColor'
        >
          <motion.path
            variants={checkVariants}
            animate={checked ? 'checked' : 'unChecked'}
            style={{ pathLength, opacity }}
            fillRule='evenodd'
            d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
            clipRule='evenodd'
          />
        </motion.svg>
      </motion.div>
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
    </motion.div>
  );
};

export default TodoItem;

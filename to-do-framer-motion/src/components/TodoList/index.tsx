import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { useAppSelector } from '../../app/hooks';
import TodoItem from '../TodoItem';
import TodoModal from '../TodoModal';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { staggerChildren: 0.3 },
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

const TodoList: React.FC = () => {
  const modal = useAppSelector((state) => state.modal.updateShow);
  const todoList = useAppSelector((state) => state.todo.todoList);
  const fetchedTodo = useAppSelector((state) => state.todo.fetchedTodo);
  let orderedTodoList;
  const filterStatus = useAppSelector((state) => state.todo.filterStatus);

  if (todoList && todoList.length > 0) {
    orderedTodoList = [...todoList];
    orderedTodoList.sort((a, b) => b.time.localeCompare(a.time));
  }

  let renderedTodoList;

  if (orderedTodoList && filterStatus === 'all') {
    renderedTodoList = orderedTodoList.map((todo) => {
      return <TodoItem key={todo.id} todo={todo} />;
    });
  } else if (orderedTodoList && filterStatus !== 'all') {
    const filteredTodoList = orderedTodoList.filter(
      (todo) => todo.status === filterStatus
    );

    renderedTodoList =
      filteredTodoList.length === 0 ? (
        <motion.p className='empty-list' variants={childVariants}>
          No Todo Found
        </motion.p>
      ) : (
        filteredTodoList.map((todo) => {
          return <TodoItem key={todo.id} todo={todo} />;
        })
      );
  }

  return (
    <main className='todo-list'>
      <AnimatePresence>
        <motion.div
          variants={containerVariants}
          initial='hidden'
          animate='visible'
        >
          {renderedTodoList}
        </motion.div>
      </AnimatePresence>

      <>{modal && <TodoModal type='update' todo={fetchedTodo} />}</>
    </main>
  );
};

export default TodoList;

import React, { Dispatch, SetStateAction } from 'react';

import { TaskType } from '../../App';
import TaskCard from '../TaskCard';

interface TaskContainerProps {
  text: string;
  tasks: TaskType[];
  tasksList: TaskType[];
  setData: Dispatch<SetStateAction<TaskType[]>>;
}

const TaskContainer: React.FC<TaskContainerProps> = ({
  text,
  tasks,
  tasksList,
  setData,
}) => {
  if (tasks.length === 0)
    return <div className='task-container__title'>{text}</div>;

  const renderedTasks = tasks
    .sort((a, b) => a.id - b.id)
    .map((task) => {
      return <TaskCard data={task} tasksList={tasksList} setData={setData} />;
    });

  return (
    <div className='task-container'>
      <div className='task-container__title'>{text}</div>
      <div className='task-container__content'>{renderedTasks}</div>
    </div>
  );
};

export default TaskContainer;

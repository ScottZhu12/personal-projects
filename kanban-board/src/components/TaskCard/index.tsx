import React, { Dispatch, SetStateAction } from 'react';

import { TaskType } from '../../App';

interface TaskCardProps {
  data: TaskType;
  tasksList: TaskType[];
  setData: Dispatch<SetStateAction<TaskType[]>>;
}

const TaskCard: React.FC<TaskCardProps> = ({ data, tasksList, setData }) => {
  const onRightBtnClick = () => {
    if (data.stage >= 3) return;

    const newStage = data.stage + 1;
    const taskFound = tasksList.find((task) => task.id === data.id);

    const taskFiltered = tasksList.filter((task) => task.id !== data.id);

    const updatedTask = { ...taskFound, stage: newStage };

    // @ts-ignore
    taskFiltered.push(updatedTask);

    setData(taskFiltered);
  };

  const onLeftBtnClick = () => {
    if (data.stage <= 0) return;

    const newStage = data.stage - 1;
    const taskFound = tasksList.find((task) => task.id === data.id);
    console.log(taskFound);
    const taskFiltered = tasksList.filter((task) => task.id !== data.id);
    console.log(taskFiltered);

    const updatedTask = { ...taskFound, stage: newStage };
    console.log(updatedTask);
    // @ts-ignore
    taskFiltered.push(updatedTask);
    console.log(taskFiltered);
    setData(taskFiltered);
  };

  return (
    <div className='task-card'>
      <div className='task-card__title'>{data.name}</div>
      <div className='task-card__btns'>
        <button type='button' onClick={onLeftBtnClick}>
          -
        </button>
        <button type='button' onClick={onRightBtnClick}>
          +
        </button>
      </div>
    </div>
  );
};

export default TaskCard;

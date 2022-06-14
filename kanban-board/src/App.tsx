import React, { useState } from 'react';

import TaskContainer from './components/TaskContainer';

export const category = ['Backlog', 'To Do', 'Ongoing', 'Done'];
export type TaskType = {
  name: string;
  stage: number;
  id: number;
};
export const tasks = [
  { name: 'task 0', stage: 0, id: 0 },
  { name: 'task 1', stage: 0, id: 1 },
  { name: 'task 2', stage: 0, id: 2 },
  { name: 'task 3', stage: 1, id: 3 },
  { name: 'task 4', stage: 1, id: 4 },
  { name: 'task 5', stage: 2, id: 5 },
  { name: 'task 6', stage: 3, id: 6 },
  { name: 'task 7', stage: 3, id: 7 },
  { name: 'task 8', stage: 3, id: 8 },
];

const App: React.FC = () => {
  const [data, setData] = useState<TaskType[]>(tasks);
  console.log(data);

  const renderedCategory = category.map((cat, idx) => {
    const filteredTasks = data.filter((task) => task.stage === idx);

    return (
      <TaskContainer
        tasksList={data}
        key={idx}
        text={cat}
        tasks={filteredTasks}
        setData={setData}
      />
    );
  });

  return <div className='app'>{renderedCategory}</div>;
};

export default App;

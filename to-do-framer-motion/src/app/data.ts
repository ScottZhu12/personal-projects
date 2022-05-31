import localforage from 'localforage';

export const todoTable = localforage.createInstance({
  name: 'TodoApp',
  storeName: 'TodoTable',
});

export const createInitialTodosList = async () => {
  try {
    const todosList = await todoTable.getItem('todosList');

    if (!todosList) {
      await todoTable.setItem('todosList', []);
    }
  } catch (err) {
    console.error(err);
  }
};

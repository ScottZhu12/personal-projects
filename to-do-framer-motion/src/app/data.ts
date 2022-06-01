export const checkLocalStorage = () => {
  try {
    const res = localStorage.getItem('todoList');

    if (!res) {
      localStorage.setItem('todoList', JSON.stringify([]));
    }
  } catch (err) {
    console.error(err);
  }
};

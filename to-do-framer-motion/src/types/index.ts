export type TodosListType = {
  id: string;
  title: string;
  status: string;
};

export interface TodosStateProps {
  todosList: TodosListType[];
  status: string;
  error: string | null;
}

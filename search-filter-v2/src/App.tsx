import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DebounceInput } from 'react-debounce-input';

import UsersTable from './components/UsersTable';

export interface UsersDataProps {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
}

const App: React.FC = () => {
  const [users, setUsers] = useState<UsersDataProps[]>([]);
  const [query, setQuery] = useState('');

  // fetch users data
  useEffect(() => {
    const fetchUsers = async () => {
      const { data } = await axios.get(
        'https://scottzhu-json-server-data.herokuapp.com/searchFilterUsers'
      );

      setUsers(data);
    };

    fetchUsers();
  }, []);

  // use react-debounce-input to create debounce effect
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  // search for users whose first_name or last_name or email contains the query
  const keys = ['first_name', 'last_name', 'email'];

  const searchUsers = (data: UsersDataProps[]) => {
    return data.filter((item: UsersDataProps) => {
      // @ts-ignore
      return keys.some((key) => item[key].toLowerCase().includes(query));
    });
  };

  return (
    <div className='app'>
      <DebounceInput
        type='text'
        placeholder='Search...'
        autoComplete='off'
        value={query}
        onChange={onInputChange}
        debounceTimeout={300}
      />
      <UsersTable data={searchUsers(users)} />
    </div>
  );
};

export default App;

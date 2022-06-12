import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DebounceInput } from 'react-debounce-input';

interface UsersDataProps {
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

  if (!users || users.length === 0) {
    return <h1>Loading...</h1>;
  }

  // based on search query filter out the data we are looking for
  // then render the filtered data
  const renderedUsersList = users
    .filter((user) => user.first_name.toLowerCase().startsWith(query))
    .map((user) => {
      return (
        <li key={user.id} className='list__item'>
          {user.first_name}
        </li>
      );
    });

  // use react-debounce-input to create debounce effect
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
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
      <ul className='list'>{renderedUsersList}</ul>
    </div>
  );
};

export default App;

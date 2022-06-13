import React from 'react';

import { UsersDataProps } from '../../App';

interface UsersTableProps {
  data: UsersDataProps[];
}

const UsersTable: React.FC<UsersTableProps> = ({ data }) => {
  if (!data || data.length === 0) return <h1>Loading...</h1>;

  const renderedUsersList = data.map((user) => {
    return (
      <tr key={user.id}>
        <td>{user.first_name}</td>
        <td>{user.last_name}</td>
        <td>{user.email}</td>
      </tr>
    );
  });

  return (
    <table className='users-table'>
      <tbody>
        <tr>
          <th>Name</th>
          <th>Surname</th>
          <th>Email</th>
        </tr>
        {renderedUsersList}
      </tbody>
    </table>
  );
};

export default UsersTable;

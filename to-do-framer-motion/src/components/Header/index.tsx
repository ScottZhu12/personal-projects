import React from 'react';

import Button from '../Button';
import { SelectButton } from '../Button';
import TodoModal from '../TodoModal';

const Header: React.FC = () => {
  return (
    <div className='header'>
      <Button btnType='button' btnText='Click Me' btnClass='btn btn--primary' />
      <SelectButton
        name='selectTodo'
        id='selectTodo'
        selectBtnClass='select-btn'
      >
        <option value=''></option>
        <option value='all'>All</option>
        <option value='incomplete'>Incomplete</option>
        <option value='complete'>Complete</option>
      </SelectButton>
      <TodoModal />
    </div>
  );
};

export default Header;

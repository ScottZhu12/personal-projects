import React, { useState } from 'react';

import {
  increment,
  decrement,
  reset,
  incrementByAmount,
} from '../../features/counter/counterSlice';
import { useAppSelector, useAppDispatch } from '../../app/hooks';

const Counter: React.FC = () => {
  const [incrementAmount, setIncrementAmount] = useState('');

  const count = useAppSelector((state) => state.counter.count);
  const dispatch = useAppDispatch();

  const addValue = Number(incrementAmount) || 0;

  const resetAll = () => {
    setIncrementAmount('0');
    dispatch(reset());
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIncrementAmount(e.target.value);
  };

  return (
    <div className='counter'>
      <p>{count}</p>

      <div className='counter__plus-minus'>
        <div>
          <button onClick={() => dispatch(increment())}>+</button>
        </div>
        <div>
          <button onClick={() => dispatch(decrement())}>-</button>
        </div>
      </div>

      <input
        type='text'
        value={incrementAmount}
        onChange={onInputChange}
        placeholder='0'
      />

      <div className='counter__additional-btn'>
        <button onClick={() => dispatch(incrementByAmount(addValue))}>
          Add Amount
        </button>
        <button onClick={resetAll}>Reset</button>
      </div>
    </div>
  );
};

export default Counter;

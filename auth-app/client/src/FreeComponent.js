import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FreeComponent = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const configuration = {
      method: 'get',
      url: 'https://scottzhu-auth-app.herokuapp.com/free-endpoint',
    };

    const fetch = async () => {
      const res = await axios(configuration);

      setMessage(res.data.message);
    };

    fetch();
  }, []);

  return (
    <div>
      <h1 className='text-center'>Free Component</h1>

      <h3 className='text-center text-danger'>{message}</h3>
    </div>
  );
};

export default FreeComponent;

import React, { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const AuthComponent = () => {
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const cookies = new Cookies();
  const token = cookies.get('TOKEN');

  useEffect(() => {
    const configuration = {
      method: 'get',
      url: 'https://scottzhu-auth-app.herokuapp.com/auth-endpoint',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const fetch = async () => {
      const res = await axios(configuration);

      setMessage(res.data.message);
    };

    fetch();
  }, [token]);

  const logout = () => {
    cookies.remove('TOKEN', { path: '/' });

    navigate('/', { replace: true });
  };

  return (
    <div>
      <h1 className='text-center'>Auth Component</h1>

      <h3 className='text-center text-danger'>{message}</h3>

      <Button type='submit' variant='danger' onClick={() => logout()}>
        Logout
      </Button>
    </div>
  );
};

export default AuthComponent;

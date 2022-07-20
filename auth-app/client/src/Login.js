import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login, setLogin] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const configuration = {
      method: 'post',
      url: 'https://scottzhu-auth-app.herokuapp.com/login',
      data: {
        email,
        password,
      },
    };

    try {
      await axios(configuration);

      setLogin(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <h2>Login</h2>
      <Form onSubmit={(e) => handleSubmit(e)}>
        <Form.Group controlId='formBasicEmail'>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            name='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete='off'
          />
        </Form.Group>

        <Form.Group controlId='formBasicPassword'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Password'
            name='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete='off'
          />
        </Form.Group>

        <Button
          variant='primary'
          type='submit'
          onClick={(e) => handleSubmit(e)}
        >
          Submit
        </Button>
      </Form>

      <>
        {login ? (
          <p className='text-success'>You Are Logged in Successfully</p>
        ) : (
          <p className='text-danger'>You Are Not Logged in</p>
        )}
      </>
    </>
  );
};

export default Login;

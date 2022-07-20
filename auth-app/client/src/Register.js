import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [register, setRegister] = useState(false);

  const handleSubmit = async (e) => {
    // prevent the form from refreshing the whole page
    e.preventDefault();

    // connect frontend to backend
    const configuration = {
      method: 'post',
      url: 'https://scottzhu-auth-app.herokuapp.com/register',
      data: {
        email,
        password,
      },
    };

    try {
      await axios(configuration);
      setRegister(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <h2>Register</h2>
      <Form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <Form.Group controlId='formBasicEmail'>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            name='email'
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
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
            onChange={(e) => {
              setPassword(e.target.value);
            }}
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
        {register ? (
          <p className='text-success'>You Are Registered Successfully</p>
        ) : (
          <p className='text-danger'>You Are Not Registered</p>
        )}
      </>
    </>
  );
};

export default Register;

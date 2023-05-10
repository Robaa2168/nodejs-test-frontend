import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, Button } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import Dashboard from './Dashboard';
 
function LoginForm() {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleEmailOrPhoneChange = (event) => {
    setEmailOrPhone(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };



  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await axios.post('http://localhost:3001/api/login', {
      emailOrPhone,
      password,
    });

    localStorage.setItem('token', res.data.token); // save token in localStorage

    console.log(res.data);
    toast.success('Login successful!', {
      position: 'top-right'
    });
    navigate('/Dashboard');
  } catch (err) {
    console.error(err);
    if (err.response.data && err.response.data.message) {
      toast.error(err.response.data.message, {
        position: 'top-right'
      });
    } else {
      toast.error('Login failed!', {
        position: 'top-right'
      });
    }
  }
};



  return (
    <div className='col-md-6 text-center '>
    <ToastContainer />
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="emailOrPhone">
        <Form.Label>Email/Phone:</Form.Label>
        <Form.Control type="text" value={emailOrPhone} onChange={handleEmailOrPhoneChange} />
      </Form.Group>
      <Form.Group controlId="password">
        <Form.Label>Password:</Form.Label>
        <Form.Control type="password" value={password} onChange={handlePasswordChange} />
      </Form.Group>
      <Button variant="primary" className='m-2' type="submit">
        Login
      </Button>
    </Form>
  </div>  

  );
}

export default LoginForm;

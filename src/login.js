import React, { useState ,useContext } from 'react';
import { AuthContext } from './AuthContext';
import axios from 'axios';
import { Container, Form, Button } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import './signup.css'; // Import the new CSS file
import Dashboard from './Dashboard';
 
function LoginForm() {
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleemailChange = (event) => {
    setemail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const res = await axios.post('http://localhost:3001/api/login', {
        email,
        password,
      });
  
      localStorage.setItem('token', res.data.token); // save token in localStorage
  
      console.log(res.data);
  
      if (res.data.user.isVerified) {
        login();
        toast.success('Login successful!', {
          position: 'top-right'
        });
        navigate('/dashboard');
      } else {
        toast.info('Please verify your account.', {
          position: 'top-right'
        });
        navigate("/verify", { state: { email: email } });
      }
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
    <Container className="user-form-container">
    <ToastContainer />

    <Form className="user-form" onSubmit={handleSubmit}>
      <Form.Group controlId="email">
        <Form.Label>Email/Phone:</Form.Label>
        <Form.Control type="text" value={email} onChange={handleemailChange} />
      </Form.Group>
      <Form.Group controlId="password">
        <Form.Label>Password:</Form.Label>
        <Form.Control type="password" value={password} onChange={handlePasswordChange} />
      </Form.Group>
      <Button className="m-2 btn-success" type="submit">
        Login
      </Button>
    </Form>
  </Container>  

  );
}

export default LoginForm;

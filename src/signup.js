import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, Button } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import './signup.css';
import OtpVerification from './OtpVerification'; // Import the OtpVerification component

const UserForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const navigate = useNavigate();

  const handlePhoneNumberChange = (e) => {
    const newPhoneNumber = e.target.value;
    setPhoneNumber(newPhoneNumber);
    // Check if phone number is exactly 10 digits
    if (newPhoneNumber.length !== 10) {
      setPhoneNumberError('Phone number must be exactly 10 digits');
    } else {
      setPhoneNumberError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Check if phone number is valid
    if (phoneNumber.length !== 10 || !/^[0-9]+$/.test(phoneNumber)) {
      toast.error('Please enter a valid 10-digit phone number!', {
        position: 'top-right'
      });
      return;
    }
  
    try {
      const res = await axios.post('http://localhost:3001/api/signup', {
        firstName,
        lastName,
        email,
        password,
        phoneNumber
      });
      console.log(res.data);
      toast.success('Registration successful!', {
        position: 'top-right'
      });
     // Navigate to "/verify" with email as state
     navigate("/verify", { state: { email: email } });
    } catch (err) {
      console.error(err);
      if (err.response.data && err.response.data.message) {
        toast.error(err.response.data.message, {
          position: 'top-right'
        });
      } else {
        toast.error('Registration failed!', {
          position: 'top-right'
        });
      }
    }
  };

  return (
    <Container className="user-form-container">
      <ToastContainer />

      <Form className="user-form" onSubmit={handleSubmit}>
        <Form.Group controlId="firstName">
          <Form.Label>First Name:</Form.Label>
          <Form.Control
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="lastName">
          <Form.Label>Last Name:</Form.Label>
          <Form.Control
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="phoneNumber">
          <Form.Label>Phone Number:</Form.Label>
          <Form.Control
            type="text"
            pattern="[0-9]*" // only allow numeric input
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
          />
          {phoneNumberError && (
            <Form.Text className="text-danger">{phoneNumberError}</Form.Text>
          )}
        </Form.Group>

        <Button className="m-2 btn-success" type="submit">
          Register
        </Button>
      </Form>
    </Container>
  );
};

export default UserForm;

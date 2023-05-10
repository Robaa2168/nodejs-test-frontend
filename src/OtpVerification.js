import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom'; // Import useLocation hoo
import { Container, Form, Button } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import './signup.css';



const OtpVerification = () => {
    const [otp, setOtp] = useState('');
    const [otpError, setOtpError] = useState('');
    const navigate = useNavigate();
    const location = useLocation(); // Add the useLocation hook
    const email = location.state?.email; // Access the email passed in the state
  
    // Check if email is empty, and redirect to /signup if it is
    useEffect(() => {
      if (!email) {
        navigate('/signup');
      }
    }, [email, navigate]);
  

  
    const handleOtpChange = (e) => {
      const newOtp = e.target.value;
      setOtp(newOtp);
      if (newOtp.length !== 6) {
        setOtpError('OTP must be exactly 6 digits');
      } else {
        setOtpError('');
      }
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
    
      if (otp.length !== 6 || !/^\d{6}$/.test(otp)) {
        toast.error('Please enter a valid 6-digit OTP', {
          position: 'top-right'
        });
        return;
      }
  
      try {
        const res = await axios.post('http://localhost:3001/api/verify', {
          email,
          otp
        });
        console.log(res.data);
        toast.success('Email verification successful!', {
          position: 'top-right'
        });
        navigate("/Dashboard");
      } catch (err) {
        console.error(err);
        if (err.response.data && err.response.data.message) {
          toast.error(err.response.data.message, {
            position: 'top-right'
          });
        } else {
          toast.error('Email verification failed!', {
            position: 'top-right'
          });
        }
      }
    };
  
    const handleResendCode = async (event) => {
        event.preventDefault(); // prevent the default behavior of the link
      
        try {
          const res = await axios.post('http://localhost:3001/api/resend', { email });
          console.log(res.data);
          toast.success('OTP has been resent to your email', {
            position: 'top-right'
          });
        } catch (err) {
          console.error(err);
          toast.error('Error resending OTP', {
            position: 'top-right'
          });
        }
      };
  
    return (
      <Container className="user-form-container">
        <ToastContainer />
  
        <Form className="otp-verification-form" onSubmit={handleSubmit}>
     
  
          <Form.Group controlId="otp">
            <Form.Label>OTP:</Form.Label>
            <Form.Control
              type="text"
              pattern="[0-9]*" // only allow numeric input
              value={otp}
              onChange={handleOtpChange}
              maxLength={6} // limit input to 6 digits
            />
            {otpError && (
              <Form.Text className="text-danger">{otpError}</Form.Text>
            )}
          </Form.Group>
         <div> <a href=''  onClick={handleResendCode}>Resend code</a></div>
  
          <Button className="m-2 btn-success" type="submit" disabled={otpError !== '' || otp.length !== 6}>
            Verify Email
          </Button>
  
        
        </Form>
      </Container>
    );
  };
  

export default OtpVerification;
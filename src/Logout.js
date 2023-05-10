import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the token from local storage
    localStorage.removeItem('token');

    // Navigate to the login page
    navigate('/login');
  };

  return (
    <div>
      <h1>Are you sure you want to logout?</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;

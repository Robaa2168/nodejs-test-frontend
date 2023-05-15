import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext'; // import the context

const Logout = () => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext); // use the context

  const handleLogout = () => {
    logout(); // update the login state

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

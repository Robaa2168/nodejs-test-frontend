import React, { useState } from 'react';
import Dropdown from './Dropdown';


const Navbar = () => {
  const [showProfile, setShowProfile] = useState(false);

  const handleProfileClick = () => {
    setShowProfile(!showProfile);
  };

  return (
    <nav>
      <ul>
        <li onClick={handleProfileClick}>Profile</li>
      </ul>
      {showProfile && (
        <div>

          <Dropdown />
        </div>
      )}
    </nav>
  );
};

export default Navbar;

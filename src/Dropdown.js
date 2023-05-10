import React, { useState } from 'react';

const Dropdown = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionSelect = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div>
      <label htmlFor="dropdown">Select an option:</label>
      <select id="dropdown" value={selectedOption} onChange={handleOptionSelect}>

        <option value="option1">Option 1</option>
        <option value="option1">Option 2</option>
        <option value="option1">Option 3</option>
        <option value="option1">Option 4</option>

      </select>
    </div>
  );
};

export default Dropdown;

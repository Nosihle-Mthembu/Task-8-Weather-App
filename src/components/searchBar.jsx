import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      onSearch(inputValue);
      setInputValue(''); // Clear the input after searching
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        placeholder="Enter location"
      />
      <button onClick={() => { onSearch(inputValue); setInputValue(''); }}>Search</button>
    </div>
  );
};

export default SearchBar;

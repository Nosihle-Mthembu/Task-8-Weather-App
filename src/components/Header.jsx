import React from 'react';

const Header = ({ city, date, time }) => {
  return (
    <div className="header">
      <h2>{city}</h2>
      <p>{date}, {time}</p>
    </div>
  );
};

export default Header;

// Header.js

import React from 'react';
import logo from './logo.svg'; // Adjust the path if necessary

function Header() {
  return (
    <header className="bg-light">
      <div className="container text-center">
        <h1
          className="display-4"
          style={{
            textShadow: '2px 2px #dee2e6',
            fontFamily: 'Georgia, serif',
            fontSize: '3.5rem',
            marginBottom: '2rem',
          }}
        >
          <img
            src={logo}
            alt="DTSS Hyderabad Logo"
            width="150"
            className="img-fluid mr-5"
          />
          Devathilakula Sankshema Sangham Address Book
        </h1>
      </div>
    </header>
  );
}

export default Header;

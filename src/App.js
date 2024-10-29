import React from 'react';
import './App.css';
import logo from './logo.svg';
import ContactList from './components/ContactList';

function App() {
    return (
        <>
      <header className="bg-light py-1">
        <div className="container text-center">
          <h1 className="display-4"
          style={{ 
            textShadow: '2px 2px #dee2e6',
            fontFamily: 'Georgia, serif',
            fontSize: '3.5rem',
            marginBottom: '2rem', }}>
          <img src={logo} alt="DTSS Hyderabad Logo" width="150" className="img-fluid mr-5" />
                Devathilakula Sankshema Sangham</h1>
          <p className="lead">A central repository of all contact information for/by the Community</p>
        </div>
      </header>
      <div className="container mt-5">
        <ContactList />
      </div>
    </>
    );
}

export default App;
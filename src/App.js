import React from 'react';
import './App.css';
import logo from './logo.svg';
import ContactList from './components/ContactList';
import Footer from './components/Footer.js';
import { BrowserRouter } from 'react-router-dom';
import './styles.css';

function App() {
    return (
    <BrowserRouter basename="/dtss-addresses">
      <header className="bg-light">
        <div className="container text-center">
          <h1 className="display-4"
          style={{ 
            textShadow: '2px 2px #dee2e6',
            fontFamily: 'Georgia, serif',
            fontSize: '3.5rem',
            marginBottom: '2rem', }}>
          <img src={logo} alt="DTSS Hyderabad Logo" width="150" className="img-fluid mr-5" />
                Devathilakula Sankshema Sangham Address Book</h1>
        </div>
      </header>
      <div className="container mt-5">
        <ContactList />
      </div>
      < Footer />
    </BrowserRouter>
    );
}

export default App;
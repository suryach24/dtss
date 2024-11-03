// App.js

import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Header from './components/Header'; // Adjust the path if necessary
import ContactList from './components/ContactList';
import Footer from './components/Footer';

function App() {
  return (
    <BrowserRouter basename="/dtss-addresses">
      <Header />
      <div className="container mt-5">
        <ContactList />
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;

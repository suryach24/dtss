import React from 'react';
import './App.css';
import ContactList from './components/ContactList';

function App() {
    return (
        <div className="container mt-5">
            <h1 className="text-center">DTSS Hyderabad Address Book</h1>
            <ContactList />
        </div>
    );
}

export default App;
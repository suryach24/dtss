import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ContactForm from './ContactForm';
import './ContactList.css';

const ContactList = () => {
    const [contacts, setContacts] = useState([]);
    const [selectedContact, setSelectedContact] = useState(null);
    const [isFormVisible, setIsFormVisible] = useState(false);

    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/contacts');
                setContacts(response.data);
            } catch (error) {
                console.error('Error fetching contacts:', error);
            }
        };

        fetchContacts();
    }, []);

    const handleEdit = (contact) => {
        setSelectedContact(contact);
        setIsFormVisible(true);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/contacts/${id}`);
            setContacts(contacts.filter(contact => contact._id !== id));
        } catch (error) {
            console.error('Error deleting contact:', error);
        }
    };

    const handleContactSaved = (savedContact) => {
        if (selectedContact) {
            setContacts(contacts.map(contact => contact._id === savedContact._id ? savedContact : contact));
        } else {
            setContacts([...contacts, savedContact]);
        }
        setIsFormVisible(false);
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Contact List</h2>
            <button className="btn btn-primary mb-3" onClick={() => { setIsFormVisible(true); setSelectedContact(null); }}>
                Add Contact
            </button>
            {isFormVisible && (
                <ContactForm contactId={selectedContact?._id} onContactSaved={handleContactSaved} onCancel={() => setIsFormVisible(false)} />
            )}
            <div className="row">
                <div className="col-md-8">
                    <table className="table table-border">
                        <thead>
                            <tr>
                                <th>Surname</th>
                                <th>Name</th>
                                <th>Area</th>
                                <th>Address</th>
                                <th>Mobile</th>
                                <th>Email</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {contacts.map(contact => (
                                <tr key={contact._id}>
                                    <td>{contact.surname}</td>
                                    <td>{contact.name}</td>
                                    <td>{contact.area}</td>
                                    <td>{contact.address}</td>
                                    <td>{contact.mobile}</td>
                                    <td>{contact.email}</td>
                                    <td>
                                        <button className="btn btn-warning btn-sm" onClick={() => handleEdit(contact)}>Edit Contact</button>
                                        <button className="btn btn-danger btn-sm" onClick={() => handleDelete(contact._id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ContactList;

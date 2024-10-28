import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ContactForm from './ContactForm';

const ContactList = () => {
    const [contacts, setContacts] = useState([]);
    const [selectedContactId, setSelectedContactId] = useState(null);
    const [isFormVisible, setIsFormVisible] = useState(false);

    useEffect(() => {
        const fetchContacts = async () => {
            const response = await axios.get('http://localhost:5000/api/contacts');
            setContacts(response.data);
        };

        fetchContacts();
    }, [isFormVisible]); // Refetch contacts when the form is submitted

    const handleEdit = (contact) => {
        setSelectedContactId(contact._id);
        setIsFormVisible(true);
    };

    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:5000/api/contacts/${id}`);
        setContacts(contacts.filter(contact => contact._id !== id));
    };

    const handleContactSaved = () => {
        setIsFormVisible(false);
        setSelectedContactId(null);
    };

    return (
        <div className="card">
            <div className="card-body">
                <button className="btn btn-primary mb-3" onClick={() => { setIsFormVisible(true); setSelectedContactId(null); }}>
                    Add Contact
                </button>
                {isFormVisible && (
                    <ContactForm contactId={selectedContactId} onContactSaved={handleContactSaved} onCancel={() => setIsFormVisible(false)} />
                )}
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Surname</th>
                            <th>Name</th>
                            <th>Area</th>
                            <th>Address</th>
                            <th>Mobile</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Organisation</th>
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
                                <td>{contact.phone}</td>
                                <td>{contact.organisation}</td>
                                <td>
                                    <button className="btn btn-warning btn-sm" onClick={() => handleEdit(contact)}>Edit The Contact</button>
                                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(contact._id)}>Delete the Contact</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ContactList;

import React, { useState, useEffect, useRef  } from 'react';
import axios from 'axios';
import ContactForm from './ContactForm';
import { Modal, Button } from 'react-bootstrap';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const contactFormRef = useRef(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const contactsPerPage = 25; // Adjust as needed

  // State variables for the confirmation modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [contactToDelete, setContactToDelete] = useState(null);

  // Search state
  const [searchTerm, setSearchTerm] = useState('');

  // Loading state
  const [isLoading, setIsLoading] = useState(false);

  // Fetch contacts with pagination
  const fetchContacts = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${API_BASE_URL}/contacts`, {
        params: {
          page: currentPage,
          limit: contactsPerPage,
          search: searchTerm,
        },
      });
      console.log('Contacts fetched:', response.data);
      setContacts(response.data.contacts);
      setTotalPages(response.data.totalPages);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching contacts:', error);
      setContacts([]); // Set contacts to empty array on error
      setIsLoading(false);
    }
  };

  // Fetch contacts on component mount and when currentPage or searchTerm changes
  useEffect(() => {
    fetchContacts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, searchTerm]);

  // Handle page change
  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page on new search
  };

  // Handle edit
  const handleEdit = (contact) => {
    setSelectedContact(contact);
    setIsFormVisible(true);
      // Scroll to the ContactForm
    setTimeout(() => {
      if (contactFormRef.current) {
        contactFormRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, 0);
  };

  const handleDeleteClick = (contact) => {
    setContactToDelete(contact);
    setShowDeleteModal(true);
  };

  // Handle delete
  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`${API_BASE_URL}/contacts/${contactToDelete._id}`);
      // Remove the deleted contact from the state
      setContacts(contacts.filter((c) => c._id !== contactToDelete._id));
      // Close the modal and reset the state
      setShowDeleteModal(false);
      setContactToDelete(null);
    } catch (error) {
      console.error('Error deleting contact:', error);
      // Optionally display an error message to the user
    }
  };

  const handleContactSaved = (savedContact) => {
    if (selectedContact) {
      setContacts(
        contacts.map((contact) =>
          contact._id === savedContact._id ? savedContact : contact
        )
      );
    } else {
      setContacts([...contacts, savedContact]);
    }
    setIsFormVisible(false);
  };

  return (
    <div className="container-fluid contact-list-container">
      <div className="contact-list-content">
        <h2 className="text-center">Contact List</h2>
        <button
          className="btn btn-dark btn-lg btn-block mb-3 text-uppercase"
          onClick={() => {
            setIsFormVisible(true);
            setSelectedContact(null);
          }}
        >
          Add a new Contact
        </button>
        {isFormVisible && (
          <div ref={contactFormRef}>
            <ContactForm
              contactId={selectedContact?._id}
              onContactSaved={handleContactSaved}
              onCancel={() => setIsFormVisible(false)}
            />
          </div>
        )}
        {/* Search Input */}
        <div className="mb-3">
          <input
            type="text"
            placeholder="Search by Name or Surname"
            value={searchTerm}
            onChange={handleSearchChange}
            className="form-control"
          />
        </div>
        {isLoading ? (
          <div className="text-center">Loading...</div>
        ) : contacts.length === 0 ? (
          <div className="text-center">No contacts found.</div>
        ) : (
          <>
            <div className="row">
              <div className="col-md-12 table-responsive border-dark">
                <table className="table table-bordered table-hover">
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
                    {contacts.map((contact) => (
                      <tr key={contact._id}>
                        <td>{contact.surname}</td>
                        <td>{contact.name}</td>
                        <td>{contact.area}</td>
                        <td>{contact.address}</td>
                        <td>{contact.mobile}</td>
                        <td>{contact.email}</td>
                        <td>
                          <div className="d-flex align-items-center">
                            <button
                              className="btn btn-outline-dark btn-sm"
                              onClick={() => handleEdit(contact)}
                              title="Edit"
                              aria-label="Edit"
                            >
                              <i className="fa-solid fa-pen"></i>
                            </button>
                            <button
                              className="btn btn-outline-dark btn-sm"
                              onClick={() => handleDeleteClick(contact)}
                              title="Delete"
                              aria-label="Delete"
                            >
                              <i className="fa-solid fa-trash"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {/* Pagination Controls */}
                <div className="d-flex justify-content-between">
                  <button
                    className="btn btn-secondary"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>
                  <span>
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    className="btn btn-secondary"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
  
        {/* Confirmation Modal */}
        <Modal 
          show={showDeleteModal} 
          onHide={() => setShowDeleteModal(false)}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Confirm Deletion</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to delete the contact details of {' '}
            <strong>
              {contactToDelete && `${contactToDelete.surname} ${contactToDelete.name}`}
            </strong>
            ?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleConfirmDelete}>
              Delete Contact
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default ContactList;

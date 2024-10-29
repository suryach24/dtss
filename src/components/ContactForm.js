// ContactForm.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ContactForm = ({ contactId, onContactSaved, onCancel }) => {
  console.log('ContactForm received contactId:', contactId);
  // State to hold form data
  const [contact, setContact] = useState({
    surname: '',
    name: '',
    area: '',
    address: '',
    mobile: '',
    email: '',
    phone: '',
    organisation: '',
  });

  // State to hold validation errors
  const [errors, setErrors] = useState({});

  // Fetch existing contact data if editing
  useEffect(() => {
    if (contactId) {
      console.log('Contact ID in useEffect:', contactId);
      const fetchContact = async () => {
        try {
          console.log('Fetching contact with ID:', contactId);
          const response = await axios.get(`http://localhost:5000/api/contacts/${contactId}`);
          console.log('Contact data fetched:', response.data);
          setContact(response.data);
        } catch (error) {
          console.error('Error fetching contact:', error);
        }
      };
      fetchContact();
    } else {
      console.log('No contactId provided');
    }
  }, [contactId]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact((prevContact) => ({
      ...prevContact,
      [name]: value,
    }));
  };

  // Validate form inputs
  const validate = () => {
    const newErrors = {};
    if (!contact.surname) newErrors.surname = 'Surname is required';
    if (!contact.name) newErrors.name = 'Name is required';
    if (!contact.area) newErrors.area = 'Area is required';
    if (!contact.address) newErrors.address = 'Address is required';
    if (!contact.mobile) newErrors.mobile = 'Mobile is required';
    // Add more validation rules as needed
    return newErrors;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate inputs
    const formErrors = validate();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    try {
      let response;
      if (contactId) {
        // Update existing contact
        response = await axios.put(`http://localhost:5000/api/contacts/${contactId}`, contact);
      } else {
        // Create new contact
        response = await axios.post('http://localhost:5000/api/contacts', contact);
      }
      // Inform parent component about the saved contact
      onContactSaved(response.data);
    } catch (error) {
      console.error('Error saving contact:', error);
      // Handle server-side validation errors if needed
      if (error.response && error.response.data) {
        setErrors({ form: error.response.data.message || 'An error occurred' });
      }
    }
  };

  return (
<div className="card mb-3">
      <div className="card-header">{contactId ? 'Edit Contact' : 'Add Contact'}</div>
      <div className="card-body">
        {errors.form && <div className="alert alert-danger">{errors.form}</div>}
        <form onSubmit={handleSubmit}>
          {/* Row 1: Surname and Name */}
          <div className="form-row">
            <div className="form-group col-md-6">
              <label>Please enter the Surname</label>
              <input
                type="text"
                name="surname"
                value={contact.surname}
                onChange={handleChange}
                className={`form-control ${errors.surname ? 'is-invalid' : ''}`}
              />
              {errors.surname && <div className="invalid-feedback">{errors.surname}</div>}
            </div>
            <div className="form-group col-md-6">
              <label>Enter your First and Last names</label>
              <input
                type="text"
                name="name"
                value={contact.name}
                onChange={handleChange}
                className={`form-control ${errors.name ? 'is-invalid' : ''}`}
              />
              {errors.name && <div className="invalid-feedback">{errors.name}</div>}
            </div>
          </div>

          {/* Row 2: Area, Mobile, Phone */}
          <div className="form-row">
            <div className="form-group col-md-4">
              <label>Area/Colony</label>
              <input
                type="text"
                name="area"
                value={contact.area}
                onChange={handleChange}
                className={`form-control ${errors.area ? 'is-invalid' : ''}`}
              />
              {errors.area && <div className="invalid-feedback">{errors.area}</div>}
            </div>
            <div className="form-group col-md-4">
              <label>Primary Contact Number</label>
              <input
                type="text"
                name="mobile"
                value={contact.mobile}
                onChange={handleChange}
                className={`form-control ${errors.mobile ? 'is-invalid' : ''}`}
              />
              {errors.mobile && <div className="invalid-feedback">{errors.mobile}</div>}
            </div>
            <div className="form-group col-md-4">
              <label>Secondary Contact</label>
              <input
                type="text"
                name="phone"
                value={contact.phone}
                onChange={handleChange}
                className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
              />
              {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
            </div>
          </div>

          {/* Row 3: Address */}
          <div className="form-group">
            <label>Enter your full Address</label>
            <input
              type="text"
              name="address"
              value={contact.address}
              onChange={handleChange}
              className={`form-control ${errors.address ? 'is-invalid' : ''}`}
            />
            {errors.address && <div className="invalid-feedback">{errors.address}</div>}
          </div>

          {/* Row 4: Email and Organisation */}
          <div className="form-row">
            <div className="form-group col-md-6">
              <label>Please enter your full email</label>
              <input
                type="email"
                name="email"
                value={contact.email}
                onChange={handleChange}
                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              />
              {errors.email && <div className="invalid-feedback">{errors.email}</div>}
            </div>
            <div className="form-group col-md-6">
              <label>Company/Organisation</label>
              <input
                type="text"
                name="organisation"
                value={contact.organisation}
                onChange={handleChange}
                className={`form-control ${errors.organisation ? 'is-invalid' : ''}`}
              />
              {errors.organisation && <div className="invalid-feedback">{errors.organisation}</div>}
            </div>
          </div>

          {/* Buttons */}
          <button type="submit" className="btn btn-dark">
            {contactId ? 'Update Contact' : 'Add Contact'}
          </button>
          <button type="button" className="btn btn-secondary ml-2" onClick={onCancel}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
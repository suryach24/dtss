/* eslint-disable no-template-curly-in-string */
// ContactForm.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

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
          const response = await axios.get(`${API_BASE_URL}/contacts/${contactId}`);
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
    if (!contact.surname.trim()) newErrors.surname = 'Surname is required';
    if (!contact.name.trim()) newErrors.name = 'Name is required';
    if (!contact.area.trim()) newErrors.area = 'Area is required';
    if (!contact.address.trim()) newErrors.address = 'Address is required';
    if (!contact.mobile.trim()) newErrors.mobile = 'Primary contact is required';
    else if (!/^\d{10}$/.test(contact.mobile)) newErrors.mobile = 'Primary contact must be 10 digits';

    // Optional fields validation
    // Email validation if provided
    if (contact.email && contact.email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(contact.email)) {
        newErrors.email = 'Invalid email format';
      }
    }

    // Secondary contact validation if provided
    if (contact.phone && contact.phone.trim()) {
      if (!/^\d{10}$/.test(contact.phone)) {
        newErrors.phone = 'Secondary contact must be 10 digits';
      }
    }

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
        response = await axios.put(`${API_BASE_URL}/contacts/${contactId}`, contact);
      } else {
        // Create new contact
        response = await axios.post(`${API_BASE_URL}/contacts`, contact);
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
    <div className="card contact-form-container mb-3 ">
      <div className="card-header text-center bg-dark text-white"><strong>{contactId ? 'Edit Contact' : 'Add Contact'}</strong></div>
      <div className="card-body">
        {errors.form && <div className="alert alert-danger">{errors.form}</div>}
        <form onSubmit={handleSubmit}>
          {/* Row 1: Surname and Name */}
          <div className="form-row">
            <div className="form-group col-md-4">
              <label className=''>Surname</label>
              <input
                type="text"
                name="surname"
                value={contact.surname}
                onChange={handleChange}
                className={`form-control ${errors.surname ? 'is-invalid' : ''}`}
                placeholder="Enter your surname"
              />
              {errors.surname && <div className="invalid-feedback">{errors.surname}</div>}
            </div>
            <div className="form-group col-md-8">
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={contact.name}
                onChange={handleChange}
                className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                placeholder="Enter remaining name"
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
                placeholder="Enter your locality or area"
              />
              {errors.area && <div className="invalid-feedback">{errors.area}</div>}
            </div>
            <div className="form-group col-md-4">
              <label>Primary Contact</label>
              <input
                type="text"
                name="mobile"
                value={contact.mobile}
                onChange={handleChange}
                className={`form-control ${errors.mobile ? 'is-invalid' : ''}`}
                placeholder="Enter your primary contact number"
              />
              {errors.mobile && <div className="invalid-feedback">{errors.mobile}</div>}
            </div>
            <div className="form-group col-md-4">
              <label>Secondary Contact (optional)</label>
              <input
                type="text"
                name="phone"
                value={contact.phone}
                onChange={handleChange}
                className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                placeholder="Enter secondary contact (optional)"
              />
              {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
            </div>
          </div>

          {/* Row 3: Address */}
          <div className="form-group">
            <label>Address</label>
            <input
              type="text"
              name="address"
              value={contact.address}
              onChange={handleChange}
              className={`form-control ${errors.address ? 'is-invalid' : ''}`}
              placeholder="Enter your full address here"
            />
            {errors.address && <div className="invalid-feedback">{errors.address}</div>}
          </div>

          {/* Row 4: Email and Organisation */}
          <div className="form-row">
            <div className="form-group col-md-6">
              <label>Email (optional)</label>
              <input
                type="email"
                name="email"
                value={contact.email}
                onChange={handleChange}
                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                placeholder="Enter your email address (optional)"
              />
              {errors.email && <div className="invalid-feedback">{errors.email}</div>}
            </div>
            <div className="form-group col-md-6">
              <label>Occupation/Organisation/Company (optional)</label>
              <input
                type="text"
                name="organisation"
                value={contact.organisation}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter your organisation or Company. If retired, type retired"
              />
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

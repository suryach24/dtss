// Footer.js

import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="footer bg-light mt-3">
      <div className="container">
        <div className="row py-4">
          {/* Left Column: Address */}
          <div className="col-md-4 mb-4 mb-md-0">
            <h6><strong>Hyderabad Choultry Address</strong></h6>
            <p className="mb-1">Devathilakula Visranthi Bhavanam</p>
            <p className="mb-1">Vanka Anantha Nilayam</p>
            <p className="mb-1">Gangaram, Chanda Nagar</p>
            <p className="mb-1">Hyderabad, Telangana, 500050</p>
          </div>
          {/* Middle Column: Map */}
          <div className="col-md-4 mb-4 mb-md-0">
            <div className="footer-map">
              <div className="map-responsive">
                <iframe
                  title="DTSS Hyderabad Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d237.83115268700712!2d78.33002959703916!3d17.493261307641507!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb9300207b1bc7%3A0xeb6045b400c557a9!2sVanka%20Anantha%20Nilayam%20DTSS!5e0!3m2!1sen!2sin!4v1730266205573!5m2!1sen!2sin"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  aria-hidden="false"
                  tabIndex="0"
                ></iframe>
              </div>
            </div>
          </div>
          {/* Right Column: Contact Details and Social Media */}
          <div className="col-md-4">
            <h6><strong>Contact Information</strong></h6>
            <p className="mb-1">
              Kukunuri Ramesh (President) - 98854 47557
            </p>
            <p className="mb-1">
              Adda Koteswara Rao (Secretary) - 93924 52844
            </p>
            <p className="mb-1">
              Kukunuri Subba Rao - 99080 88117
            </p>
            <p className="mb-1">
              Email:{' '}
              <a href="mailto:dtsshyderabad@gmail.com">dtsshyderabad@gmail.com</a>
            </p>
            {/* Social Media Icons */}
            <div className="social-icons mt-3">
              <a
                href="https://www.facebook.com/yourpage"
                className="mr-3"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebook size={28} />
              </a>
              <a
                href="https://twitter.com/yourprofile"
                className="mr-3"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTwitter size={28} />
              </a>
              <a
                href="https://www.instagram.com/yourprofile"
                className="mr-3"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram size={28} />
              </a>
            </div>
          </div>
        </div>
        {/* Bottom Footer */}
        <div className="row">
          <div className="col text-center">
            <p className="small mb-0">
              © {new Date().getFullYear()} Devathilakula Sankshema Sangham. All rights reserved.
            </p>
          </div>
        </div>
      </div>
      {/* Back to Top Button */}
      <button
        className="btn btn-primary back-to-top"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        Back to Top
      </button>
    </footer>
  );
}

export default Footer;

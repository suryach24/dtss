const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema(
  {
    surname: { type: String, required: true, index: true},
    name: { type: String, required: true, index: true},
    area: { type: String, required: true },
    address: { type: String, required: true },
    mobile: {
      type: String,
      required: true,
      index: true,
      validate: {
        validator: function (v) {
          return /^\+?\d{7,15}$/.test(v); // Simple regex for phone numbers
        },
        message: props => `${props.value} is not a valid mobile number!`,
      },
    },
    email: {
      type: String,
      validate: {
        validator: function (v) {
          return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v);
        },
        message: props => `${props.value} is not a valid email address!`,
      },
      index: true,
    },
    phone: {
      type: String,
      validate: {
        validator: function (v) {
          return /^\+?\d{7,15}$/.test(v);
        },
        message: props => `${props.value} is not a valid phone number!`,
      },
    },
    organisation: { type: String },
  },
  { timestamps: true }
);

// Example method to get full name
contactSchema.methods.getFullName = function () {
  return `${this.name} ${this.surname}`;
};

module.exports = mongoose.model('Contact', contactSchema);

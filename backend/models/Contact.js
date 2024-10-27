const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    surname: { type: String, required: true },
    name: { type: String, required: true },
    area: { type: String, required: true },
    address: { type: String, required: true },
    mobile: { type: Number, required: true },
    email: { type: String, required: false },
    phone: { type: Number, required: false },
    organisation: { type: Number, required: false },
});

module.exports = mongoose.model('Contact', contactSchema);

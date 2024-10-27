const express = require('express');
const Contact = require('../models/Contact');
const router = express.Router();

// Add a new contact
router.post('/', async (req, res) => {
    const contact = new Contact(req.body);
    try {
        await contact.save();
        res.status(201).send(contact);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Get all contacts
router.get('/', async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.send(contacts);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Update a contact
router.put('/:id', async (req, res) => {
    try {
        const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!contact) {
            return res.status(404).send({ message: 'Contact not found' });
        }
        res.send(contact);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Delete a contact
router.delete('/:id', async (req, res) => {
    try {
        await Contact.findByIdAndDelete(req.params.id);
        res.send({ message: 'Contact deleted' });
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;

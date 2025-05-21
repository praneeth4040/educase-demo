const express = require('express');
const router = express.Router();
const { addSchool, listSchools } = require('../controllers/schoolController');

// POST /addSchool
router.post('/addSchool', addSchool);

// GET /listSchools?latitude=...&longitude=...
router.get('/listSchools', listSchools);

module.exports = router;

// backend\src\routes\apiRoutes.js
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {startInterview,submitAnswer,getInterviewHistory} = require('../controllers/interviewController');

// Protected routes
router.use(protect);

// POST /api/interview/start
router.post('/start', startInterview);

// POST /api/interview/submit
router.post('/submit', submitAnswer);

// GET /api/interview/history
router.get('/history', getInterviewHistory);

module.exports = router;
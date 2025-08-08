// backend\src\routes\apiRoutes.js
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {startInterview,submitAnswer,submitAudioAnswer,getInterviewHistory} = require('../controllers/interviewController');
const multer = require('multer');
const upload = multer();

// Protected routes
router.use(protect);

// POST /api/interview/start
router.post('/start', startInterview);

// POST /api/interview/submit
router.post('/submit', submitAnswer);

// POST /api/interview/submit-audio (multipart/form-data)
router.post('/submit-audio', upload.single('audio'), submitAudioAnswer);

// GET /api/interview/history
router.get('/history', getInterviewHistory);

module.exports = router;
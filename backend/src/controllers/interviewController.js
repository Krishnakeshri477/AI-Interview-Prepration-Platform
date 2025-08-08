// backend\src\controllers\interviewController.js
const Interview = require('../models/Interview');
const { generateQuestion, evaluateAnswer } = require('../services/gemini');
const { textToSpeech } = require('../services/textToSpeech');
const { speechToText } = require('../services/speechToText');

// Start new interview
exports.startInterview = async (req, res, next) => {
    try {
        const { role, difficulty } = req.body;
        const userId = req.user.id;
        
        // Create interview first
        const interview = await Interview.create({
            user: userId,
            role: role,
            difficulty: difficulty,
            questions: [],
            overallScore: 0
        });

        const question = await generateQuestion(role, difficulty);
        
        if (!question) {
            return res.status(500).json({ success: false, message: 'Failed to generate question' });
        }
        res.status(200).json({ 
            success: true, 
            question,
            interviewId: interview._id
        });
    } catch (err) {
        console.error('Error in startInterview:', err);
        next(err);
    }
};

// Submit answer (text or URL)
exports.submitAnswer = async (req, res, next) => {
    try {
        const { interviewId, question, answer, audioUrl: userAnswerAudioUrl, role, difficulty } = req.body;
        const userId = req.user.id;

        let transcribedUserAnswer = answer;
        if (userAnswerAudioUrl) {
            transcribedUserAnswer = await speechToText(userAnswerAudioUrl);
        }

        let feedback;
        try {
            feedback = await evaluateAnswer(question, transcribedUserAnswer);
        } catch (e) {
            console.error('Evaluate answer failed, falling back:', e);
            feedback = {
                score: 50,
                technicalFeedback: 'Automatic evaluation failed. Please review your technical accuracy and structure your answer with key points, examples, and trade-offs.',
                communicationFeedback: 'Automatic evaluation failed. Focus on clarity, conciseness, and a structured delivery (Situation → Action → Result).'
            };
        }

        let audioFeedbackUrl = null;
        try {
            audioFeedbackUrl = await textToSpeech(feedback.communicationFeedback);
        } catch (e) {
            console.warn('TTS generation failed, continuing without audio:', e?.message || e);
        }

        // Update the existing interview
        const updatedInterview = await Interview.findByIdAndUpdate(
            interviewId,
            {
                $push: {
                    questions: {
                        question,
                        answer: transcribedUserAnswer,
                        feedback,
                        audioFeedbackUrl 
                    }
                },
                $set: {
                    overallScore: feedback.score,
                    role,
                    difficulty
                }
            },
            { new: true }
        );

        res.status(201).json({ 
            success: true, 
            feedback: {
                ...feedback,
                audioFeedbackUrl: audioFeedbackUrl
            } 
        });
    } catch (err) {
        console.error('Error in submitAnswer:', err);
        next(err);
    }
};

// Submit audio answer (multipart/form-data)
exports.submitAudioAnswer = async (req, res, next) => {
    try {
        const { interviewId, question, role, difficulty } = req.body;

        if (!req.file) {
            return res.status(400).json({ success: false, message: 'Audio file is required' });
        }

        // Upload raw user audio to ImageKit to get a public URL
        const { uploadToImageKit } = require('../services/imagekitService');
        const originalFileName = req.file.originalname || `recording-${Date.now()}.webm`;
        let uploadedUserAudioUrl = null;
        try {
            uploadedUserAudioUrl = await uploadToImageKit(req.file.buffer, originalFileName, 'ai-interview-audio/user');
        } catch (e) {
            console.error('Upload user audio failed:', e);
        }

        // Transcribe uploaded audio
        let transcribedUserAnswer = 'Audio transcription unavailable.';
        try {
            if (uploadedUserAudioUrl) {
                transcribedUserAnswer = await speechToText(uploadedUserAudioUrl);
            }
        } catch (e) {
            console.warn('STT failed, continuing with placeholder text:', e?.message || e);
        }

        // Evaluate and synthesize audio feedback
        let feedback;
        try {
            feedback = await evaluateAnswer(question, transcribedUserAnswer);
        } catch (e) {
            console.error('Evaluate answer (audio) failed, falling back:', e);
            feedback = {
                score: 50,
                technicalFeedback: 'Automatic evaluation failed. Please review your technical accuracy and structure your answer with key points, examples, and trade-offs.',
                communicationFeedback: 'Automatic evaluation failed. Focus on clarity, conciseness, and a structured delivery (Situation → Action → Result).'
            };
        }
        let audioFeedbackUrl = null;
        try {
            audioFeedbackUrl = await textToSpeech(feedback.communicationFeedback);
        } catch (e) {
            console.warn('TTS generation (audio path) failed, continuing without audio:', e?.message || e);
        }

        // Persist to interview
        await Interview.findByIdAndUpdate(
            interviewId,
            {
                $push: {
                    questions: {
                        question,
                        answer: transcribedUserAnswer,
                        feedback,
                        audioFeedbackUrl
                    }
                },
                $set: {
                    overallScore: feedback.score,
                    role,
                    difficulty
                }
            },
            { new: true }
        );

        res.status(201).json({
            success: true,
            feedback: {
                ...feedback,
                audioFeedbackUrl
            }
        });
    } catch (err) {
        console.error('Error in submitAudioAnswer:', err);
        next(err);
    }
};

// Get user's interview history
exports.getInterviewHistory = async (req, res, next) => {
    try {
        const userId = req.user.id;

        const interviews = await Interview.find({ user: userId })
            .sort({ createdAt: -1 })
            .select('-__v');

        res.status(200).json({
            success: true,
            count: interviews.length,
            data: interviews
        });
    } catch (err) {
        console.error('Error in getInterviewHistory:', err);
        next(err);
    }
};
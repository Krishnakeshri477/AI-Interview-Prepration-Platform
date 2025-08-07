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

// Submit answer
exports.submitAnswer = async (req, res, next) => {
    try {
        const { interviewId, question, answer, audioUrl: userAnswerAudioUrl, role, difficulty } = req.body;
        const userId = req.user.id;

        let transcribedUserAnswer = answer;
        if (userAnswerAudioUrl) {
            transcribedUserAnswer = await speechToText(userAnswerAudioUrl);
        }

        const feedback = await evaluateAnswer(question, transcribedUserAnswer);
        const audioFeedbackUrl = await textToSpeech(feedback.communicationFeedback);

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
                audioUrl: audioFeedbackUrl
            } 
        });
    } catch (err) {
        console.error('Error in submitAnswer:', err);
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
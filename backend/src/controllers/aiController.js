// backend/src/controllers/aiController.js
const { gemini, assemblyai } = require('../config/aiConfig');
const { textToSpeech } = require('../services/textToSpeech');

exports.generateFeedback = async (req, res, next) => {
    try {
        const { question, answer, audioUrl: userAnswerAudioUrl } = req.body;

        let transcribedAnswer = answer;
        if (userAnswerAudioUrl) {
            const transcript = await assemblyai.transcripts.create({
                audio_url: userAnswerAudioUrl
            });
            transcribedAnswer = transcript.text;
        }

        const prompt = `Evaluate this interview answer (0-100 score):
Question: ${question}
Answer: ${transcribedAnswer}
Return JSON: { score: number, technicalFeedback: string, communicationFeedback: string }`;

        const result = await gemini.generateContent(prompt);
        const response = result.response;
        const text = response.text();

        const cleanedText = text.replace(/```json\n|\n```/g, '').trim();

        const feedback = JSON.parse(cleanedText);

        const audioFeedbackUrl = await textToSpeech(feedback.communicationFeedback);

        res.status(200).json({
            success: true,
            feedback: {
                ...feedback,
                audioFeedbackUrl: audioFeedbackUrl
            }
        });
    } catch (err) {
        console.error('Error in generateFeedback:', err);
        next(err);
    }
};
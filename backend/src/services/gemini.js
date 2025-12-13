// backend/src/services/gemini.js
const { gemini } = require('../config/aiConfig');

exports.generateQuestion = async (role, difficulty) => {
  const prompt = `Generate a ${difficulty} interview question for a ${role} role.Return ONLY the question text and nothing else.`;
  const result = await gemini.generateContent(prompt);
  const response = result.response;
  return response.text();
};

exports.evaluateAnswer = async (question, answer) => {
  const prompt = `Evaluate this interview answer (0-100 score):
  Question: ${question}
  Answer: ${answer}
  Return JSON: { score: number, technicalFeedback: string, communicationFeedback: string }`;
  const result = await gemini.generateContent(prompt);
  const response = result.response;
  const text = response.text();
  
  const cleanedText = text.replace(/```json\n|\n```/g, '').trim();

  return JSON.parse(cleanedText);
};
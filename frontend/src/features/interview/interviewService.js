// frontend\src\features\interview\interviewService.js
import api from '../../utils/api';

const startInterview = async (interviewData) => {
  const response = await api.post('/interview/start', interviewData);
  return response.data;
};

const submitAnswer = async (answerData) => {
  const response = await api.post('/interview/submit', answerData);
  return response.data;
};

const submitAudioAnswer = async (formData) => {
  const response = await api.post('/interview/submit-audio', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

const getInterviewHistory = async () => {
  const response = await api.get('/interview/history');
  return response.data;
};

const interviewService = {
  startInterview,
  submitAnswer,
  submitAudioAnswer,
  getInterviewHistory,
};

export default interviewService;
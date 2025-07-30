// backend\src\services\speechToText.js
const { assemblyai } = require('../config/aiConfig');

exports.speechToText = async (audioUrl) => {
  try {
    const transcript = await assemblyai.transcripts.create({
      audio_url: audioUrl
    });
    return transcript.text;
  } catch (err) {
    console.error('Speech-to-Text Error:', err);
    throw new Error('Failed to transcribe audio');
  }
};
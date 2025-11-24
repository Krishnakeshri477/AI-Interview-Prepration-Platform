// backend/src/config/aiConfig.js
const { GoogleGenerativeAI } = require('@google/generative-ai');
const { AssemblyAI } = require('assemblyai');
const { ElevenLabsClient } = require('elevenlabs');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

module.exports = {
  gemini: model,
  assemblyai: new AssemblyAI({ apiKey: process.env.ASSEMBLYAI_KEY }),
  elevenlabs: new ElevenLabsClient({ apiKey: process.env.ELEVENLABS_KEY })
};
// backend/src/services/textToSpeech.js
const { ElevenLabsClient } = require('elevenlabs');
const { uploadToImageKit } = require('./imagekitService');
const { Readable } = require('stream');

const elevenlabs = new ElevenLabsClient({
    apiKey: process.env.ELEVENLABS_KEY
});

exports.textToSpeech = async (text) => {
    try {
        const audioStream = await elevenlabs.generate({
            voice: "Rachel",
            model_id: "eleven_monolingual_v2",
            text: text,
            output_format: "mp3_44100_128"
        });

        const chunks = [];
        for await (const chunk of audioStream) {
            chunks.push(chunk);
        }
        const audioBuffer = Buffer.concat(chunks);

        const fileName = `feedback-${Date.now()}.mp3`;
        const audioUrl = await uploadToImageKit(audioBuffer, fileName, 'ai-interview-audio/feedback');

        return audioUrl;
    } catch (err) {
        console.error('ElevenLabs or ImageKit Upload Error:', err);
        throw new Error('Failed to generate or upload audio feedback');
    }
};
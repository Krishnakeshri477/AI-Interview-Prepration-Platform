// frontend\src\pages\SpeakingTips.jsx
import React from 'react';
import Navbar from '../components/Navbar';
import { FaVolumeUp, FaSmile, FaHandshake, FaStopwatch, FaCommentDots } from 'react-icons/fa';

const SpeakingTips = () => {
  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto p-6 mt-8 mb-16">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-6">Speaking Tips</h1>

        <section className="bg-white rounded-xl shadow-md p-6 border border-gray-200 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center">
            <FaVolumeUp className="text-blue-500 mr-2" /> Tone & Pace
          </h2>
          <p className="text-gray-700 mb-3">
            Your voice is a powerful tool. Use it to convey confidence and clarity.
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-1">
            <li><b>Speak clearly:</b> Articulate your words and avoid mumbling.</li>
            <li><b>Vary your pitch:</b> Use a natural, expressive tone to sound more engaging.</li>
            <li><b>Slow down:</b> Pausing briefly can make you seem more thoughtful and in control.</li>
            <li><b>Adjust your volume:</b> Speak loud enough to be heard, but don't shout.</li>
          </ul>
        </section>

        <section className="bg-white rounded-xl shadow-md p-6 border border-gray-200 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center">
            <FaHandshake className="text-purple-500 mr-2" /> Body Language
          </h2>
          <p className="text-gray-700 mb-3">
            Non-verbal cues are just as important as your words.
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-1">
            <li><b>Maintain eye contact:</b> It shows confidence and engagement.</li>
            <li><b>Sit up straight:</b> Good posture projects professionalism.</li>
            <li><b>Use hand gestures:</b> Natural, open gestures can add emphasis and personality.</li>
            <li><b>Avoid fidgeting:</b> Tapping your foot or playing with a pen can be distracting.</li>
          </ul>
        </section>

        <section className="bg-white rounded-xl shadow-md p-6 border border-gray-200 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center">
            <FaSmile className="text-green-500 mr-2" /> Projecting Positivity
          </h2>
          <p className="text-gray-700 mb-3">
            A positive attitude can make a lasting impression.
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-1">
            <li><b>Smile:</b> A genuine smile can make you seem more approachable and friendly.</li>
            <li><b>Show enthusiasm:</b> Express genuine interest in the role and the company.</li>
            <li><b>Start with a greeting:</b> Begin and end the interview with a pleasant and confident tone.</li>
          </ul>
        </section>
        
        <section className="bg-white rounded-xl shadow-md p-6 border border-gray-200 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center">
            <FaStopwatch className="text-orange-500 mr-2" /> Timing & Brevity
          </h2>
          <p className="text-gray-700 mb-3">
            Keep your answers concise and well-structured to hold attention.
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-1">
            <li><b>Answer directly:</b> Get to the point quickly and then elaborate with details.</li>
            <li><b>Time your answers:</b> Aim for around 1-2 minutes for most questions.</li>
            <li><b>Pause before answering:</b> Take a moment to collect your thoughts before you begin speaking.</li>
          </ul>
        </section>

        <section className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
          <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center">
            <FaCommentDots className="text-red-500 mr-2" /> Clarity & Word Choice
          </h2>
          <p className="text-gray-700 mb-3">
            What you say is just as important as how you say it.
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-1">
            <li><b>Avoid filler words:</b> "Um," "uh," and "like" can undermine your credibility.</li>
            <li><b>Use strong verbs:</b> Words like "managed," "led," and "achieved" sound more impactful.</li>
            <li><b>Simplify jargon:</b> Explain technical terms simply so everyone can understand.</li>
          </ul>
        </section>
      </div>
    </>
  );
};

export default SpeakingTips;
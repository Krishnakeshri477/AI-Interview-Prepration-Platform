import React from 'react';
import Navbar from '../components/Navbar';
import { FaLightbulb, FaListOl, FaMicrophone, FaRegClock, FaSmile, FaClipboardCheck } from 'react-icons/fa';

const InterviewGuide = () => {
  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto p-6 mt-8 mb-16">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-6">Interview Guide</h1>

        <section className="bg-white rounded-xl shadow-md p-6 border border-gray-200 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center"><FaLightbulb className="text-yellow-500 mr-2"/> Answer Framework</h2>
          <p className="text-gray-700 mb-3">Use the STAR method for behavioral questions and a structured approach for technical ones.</p>
          <ul className="list-disc pl-6 text-gray-700 space-y-1">
            <li><b>Behavioral (STAR):</b> Situation → Task → Action → Result</li>
            <li><b>Technical:</b> Restate → Clarify constraints → Outline approach → Discuss trade-offs → Conclude</li>
          </ul>
        </section>

        <section className="bg-white rounded-xl shadow-md p-6 border border-gray-200 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center"><FaListOl className="text-blue-600 mr-2"/> Structuring Tips</h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-1">
            <li>Start with a one-line summary of your approach.</li>
            <li>Break complex answers into clear steps or bullets.</li>
            <li>Use examples and quantify results where possible.</li>
            <li>Call out trade-offs, complexity, and alternatives.</li>
          </ul>
        </section>

        <section className="bg-white rounded-xl shadow-md p-6 border border-gray-200 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center"><FaMicrophone className="text-red-500 mr-2"/> Communication</h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-1">
            <li>Think aloud to show reasoning; be concise.</li>
            <li>Pause briefly after questions to organize thoughts.</li>
            <li>Ask clarifying questions before diving in.</li>
            <li>Close with a recap of the final answer.</li>
          </ul>
        </section>

        <section className="bg-white rounded-xl shadow-md p-6 border border-gray-200 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center"><FaRegClock className="text-purple-600 mr-2"/> Time Management</h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-1">
            <li>Allocate time: understanding (20%), solution (60%), validation (20%).</li>
            <li>Skip rabbit holes; flag assumptions and move on.</li>
          </ul>
        </section>

        <section className="bg-white rounded-xl shadow-md p-6 border border-gray-200 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center"><FaSmile className="text-green-600 mr-2"/> Behavioral Examples</h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-1">
            <li><b>Conflict:</b> STAR with measurable impact and what you learned.</li>
            <li><b>Leadership:</b> Influence without authority, delegation, coaching.</li>
            <li><b>Failure:</b> Ownership, remediation, prevention.</li>
          </ul>
        </section>

        <section className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
          <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center"><FaClipboardCheck className="text-indigo-600 mr-2"/> Quick Checklist</h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-1">
            <li>Repeat the question in your own words.</li>
            <li>State assumptions and constraints.</li>
            <li>Outline solution before details.</li>
            <li>Validate correctness and complexity.</li>
            <li>Summarize the final answer.</li>
          </ul>
        </section>
      </div>
    </>
  );
};

export default InterviewGuide;



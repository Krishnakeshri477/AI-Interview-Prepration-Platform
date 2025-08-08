// frontend\src\pages\Dashboard.jsx
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { FaPlay, FaHistory, FaBook, FaChartLine, FaLightbulb, FaUserTie, FaMicrophone } from 'react-icons/fa';

const Dashboard = () => {

  const heroImageUrl = "https://images.unsplash.com/photo-1573497491765-dccce02b29df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80";

  return (
    <>
      <Navbar />
      <div className="min-h-[calc(100vh-90px)] bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4 py-12">
          {/* Hero Section */}
          <div className="flex flex-col lg:flex-row items-center justify-between mb-16 gap-12">
            <div className="lg:w-1/2">
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
                <span className="text-blue-600">AI-Powered</span> Interview Coaching
              </h1>
              <p className="text-xl text-gray-700 mb-8 max-w-2xl">
                Practice with realistic interview simulations and get instant feedback on your answers, tone, and body language.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/interview"
                  className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition duration-300 shadow-lg hover:shadow-xl"
                >
                  <FaPlay className="mr-2" /> Start Mock Interview
                </Link>
                <NavLink
                  to="/speaking-tips"
                  onClick={() => window.scrollTo(0, 0)}
                  className="flex items-center justify-center bg-white hover:bg-gray-100 text-gray-800 font-bold py-3 px-6 rounded-lg text-lg transition duration-300 border border-gray-300 shadow-sm hover:shadow-md">
                  <FaMicrophone className="mr-2 text-blue-500" /> Speaking Tips
                </NavLink>
              </div>
            </div>
            <div className="lg:w-1/2">
              <div className="relative rounded-xl overflow-hidden shadow-2xl aspect-video">
                <img
                  src={heroImageUrl}
                  alt="AI Interview Practice"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-black/20 flex items-end p-6">
                  <div className="text-white">
                    <p className="text-sm font-medium mb-1">AI ANALYSIS</p>
                    <h3 className="text-xl font-bold">Get Real-Time Feedback</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Value Proposition Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-blue-500 hover:shadow-xl transition-all">
              <div className="text-blue-500 text-2xl mb-4">
                <FaUserTie />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Industry-Specific Questions</h3>
              <p className="text-gray-600">
                Tailored questions for tech, business, healthcare, and more based on real job requirements.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-purple-500 hover:shadow-xl transition-all">
              <div className="text-purple-500 text-2xl mb-4">
                <FaLightbulb />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Smart Feedback</h3>
              <p className="text-gray-600">
                Our AI analyzes your answers for content, clarity, and confidence with actionable suggestions.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-green-500 hover:shadow-xl transition-all">
              <div className="text-green-500 text-2xl mb-4">
                <FaChartLine />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Progress Tracking</h3>
              <p className="text-gray-600">
                Visualize your improvement over time with detailed analytics and performance metrics.
              </p>
            </div>
          </div>

          {/* Main Action Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl mx-auto mb-16">
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-8 rounded-xl shadow-2xl text-white">
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <FaPlay className="mr-3" /> New Interview
              </h2>
              <p className="mb-6 opacity-90">
                Start a fresh interview session with customized settings for your target role.
              </p>
              <Link
                to="/interview"
                className="inline-block bg-white text-blue-600 hover:bg-gray-100 font-bold py-3 px-6 rounded-lg text-lg transition duration-300"
              >
                Begin Now
              </Link>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-xl hover:shadow-2xl transition-shadow">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <FaHistory className="mr-3 text-orange-500" /> Your History
              </h2>
              <p className="text-gray-600 mb-6">
                Review past interviews and track your progress over time.
              </p>
              <Link
                to="/history"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition duration-300"
              >
                View History
              </Link>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-xl hover:shadow-2xl transition-shadow">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <FaBook className="mr-3 text-purple-500" /> Interview Guide
              </h2>
              <p className="text-gray-600 mb-6">
                Learn proven strategies to ace technical and behavioral interviews.
              </p>
              <NavLink
                to="/guide"
                onClick={() => window.scrollTo(0, 0)}
                className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition duration-300"
              >
                Explore Guide
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
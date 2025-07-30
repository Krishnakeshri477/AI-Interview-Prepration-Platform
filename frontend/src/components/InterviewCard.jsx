// frontend\src\components\InterviewCard.jsx
import React, { useState } from 'react';
import { FaPlay, FaPause, FaChevronDown, FaChevronUp,FaMicrophone,FaChartBar,FaCalendarAlt,FaStar,FaCode,FaComments} from 'react-icons/fa';
import useAudioPlayer from '../hooks/useAudioPlayer';

const InterviewCard = ({ interview }) => {
  const [expandedQuestionId, setExpandedQuestionId] = useState(null);
  const { isPlaying, playAudio, pauseAudio, stopAudio, currentAudioUrl } = useAudioPlayer();

  const toggleQuestion = (questionId) => {
    setExpandedQuestionId(expandedQuestionId === questionId ? null : questionId);
    stopAudio();
  };

  const handlePlayFeedback = (audioUrl) => {
    if (isPlaying && currentAudioUrl === audioUrl) {
      pauseAudio();
    } else {
      playAudio(audioUrl);
    }
  };
  
  const renderStars = (score) => {
    const stars = [];
    const filledStars = Math.round(score / 20);
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FaStar 
          key={i} 
          className={i <= filledStars ? "text-yellow-400" : "text-gray-300"} 
        />
      );
    }
    return stars;
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-2 md:mb-0">
          {interview.role} Interview
          <span className={`ml-2 px-2 py-1 text-xs rounded-full ${
            interview.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
            interview.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}>
            {interview.difficulty}
          </span>
        </h2>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center text-gray-600">
            <FaCalendarAlt className="mr-2" />
            <span>{new Date(interview.date).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'short', 
              day: 'numeric' 
            })}</span>
          </div>
          
          <div className="flex items-center">
            <div className="flex mr-1">
              {renderStars(interview.overallScore)}
            </div>
            <span className="font-semibold text-gray-700">
              {interview.overallScore}/100
            </span>
          </div>
        </div>
      </div>

      <h3 className="text-lg font-semibold text-gray-800 mb-3 pb-2 border-b border-gray-200 flex items-center">
        <FaMicrophone className="mr-2 text-blue-500" />
        Questions & Feedback
      </h3>

      <div className="space-y-3">
        {interview.questions.map((q, index) => (
          <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
            <button
              onClick={() => toggleQuestion(q._id || index)}
              className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
            >
              <div className="flex items-center">
                <div className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center mr-3">
                  {index + 1}
                </div>
                <span className="font-medium text-gray-800 text-left">
                  {q.question.substring(0, 60)}{q.question.length > 60 ? '...' : ''}
                </span>
              </div>
              {expandedQuestionId === (q._id || index) ? (
                <FaChevronUp className="text-gray-500" />
              ) : (
                <FaChevronDown className="text-gray-500" />
              )}
            </button>

            {expandedQuestionId === (q._id || index) && (
              <div className="p-4 bg-white">
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-700 mb-1">Question:</h4>
                  <p className="text-gray-600">{q.question}</p>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold text-gray-700 mb-1">Your Answer:</h4>
                  <p className="text-gray-600">{q.answer}</p>
                </div>

                {q.feedback && (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <div className="flex items-center mb-2">
                          <FaChartBar className="text-blue-500 mr-2" />
                          <h4 className="font-semibold text-gray-700">Score:</h4>
                        </div>
                        <div className="flex items-center">
                          <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                            <div 
                              className={`h-2.5 rounded-full ${
                                q.feedback.score >= 70 ? 'bg-green-500' :
                                q.feedback.score >= 40 ? 'bg-yellow-500' :
                                'bg-red-500'
                              }`}
                              style={{ width: `${q.feedback.score}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium text-gray-700">
                            {q.feedback.score}/100
                          </span>
                        </div>
                      </div>

                      <div className="bg-green-50 p-3 rounded-lg">
                        <div className="flex items-center mb-2">
                          <FaComments className="text-green-500 mr-2" />
                          <h4 className="font-semibold text-gray-700">Communication:</h4>
                        </div>
                        <p className="text-gray-600 text-sm">{q.feedback.communicationFeedback}</p>
                      </div>
                    </div>

                    <div className="bg-purple-50 p-3 rounded-lg mb-4">
                      <div className="flex items-center mb-2">
                        <FaCode className="text-purple-500 mr-2" />
                        <h4 className="font-semibold text-gray-700">Technical Feedback:</h4>
                      </div>
                      <p className="text-gray-600">{q.feedback.technicalFeedback}</p>
                    </div>

                    {q.audioFeedbackUrl && (
                      <div className="mt-3">
                        <button
                          onClick={() => handlePlayFeedback(q.audioFeedbackUrl)}
                          className={`flex items-center space-x-2 font-medium py-2 px-4 rounded-lg transition-all duration-200 ${
                            isPlaying && currentAudioUrl === q.audioFeedbackUrl
                              ? 'bg-blue-600 text-white'
                              : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                          }`}
                        >
                          {isPlaying && currentAudioUrl === q.audioFeedbackUrl ? (
                            <FaPause />
                          ) : (
                            <FaPlay />
                          )}
                          <span>
                            {isPlaying && currentAudioUrl === q.audioFeedbackUrl
                              ? 'Pause Feedback'
                              : 'Play Audio Feedback'}
                          </span>
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default InterviewCard;
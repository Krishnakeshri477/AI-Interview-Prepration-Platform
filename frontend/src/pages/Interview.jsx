// frontend\src\pages\Interview.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startInterview, submitAnswer, submitAudioAnswer } from '../features/interview/interviewSlice';
import LoadingSpinner from '../components/LoadingSpinner';
import useAudioPlayer from '../hooks/useAudioPlayer';
import Navbar from '../components/Navbar';
import { FaMicrophone, FaStop, FaPlay, FaPause, FaStar, FaCode, FaComments, FaChevronDown, FaChevronUp, FaVolumeUp, FaStopCircle } from 'react-icons/fa';
import { IoMdSend } from 'react-icons/io';
import { GiArtificialIntelligence } from 'react-icons/gi';

const Interview = () => {
  const dispatch = useDispatch();
  const { currentQuestion, currentFeedback, interviewId, isLoading, isError, message } = useSelector(
    (state) => state.interview
  );

  const [role, setRole] = useState('Software Engineer');
  const [difficulty, setDifficulty] = useState('intermediate');
  const [userAnswer, setUserAnswer] = useState('');
  const [recording, setRecording] = useState(false);
  const [expandedFeedback, setExpandedFeedback] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const { isPlaying, playAudio, pauseAudio, stopAudio, currentAudioUrl } = useAudioPlayer();
  const [isSpeaking, setIsSpeaking] = useState(false);
  const voicesRef = useRef([]);

  // Initialize and cache voices for SpeechSynthesis
  useEffect(() => {
    if (!('speechSynthesis' in window)) return;
    const loadVoices = () => {
      voicesRef.current = window.speechSynthesis.getVoices();
    };
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  const getDesiredVoice = () => {
    const voices = voicesRef.current || [];
    const voice = voices.find(v => v.name === 'Google.UK.English.Female');
    if (voice) return voice;
  };

  const speakText = (text) => {
    if (!text || !('speechSynthesis' in window)) return;
    try {
      // Stop any current media/audio
      stopAudio();
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      const voice = getDesiredVoice();
      if (voice) utterance.voice = voice;
      utterance.lang = 'en-GB';
      utterance.rate = 1;
      utterance.pitch = 1;
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    } catch {
      // Fail silently
      setIsSpeaking(false);
    }
  };

  const stopSpeaking = () => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  useEffect(() => {
    if (isError) {
      alert(message);
    }
  }, [isError, message]);

  const handleStartInterview = () => {
    dispatch(startInterview({ role, difficulty }));
    setUserAnswer('');
    stopAudio();
    setExpandedFeedback(false);
  }; 

  const handleTextAnswerSubmit = () => {
    
    if (!currentQuestion || !userAnswer.trim()) {
      alert('Please provide an answer.');
      return;
    }
    
    if (!interviewId) {
      alert('Interview ID is missing. Please start a new interview.');
      return;
    }
    dispatch(submitAnswer({ 
      interviewId, 
      question: currentQuestion, 
      answer: userAnswer, 
      role, 
      difficulty 
    }));
    setExpandedFeedback(true);
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        console.log('Audio recorded, size:', audioBlob.size);
        
        const formData = new FormData();
        formData.append('audio', audioBlob, 'recording.webm');
        formData.append('interviewId', interviewId);
        formData.append('question', currentQuestion);
        formData.append('role', role);
        formData.append('difficulty', difficulty);
        
        // Dispatch audio answer thunk
        dispatch(submitAudioAnswer(formData));
        setExpandedFeedback(true);
      };

      mediaRecorderRef.current.start();
      setRecording(true);
    } catch (err) {
      console.error('Error accessing microphone:', err);
      alert('Could not access microphone. Please ensure permissions are granted.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && recording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      setRecording(false);
    }
  };

  const handlePlayFeedback = () => {
    if (currentFeedback?.audioFeedbackUrl) {
      if (isPlaying && currentAudioUrl === currentFeedback.audioFeedbackUrl) {
        pauseAudio();
      } else {
        playAudio(currentFeedback.audioFeedbackUrl);
      }
    }
  };

  const isValidAudioUrl = (url) => {
    if (!url) return false;
    // Check if URL is not a mock URL and has a valid audio extension
    if (url.includes('mock') || url.includes('example.com')) {
      return false;
    }
    const audioExtensions = ['.mp3', '.wav', '.ogg', '.m4a', '.webm'];
    return audioExtensions.some(ext => url.toLowerCase().includes(ext));
  };

  const renderStars = (score) => {
    const stars = [];
    const filledStars = Math.round(score / 20);
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FaStar 
          key={i} 
          className={`${i <= filledStars ? "text-yellow-400" : "text-gray-300"} text-lg`} 
        />
      );
    }
    return stars;
  };

  return (
    <>
      <Navbar />
      <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-lg mt-8 mb-12">
        <div className="flex items-center justify-center mb-6">
          <GiArtificialIntelligence className="text-blue-600 text-4xl mr-3" />
          <h1 className="text-3xl font-bold text-gray-800">AI Interview Practice</h1>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <label htmlFor="role" className="block text-gray-700 text-sm font-semibold mb-2">
              Select Role:
            </label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
              disabled={isLoading || recording}
            >
              <option value="Software Engineer">Software Engineer</option>
              <option value="Data Scientist">Data Scientist</option>
              <option value="Product Manager">Product Manager</option>
              <option value="Frontend Developer">Frontend Developer</option>
              <option value="Backend Developer">Backend Developer</option>
            </select>
          </div>
          <div className="flex-1">
            <label htmlFor="difficulty" className="block text-gray-700 text-sm font-semibold mb-2">
              Select Difficulty:
            </label>
            <select
              id="difficulty"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
              disabled={isLoading || recording}
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
        </div>

        <button
          onClick={handleStartInterview}
          className={`w-full py-3 px-4 rounded-xl font-bold text-white transition duration-200 mb-6 cursor-pointer flex items-center justify-center
            ${isLoading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <LoadingSpinner className="mr-2" />
              Generating Questions...
            </>
          ) : (
            'Start New Interview'
          )}
        </button>

        {currentQuestion && (
          <div className="mt-8 bg-blue-50 p-6 rounded-xl shadow-inner border border-blue-100">
            <h2 className="text-2xl font-semibold text-blue-800 mb-4 flex items-center">
              <FaCode className="mr-2" /> Question:
            </h2>
            <p className="text-lg text-gray-800 mb-6 bg-white p-4 rounded-lg border border-gray-200">
              {currentQuestion}
            </p>
            <div className="flex items-center gap-3 mb-6">
              {!isSpeaking ? (
                <button
                  onClick={() => speakText(currentQuestion)}
                  className="inline-flex items-center px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition"
                >
                  <FaVolumeUp className="mr-2" /> Speak Question
                </button>
              ) : (
                <button
                  onClick={stopSpeaking}
                  className="inline-flex items-center px-4 py-2 rounded-lg bg-gray-600 hover:bg-gray-700 text-white font-semibold transition"
                >
                  <FaStopCircle className="mr-2" /> Stop Speaking
                </button>
              )}
            </div>

            <div className="mb-6">
              <label htmlFor="userAnswer" className="block text-gray-700 text-sm font-semibold mb-2">
                Your Answer (Text):
              </label>
              <textarea
                id="userAnswer"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                rows="5"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 resize-y"
                placeholder="Type your answer here..."
                disabled={recording}
              ></textarea>
              <button
                onClick={handleTextAnswerSubmit}
                className={`mt-4 w-full py-2 px-4 rounded-xl font-bold text-white transition duration-200 flex items-center justify-center
                  ${isLoading || recording ? 'bg-green-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'}`}
                disabled={isLoading || recording}
              >
                <IoMdSend className="mr-2" /> Submit Text Answer
              </button>
            </div>

            <div className="mb-6 text-center">
              <p className="text-gray-700 text-sm font-semibold mb-3">Or Answer with Audio:</p>
              {!recording ? (
                <button
                  onClick={startRecording}
                  className={`py-3 px-6 rounded-full font-bold text-white transition duration-200 inline-flex items-center
                    ${isLoading ? 'bg-red-400 cursor-not-allowed' : 'bg-red-500 hover:bg-red-600'}`}
                  disabled={isLoading}
                >
                  <FaMicrophone className="mr-2" /> Start Recording
                </button>
              ) : (
                <div className="flex flex-col items-center">
                  <button
                    onClick={stopRecording}
                    className="py-3 px-6 rounded-full font-bold text-white bg-gray-600 hover:bg-gray-700 transition duration-200 inline-flex items-center animate-pulse"
                  >
                    <FaStop className="mr-2" /> Stop Recording
                  </button>
                  <div className="flex items-center mt-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full mr-1 animate-pulse"></div>
                    <div className="w-2 h-2 bg-red-500 rounded-full mr-1 animate-pulse delay-100"></div>
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse delay-200"></div>
                    <span className="text-red-500 ml-2 font-medium">Recording...</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {currentFeedback && (
          <div className={`mt-8 bg-gradient-to-br from-green-50 to-blue-50 p-6 rounded-xl shadow-inner border-l-4 border-green-600 transition-all duration-300 ${expandedFeedback ? 'max-h-full' : 'max-h-24 overflow-hidden'}`}>
            <button
              onClick={() => setExpandedFeedback(!expandedFeedback)}
              className="w-full flex justify-between items-center mb-2"
            >
              <h2 className="text-2xl font-semibold text-green-800 flex items-center">
                <GiArtificialIntelligence className="mr-2" /> Feedback
              </h2>
              {expandedFeedback ? (
                <FaChevronUp className="text-gray-500" />
              ) : (
                <FaChevronDown className="text-gray-500" />
              )}
            </button>

            {expandedFeedback && (
              <div className="space-y-4 pt-2">
                <div className="flex items-center justify-between bg-white p-4 rounded-lg border border-gray-200">
                  <span className="font-semibold text-gray-700">Overall Score:</span>
                  <div className="flex items-center">
                    <div className="flex mr-2">
                      {renderStars(currentFeedback.score)}
                    </div>
                    <span className="font-bold text-gray-800">
                      {currentFeedback.score}/100
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <h3 className="font-semibold text-gray-700 mb-2 flex items-center">
                      <FaCode className="mr-2 text-blue-500" /> Technical Feedback:
                    </h3>
                    <p className="text-gray-600">{currentFeedback.technicalFeedback}</p>
                  </div>

                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <h3 className="font-semibold text-gray-700 mb-2 flex items-center">
                      <FaComments className="mr-2 text-green-500" /> Communication Feedback:
                    </h3>
                    <p className="text-gray-600">{currentFeedback.communicationFeedback}</p>
                  </div>
                </div>

                {currentFeedback.audioFeedbackUrl && isValidAudioUrl(currentFeedback.audioFeedbackUrl) && (
                  <div className="mt-4 text-center">
                    <button
                      onClick={handlePlayFeedback}
                      className={`py-2 px-6 rounded-xl font-bold text-white transition duration-200 inline-flex items-center
                        ${isPlaying && currentAudioUrl === currentFeedback.audioFeedbackUrl ? 'bg-blue-600' : 'bg-blue-500 hover:bg-blue-600'}`}
                    >
                      {isPlaying && currentAudioUrl === currentFeedback.audioFeedbackUrl ? (
                        <FaPause className="mr-2" />
                      ) : (
                        <FaPlay className="mr-2" />
                      )}
                      {isPlaying && currentAudioUrl === currentFeedback.audioFeedbackUrl ? 'Pause Audio' : 'Play Audio Feedback'}
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Interview;
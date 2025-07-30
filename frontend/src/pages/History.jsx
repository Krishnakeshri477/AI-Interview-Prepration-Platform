// frontend\src\pages\History.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getInterviewHistory } from '../features/interview/interviewSlice';
import LoadingSpinner from '../components/LoadingSpinner';
import InterviewCard from '../components/InterviewCard';
import Navbar from '../components/Navbar';

const History = () => {
  const dispatch = useDispatch();
  const { interviewHistory, isLoading, isError, message } = useSelector(
    (state) => state.interview
  );

  useEffect(() => {
    dispatch(getInterviewHistory());
    if (isError) {
      alert(message);
    }
  }, [dispatch, isError, message]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <Navbar />
      <div className="p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Interview History</h1>

        {interviewHistory.length === 0 ? (
          <p className="text-center text-gray-600 text-lg mt-10">
            No interview history found. <br /> Start a new interview to see your progress!
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {interviewHistory.map((interview) => (
              <InterviewCard key={interview._id} interview={interview} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default History;
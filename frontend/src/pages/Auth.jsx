// frontend\src\pages\Auth.jsx
import AuthForm from '../components/AuthForm';
import { useState } from 'react';
import { FaUser, FaLock, FaEnvelope, FaGoogle, FaGithub, FaFacebook } from 'react-icons/fa';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  
  const authImageUrl = "https://plus.unsplash.com/premium_photo-1675283555385-8cab763245bb?q=80&w=627&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  return (
    <div className="h-screen flex bg-gray-50 overflow-hidden">
      {/* Left side with image (hidden on mobile) */}
      <div className="hidden md:block md:w-1/2 lg:w-3/5 relative">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${authImageUrl})` }}
        >
          <div className="absolute inset-0 bg-blue-600 opacity-20"></div>
        </div>
        <div className="relative z-10 h-full flex items-center justify-center p-12">
          <div className="text-white">
            <h2 className="text-4xl font-bold mb-4">Welcome to Our Platform</h2>
            <p className="text-xl opacity-90">
              {isLogin 
                ? "Sign in to access your personalized dashboard and features."
                : "Join our community and unlock exclusive benefits."}
            </p>
          </div>
        </div>
      </div>

      {/* Right */}
      <div className="w-full md:w-1/2 lg:w-2/5 flex flex-col items-center justify-center p-4 sm:p-8 h-screen overflow-y-auto">
        <div className="w-full max-w-md bg-white p-6 sm:p-8 rounded-xl shadow-lg">
          <div className="text-center mb-6">
            <div className="w-16 h-8 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaLock className="text-blue-600 text-xl" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">
              {isLogin ? 'Sign In to Your Account' : 'Create New Account'}
            </h1>
          </div>

          {/* Toggle buttons */}
          <div className="flex bg-gray-100 p-1 rounded-lg mb-6">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2 sm:py-3 rounded-md font-medium transition duration-200 flex items-center justify-center ${
                isLogin
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <FaUser className="mr-2" /> Sign In
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2 sm:py-3 rounded-md font-medium transition duration-200 flex items-center justify-center ${
                !isLogin
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <FaEnvelope className="mr-2" /> Register
            </button>
          </div>

          {/* Form */}
          {isLogin ? <AuthForm type="login" /> : <AuthForm type="register" />}

          {/* Divider */}
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          {/* Social login */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            <button className="flex items-center justify-center py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
              <FaGoogle className="text-red-500 mr-2" />
              <span className="text-sm font-medium hidden sm:inline">Google</span>
            </button>
            <button className="flex items-center justify-center py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
              <FaGithub className="text-gray-800 mr-2" />
              <span className="text-sm font-medium hidden sm:inline">GitHub</span>
            </button>
            <button className="flex items-center justify-center py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
              <FaFacebook className="text-blue-600 mr-2" />
              <span className="text-sm font-medium hidden sm:inline">Facebook</span>
            </button>
          </div>

          {/* Footer link */}
          <p className="text-center text-sm text-gray-600">
            {isLogin ? (
              <>
                Don't have an account?{' '}
                <button 
                  onClick={() => setIsLogin(false)}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Sign up
                </button>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <button 
                  onClick={() => setIsLogin(true)}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Sign in
                </button>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
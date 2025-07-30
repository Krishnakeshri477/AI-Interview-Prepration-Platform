// frontend\src\components\Navbar.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice';
import { FaRobot, FaSignInAlt, FaUserPlus, FaSignOutAlt, FaHistory, FaPlus, FaThLarge, FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/');
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-indigo-700 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo/Brand */}
          <div className="flex-shrink-0 flex items-center">
            <Link 
              to={user ? "/dashboard" : "/"} 
              className="text-white text-2xl font-bold tracking-tight flex items-center"
            >
              <FaRobot className="h-8 w-8 mr-2" />
              AI Interviewer
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              {user ? (
                <>
                  <Link
                    to="/dashboard"
                    className="text-blue-100 hover:bg-blue-500 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-300 flex items-center"
                  >
                    <FaThLarge className="mr-1" /> Dashboard
                  </Link>
                  <Link
                    to="/interview"
                    className="text-blue-100 hover:bg-blue-500 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-300 flex items-center"
                  >
                    <FaPlus className="mr-1" /> New Interview
                  </Link>
                  <Link
                    to="/history"
                    className="text-blue-100 hover:bg-blue-500 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-300 flex items-center"
                  >
                    <FaHistory className="mr-1" /> History
                  </Link>
                  <button
                    onClick={onLogout}
                    className="text-blue-100 hover:bg-blue-500 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-300 flex items-center"
                  >
                    <FaSignOutAlt className="mr-1" /> Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/"
                    className="text-blue-100 hover:bg-blue-500 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-300 flex items-center"
                  >
                    <FaSignInAlt className="mr-1" /> Login
                  </Link>
                  <Link
                    to="/register"
                    className="bg-white text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-md text-sm font-medium transition duration-300 flex items-center"
                  >
                    <FaUserPlus className="mr-1" /> Register
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-blue-200 hover:text-white hover:bg-blue-500 focus:outline-none transition duration-300"
              aria-controls="mobile-menu"
              aria-expanded="false"
              onClick={toggleMobileMenu}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <FaTimes className="block h-6 w-6" />
              ) : (
                <FaBars className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${mobileMenuOpen ? 'block' : 'hidden'}`} id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {user ? (
            <>
              <Link
                to="/dashboard"
                className="text-blue-100 hover:bg-blue-500 hover:text-white px-3 py-2 rounded-md text-base font-medium flex items-center"
                onClick={toggleMobileMenu}
              >
                <FaThLarge className="mr-2" /> Dashboard
              </Link>
              <Link
                to="/interview"
                className="text-blue-100 hover:bg-blue-500 hover:text-white px-3 py-2 rounded-md text-base font-medium flex items-center"
                onClick={toggleMobileMenu}
              >
                <FaPlus className="mr-2" /> New Interview
              </Link>
              <Link
                to="/history"
                className="text-blue-100 hover:bg-blue-500 hover:text-white px-3 py-2 rounded-md text-base font-medium flex items-center"
                onClick={toggleMobileMenu}
              >
                <FaHistory className="mr-2" /> History
              </Link>
              <button
                onClick={() => {
                  onLogout();
                  toggleMobileMenu();
                }}
                className="text-blue-100 hover:bg-blue-500 hover:text-white px-3 py-2 rounded-md text-base font-medium w-full text-left flex items-center"
              >
                <FaSignOutAlt className="mr-2" /> Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/"
                className="text-blue-100 hover:bg-blue-500 hover:text-white px-3 py-2 rounded-md text-base font-medium flex items-center"
                onClick={toggleMobileMenu}
              >
                <FaSignInAlt className="mr-2" /> Login
              </Link>
              <Link
                to="/register"
                className="bg-white text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-md text-base font-medium flex items-center"
                onClick={toggleMobileMenu}
              >
                <FaUserPlus className="mr-2" /> Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app } from '../firebase';

export const Navbar = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser({ ...user, photoURL: user.photoURL || localStorage.getItem('profilePic') });
      } else {
        setCurrentUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="bg-green-600 h-16 flex items-center shadow-md">
      <div className="flex justify-between items-center w-full max-w-7x1 mx-auto px-4 md:px-8">
        {/* Farmwise Logo aligned to the far left */}
        <div className="flex items-center">
          <Link to="/">
            <h1 className="text-white font-semibold text-lg">Farmwise</h1>
          </Link>
        </div>

        {/* Hamburger Icon for mobile */}
        <button
          className="text-white md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>

        {/* Navigation Links */}
        <ul
          className={`flex-col md:flex-row items-center gap-8 md:flex ${isMenuOpen ? 'flex' : 'hidden'} md:gap-8 md:ml-auto md:flex`}
        >
          <Link to="/" onClick={() => setIsMenuOpen(false)}>
            <li className="text-white hover:text-green-400 transition-colors">Home</li>
          </Link>
          <Link to="/about" onClick={() => setIsMenuOpen(false)}>
            <li className="text-white hover:text-green-400 transition-colors">About</li>
          </Link>
          <Link to="/contact" onClick={() => setIsMenuOpen(false)}>
            <li className="text-white hover:text-green-400 transition-colors">Contact</li>
          </Link>
          {currentUser ? (
            <Link to="/profile" onClick={() => setIsMenuOpen(false)}>
              <img
                src={currentUser.photoURL || 'https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg'}
                alt="profile"
                className="h-8 w-8 rounded-full object-cover border-2 border-white cursor-pointer"
              />
            </Link>
          ) : (
            <Link to="/login" onClick={() => setIsMenuOpen(false)}>
              <img
                src="https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg"
                alt="profile"
                className="h-8 w-8 rounded-full object-cover border-2 border-white cursor-pointer"
              />
            </Link>
          )}
        </ul>
      </div>
    </div>
  );
};

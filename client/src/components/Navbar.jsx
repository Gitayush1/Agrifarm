import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app } from '../firebase';

export const Navbar = () => {
  const [currentUser, setCurrentUser] = useState();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser({
          ...user,
          photoURL: user.photoURL || localStorage.getItem('profilePic'),
        });
      } else {
        setCurrentUser(null);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  return (
    <div className="bg-green-600 h-16 flex items-center shadow-md">
      <div className="flex justify-between items-center w-full max-w-7xl mx-auto px-4 md:px-8">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/">
            <h1 className="text-white font-semibold text-lg">Farmwise</h1>
          </Link>
        </div>

        {/* Hamburger Menu (Mobile) */}
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
          className={`flex-col md:flex-row items-center gap-8 md:flex ${
            isMenuOpen ? 'flex' : 'hidden'
          } md:gap-8 md:ml-auto`}
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
          <Link to="/order" onClick={() => setIsMenuOpen(false)}>
            <li className="text-white hover:text-green-400 transition-colors">Orders</li>
          </Link>

          {/* Profile Icon (Fixed Navigation Issue) */}
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

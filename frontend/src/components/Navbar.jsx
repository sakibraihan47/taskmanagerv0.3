import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-purple-600 text-white p-4 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold">BlogSpace</Link>
      <div>
        {user ? (
          <>
            <Link to="/viewblogs" className="mr-4">Blogs</Link>
            <Link to="/blogs" className="mr-4">Your Blogs</Link>
            <Link to="/profile" className="mr-4">Profile</Link>

             <span className="mr-8 font-bold">
              Welcome, {user.name || user.username || user.email}
            </span>
            <button
              onClick={handleLogout}
              className="bg-red-500 px-4 py-2 rounded hover:bg-red-700"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="mr-4">Login</Link>
            <Link
              to="/register"
              className="bg-green-500 px-4 py-2 rounded hover:bg-green-700"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

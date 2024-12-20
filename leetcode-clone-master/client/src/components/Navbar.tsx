import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import appLogo from '../assets/app-logo.svg';

const NAV_TABS = [
  { id: 1, name: 'Problems', path: '/problems' },
  { id: 2, name: 'About', path: '/about' },
];

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleSignOut = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="h-[8vh] w-screen bg-gray-900 p-4 flex items-center justify-between">
      <Link to="/" className="flex items-center">
        <img src={appLogo} alt="codex-app-logo" className="h-8 px-5" />
        <span className="text-xl text-white font-semibold">CodeX</span>
      </Link>

      <div className="flex items-center justify-between">
        {NAV_TABS.map((item) => (
          <NavLink
            key={item.id}
            to={item.path}
            className={({ isActive, isPending }) =>
              isActive
                ? 'px-3 text-blue-500'
                : isPending
                  ? 'pending'
                  : 'px-3 text-white hover:text-blue-500'
            }
          >
            {item.name}
          </NavLink>
        ))}
        {token ? (
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 text-white h-8 px-4 rounded-md focus:outline-none hover:bg-blue-600"
              onClick={handleSignOut}
            >
              Sign out
            </button>
            <FaUser className="text-4xl text-blue-500 border border-blue-500 p-1 rounded-full ml-3" />
          </div>
        ) : (
          <Link
            to="/login"
            className="bg-blue-500 text-white px-4 py-2 rounded-md focus:outline-none hover:bg-blue-600"
          >
            Sign In
          </Link>
        )}
      </div>
    </div>
  );
}

export default Navbar;
